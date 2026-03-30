import { v } from "convex/values";
import {
	action,
	internalAction,
	internalMutation,
	internalQuery,
	mutation,
	query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { resend } from "./email";

// ── Types ──────────────────────────────────────────────────────────────────

type ImageTag =
	| "exterior"
	| "living_room"
	| "kitchen"
	| "bedroom"
	| "bathroom"
	| "dining"
	| "backyard"
	| "garage"
	| "pool"
	| "aerial"
	| "floor_plan"
	| "icon"
	| "other";

interface ClassifiedImage {
	url: string;
	tag: ImageTag;
	caption: string;
}

interface ZillowListing {
	address: string;
	city: string;
	state: string;
	zipCode: string;
	price: number;
	beds: number;
	baths: number;
	sqft: number;
	yearBuilt: number | null;
	description: string;
	images: string[];
	classifiedImages: ClassifiedImage[];
	lotSize: string | null;
	propertyType: string;
	zestimate: number | null;
	daysOnZillow: number | null;
	url: string;
	neighborhoodDescription: string;
}

// ── Client-facing: create job + subscribe ──────────────────────────────────

export const createJob = mutation({
	args: { zillowUrl: v.string() },
	handler: async (ctx, { zillowUrl }) => {
		const cleanUrl = zillowUrl.startsWith("http")
			? zillowUrl
			: `https://${zillowUrl}`;

		const jobId = await ctx.db.insert("pdfJobs", {
			zillowUrl: cleanUrl,
			status: "pending",
			createdAt: Date.now(),
		});

		// Fire off the background action
		await ctx.scheduler.runAfter(0, internal.pdfJob.processJob, { jobId });

		return jobId;
	},
});

export const getJob = query({
	args: { jobId: v.id("pdfJobs") },
	handler: async (ctx, { jobId }) => {
		return await ctx.db.get(jobId);
	},
});

export const addEmailToJob = mutation({
	args: { jobId: v.id("pdfJobs"), email: v.string() },
	handler: async (ctx, { jobId, email }) => {
		await ctx.db.patch(jobId, { notifyEmail: email });
	},
});

// ── Internal: status updates ───────────────────────────────────────────────

export const updateJobStatus = internalMutation({
	args: {
		jobId: v.id("pdfJobs"),
		status: v.string(),
		listingJson: v.optional(v.string()),
		error: v.optional(v.string()),
		completedAt: v.optional(v.number()),
		totalImages: v.optional(v.number()),
		processedImages: v.optional(v.number()),
	},
	handler: async (
		ctx,
		{ jobId, status, listingJson, error, completedAt, totalImages, processedImages },
	) => {
		const patch: Record<string, unknown> = { status };
		if (listingJson !== undefined) patch.listingJson = listingJson;
		if (error !== undefined) patch.error = error;
		if (completedAt !== undefined) patch.completedAt = completedAt;
		if (totalImages !== undefined) patch.totalImages = totalImages;
		if (processedImages !== undefined) patch.processedImages = processedImages;
		await ctx.db.patch(jobId, patch);
	},
});

export const updateImageProgress = internalMutation({
	args: {
		jobId: v.id("pdfJobs"),
		processedImages: v.number(),
	},
	handler: async (ctx, { jobId, processedImages }) => {
		await ctx.db.patch(jobId, { processedImages });
	},
});

// ── Internal: the background action that does all the work ─────────────────

export const processJob = internalAction({
	args: { jobId: v.id("pdfJobs") },
	handler: async (ctx, { jobId }) => {
		try {
			// Get the job to read the URL
			const job = await ctx.runQuery(internal.pdfJob.getJobInternal, {
				jobId,
			});
			if (!job) throw new Error("Job not found");

			const url = job.zillowUrl;

			// Step 1: Scrape
			await ctx.runMutation(internal.pdfJob.updateJobStatus, {
				jobId,
				status: "scraping",
			});

			const firecrawlKey = process.env.FIRECRAWL_API_KEY;
			if (!firecrawlKey) throw new Error("FIRECRAWL_API_KEY not configured");

			const html = await fetchWithFirecrawl(url, firecrawlKey);
			const listing = parseZillowHtml(html, url);

			// Step 2: Validate images
			if (listing.images.length > 0) {
				const validated = await Promise.all(
					listing.images.map(async (imgUrl) => {
						try {
							const res = await fetch(imgUrl, {
								method: "HEAD",
								headers: {
									"User-Agent":
										"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
									Referer: "https://www.zillow.com/",
								},
							});
							if (!res.ok) return null;
							const contentType = res.headers.get("content-type") || "";
							if (contentType && !contentType.startsWith("image/")) return null;
							return imgUrl;
						} catch {
							return null;
						}
					}),
				);
				listing.images = validated.filter(Boolean) as string[];
			}

			if (!listing.address && !listing.price) {
				throw new Error(
					"Could not extract listing data. Zillow may have blocked the request.",
				);
			}

			// Step 3: Classify images + generate neighborhood description (parallel)
			const totalImages = listing.images.length;
			await ctx.runMutation(internal.pdfJob.updateJobStatus, {
				jobId,
				status: "classifying",
				totalImages,
				processedImages: 0,
			});

			const falKey = process.env.FAL_KEY;
			const openaiKey = process.env.OPENAI_API_KEY;

			const [classifiedImages, neighborhoodDesc] = await Promise.all([
				classifyImages(listing.images, falKey, async (processed) => {
					await ctx.runMutation(internal.pdfJob.updateImageProgress, {
						jobId,
						processedImages: processed,
					});
				}),
				generateNeighborhoodDescription(listing, openaiKey),
			]);
			listing.classifiedImages = classifiedImages;
			listing.neighborhoodDescription = neighborhoodDesc;

			// Step 4: Done — store the listing
			await ctx.runMutation(internal.pdfJob.updateJobStatus, {
				jobId,
				status: "completed",
				listingJson: JSON.stringify(listing),
				completedAt: Date.now(),
			});

			// Send email notification if requested
			const updatedJob = await ctx.runQuery(internal.pdfJob.getJobInternal, {
				jobId,
			});
			if (updatedJob?.notifyEmail) {
				await ctx.scheduler.runAfter(
					0,
					internal.pdfJob.sendPdfReadyEmail,
					{
						jobId,
						email: updatedJob.notifyEmail,
						address: listing.address,
					},
				);
			}

			// Slack notification
			const webhookUrl = process.env.SLACK_WEBHOOK_URL;
			if (webhookUrl) {
				try {
					await fetch(webhookUrl, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							blocks: [
								{
									type: "header",
									text: {
										type: "plain_text",
										text: "Property PDF Generated",
										emoji: true,
									},
								},
								{
									type: "section",
									fields: [
										{
											type: "mrkdwn",
											text: `*Listing:*\n${listing.address}`,
										},
										{
											type: "mrkdwn",
											text: `*Price:*\n$${listing.price.toLocaleString()}`,
										},
										{ type: "mrkdwn", text: `*URL:*\n${url}` },
									],
								},
							],
						}),
					});
				} catch {
					// Slack is non-critical
				}
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Pipeline failed";
			await ctx.runMutation(internal.pdfJob.updateJobStatus, {
				jobId,
				status: "failed",
				error: message,
			});
		}
	},
});

// Internal query for actions to read job data via ctx.runQuery
export const getJobInternal = internalQuery({
	args: { jobId: v.id("pdfJobs") },
	handler: async (ctx, { jobId }) => {
		return await ctx.db.get(jobId);
	},
});

export const sendPdfReadyEmail = internalAction({
	args: {
		jobId: v.id("pdfJobs"),
		email: v.string(),
		address: v.string(),
	},
	handler: async (ctx, { jobId, email, address }) => {
		const pdfUrl = `https://naironai.com/for/real-estate/property-pdf?job=${jobId}`;
		const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0C0C0C; color: #E8E4DE; padding: 40px 20px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto;">
    <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 24px;">
      Your property brochure is <span style="color: #C9A96E;">ready</span>
    </h1>
    <p style="font-size: 16px; line-height: 1.7; color: #A39E96; margin-bottom: 24px;">
      The PDF for <strong style="color: #E8E4DE;">${address}</strong> has finished generating.
    </p>
    <a href="${pdfUrl}" style="display: inline-block; background-color: #C9A96E; color: #0C0C0C; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
      Download Your PDF
    </a>
    <p style="font-size: 13px; color: #666; margin-top: 40px;">
      — Nairon Property Tools
    </p>
  </div>
</body>
</html>`;

		await resend.sendEmail(
			ctx,
			"Nairon <hello@naironai.com>",
			email,
			`Your property brochure for ${address} is ready`,
			emailHtml,
		);

		// Mark email as sent
		await ctx.runMutation(internal.pdfJob.markEmailSent, { jobId });
	},
});

export const markEmailSent = internalMutation({
	args: { jobId: v.id("pdfJobs") },
	handler: async (ctx, { jobId }) => {
		await ctx.db.patch(jobId, { emailSent: true });
	},
});

// ── Pipeline helpers (same logic as zillow-scrape.ts but for Convex actions) ──

async function fetchWithFirecrawl(
	url: string,
	apiKey: string,
): Promise<string> {
	let lastError: Error | null = null;
	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			console.log(`[pdfJob] Firecrawl attempt ${attempt}/3 for ${url}`);
			const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					url,
					formats: ["rawHtml"],
					onlyMainContent: false,
					waitFor: 3000,
					location: { country: "US" },
				}),
			});

			if (!response.ok) {
				const errorBody = await response.text().catch(() => "");
				throw new Error(
					`Firecrawl request failed (${response.status}): ${errorBody}`,
				);
			}

			const data = await response.json();
			if (!data.success) {
				throw new Error(
					`Firecrawl scrape failed: ${data.error || "unknown error"}`,
				);
			}
			const html = data.data?.rawHtml || data.data?.html || "";
			if (!html) throw new Error("Firecrawl returned no HTML content");
			return html;
		} catch (err) {
			lastError = err instanceof Error ? err : new Error(String(err));
			console.error(
				`[pdfJob] Attempt ${attempt} failed: ${lastError.message}`,
			);
			if (attempt < 3) await new Promise((r) => setTimeout(r, 2000));
		}
	}
	throw lastError!;
}

function parseZillowHtml(html: string, url: string): ZillowListing {
	let address = "";
	let city = "";
	let state = "";
	let zipCode = "";
	let price = 0;
	let beds = 0;
	let baths = 0;
	let sqft = 0;
	let yearBuilt: number | null = null;
	let description = "";
	let images: string[] = [];
	let lotSize: string | null = null;
	let propertyType = "Residential";
	let zestimate: number | null = null;
	let daysOnZillow: number | null = null;

	// Try JSON-LD
	const jsonLdMatch = html.match(
		/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
	);
	if (jsonLdMatch) {
		try {
			const ld = JSON.parse(jsonLdMatch[1]);
			const item = Array.isArray(ld) ? ld[0] : ld;
			if (item) {
				address = item.name || item.address?.streetAddress || "";
				city = item.address?.addressLocality || "";
				state = item.address?.addressRegion || "";
				zipCode = item.address?.postalCode || "";
				if (item.floorSize?.value) sqft = Number(item.floorSize.value);
				if (item.numberOfRooms) beds = Number(item.numberOfRooms);
				if (item.image) {
					images = Array.isArray(item.image) ? item.image : [item.image];
				}
				description = item.description || "";
			}
		} catch {
			// continue
		}
	}

	// Meta tags fallback
	const ogTitle =
		html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] || "";
	const ogDesc =
		html.match(/<meta property="og:description" content="([^"]*)"/)?.[1] ||
		"";
	const ogImage =
		html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] || "";

	if (!address && ogTitle) address = ogTitle.split("|")[0]?.trim() || ogTitle;
	if (!description && ogDesc) description = ogDesc;
	if (ogImage && images.length === 0) images = [ogImage];

	// Regex extraction from embedded JSON
	if (!price) {
		const m =
			html.match(/"price"\s*:\s*(\d[\d,]*)/) ||
			html.match(/"listPrice"\s*:\s*(\d[\d,]*)/) ||
			html.match(/"price"\s*:\s*"?\$?([\d,]+)"?/);
		if (m) price = Number(m[1].replace(/,/g, ""));
	}
	if (!beds) {
		const m =
			html.match(/"bedrooms"\s*:\s*(\d+)/) ||
			html.match(/"beds"\s*:\s*(\d+)/) ||
			html.match(/"numberOfBedrooms"\s*:\s*(\d+)/);
		if (m) beds = Number(m[1]);
	}
	if (!baths) {
		const m =
			html.match(/"bathrooms"\s*:\s*(\d+)/) ||
			html.match(/"baths"\s*:\s*(\d+)/) ||
			html.match(/"numberOfBathrooms"\s*:\s*(\d+)/) ||
			html.match(/"bathroomsFull"\s*:\s*(\d+)/);
		if (m) baths = Number(m[1]);
	}
	if (!sqft) {
		const m =
			html.match(/"livingArea"\s*:\s*(\d[\d,]*)/) ||
			html.match(/"livingAreaValue"\s*:\s*(\d[\d,]*)/) ||
			html.match(/"area"\s*:\s*(\d[\d,]*)/);
		if (m) sqft = Number(m[1].replace(/,/g, ""));
	}

	const yearMatch = html.match(/"yearBuilt"\s*:\s*(\d{4})/);
	if (yearMatch) yearBuilt = Number(yearMatch[1]);

	const typeMatch =
		html.match(/"homeType"\s*:\s*"([^"]+)"/) ||
		html.match(/"propertyType"\s*:\s*"([^"]+)"/);
	if (typeMatch) propertyType = typeMatch[1].replace(/_/g, " ");

	const zestMatch = html.match(/"zestimate"\s*:\s*(\d[\d,]*)/);
	if (zestMatch) zestimate = Number(zestMatch[1].replace(/,/g, ""));

	const daysMatch = html.match(/"daysOnZillow"\s*:\s*(-?\d+)/);
	if (daysMatch) daysOnZillow = Number(daysMatch[1]);

	const lotMatch =
		html.match(/"lotSize"\s*:\s*(\d[\d,.]*)/) ||
		html.match(/"lotAreaValue"\s*:\s*(\d[\d,.]*)/);
	if (lotMatch) lotSize = `${Number(lotMatch[1]).toLocaleString()} sqft`;

	// Last resort: parse from description/og text
	const descText = description || ogDesc;
	if (descText) {
		if (!beds) {
			const m = descText.match(/(\d+)\s*(?:bed(?:room)?s?)/i);
			if (m) beds = Number(m[1]);
		}
		if (!baths) {
			const m = descText.match(/(\d+)\s*(?:bath(?:room)?s?)/i);
			if (m) baths = Number(m[1]);
		}
		if (!sqft) {
			const m = descText.match(/([\d,]+)\s*(?:sq(?:uare)?\s*(?:ft|feet))/i);
			if (m) sqft = Number(m[1].replace(/,/g, ""));
		}
	}

	if (ogTitle && (!beds || !baths)) {
		if (!beds) {
			const m = ogTitle.match(/(\d+)\s*(?:bd|bed)/i);
			if (m) beds = Number(m[1]);
		}
		if (!baths) {
			const m = ogTitle.match(/(\d+)\s*(?:ba|bath)/i);
			if (m) baths = Number(m[1]);
		}
	}

	// ── Extract images ──
	const photoMap = new Map<string, { url: string; size: number }>();

	for (const m of html.matchAll(
		/(?:"|'|src=)(https:\/\/photos\.zillowstatic\.com\/fp\/([a-f0-9]+)[^"']*)/g,
	)) {
		const imgUrl = m[1];
		const hash = m[2];

		if (imgUrl.includes("_t.") || imgUrl.includes("/32_")) continue;
		if (imgUrl.includes("maps") || imgUrl.includes("static-map")) continue;
		if (imgUrl.includes("logo") || imgUrl.includes("icon") || imgUrl.includes("badge")) continue;
		if (imgUrl.includes("branding") || imgUrl.includes("watermark")) continue;
		const ccSize = imgUrl.match(/cc_ft_(\d+)/);
		if (ccSize && Number(ccSize[1]) < 200) continue;

		const sizeMatch = imgUrl.match(/(\d{3,4})(?:\.\w+$|_\d+\.\w+$)/);
		const size = sizeMatch ? Number(sizeMatch[1]) : 0;

		const existing = photoMap.get(hash);
		if (!existing || size > existing.size) {
			photoMap.set(hash, { url: imgUrl, size });
		}
	}

	for (const m of html.matchAll(
		/"(https:\/\/photos\.zillowstatic\.com\/(?!fp\/)[^"]+)"/g,
	)) {
		const imgUrl = m[1];
		if (imgUrl.includes("_t.") || imgUrl.includes("/32_")) continue;
		if (!photoMap.has(imgUrl)) {
			photoMap.set(imgUrl, { url: imgUrl, size: 0 });
		}
	}

	const existingSet = new Set(images);
	for (const { url: imgUrl } of photoMap.values()) {
		if (!existingSet.has(imgUrl)) {
			images.push(imgUrl);
			existingSet.add(imgUrl);
		}
	}

	// Parse address from URL if missing
	if (!city || !state) {
		const urlParts = url.match(/zillow\.com\/homedetails\/([^/]+)/);
		if (urlParts) {
			const parts = urlParts[1].replace(/-/g, " ").split(" ");
			for (let i = parts.length - 1; i >= 0; i--) {
				if (!zipCode && /^\d{5}$/.test(parts[i])) zipCode = parts[i];
				if (!state && /^[A-Z]{2}$/i.test(parts[i]))
					state = parts[i].toUpperCase();
			}
		}
	}

	return {
		address,
		city,
		state,
		zipCode,
		price,
		beds,
		baths,
		sqft,
		yearBuilt,
		description,
		images: images.slice(0, 20),
		classifiedImages: [],
		lotSize,
		propertyType,
		zestimate,
		daysOnZillow,
		url,
		neighborhoodDescription: "",
	};
}

// ── Image classification ──

const VALID_TAGS: ImageTag[] = [
	"exterior",
	"living_room",
	"kitchen",
	"bedroom",
	"bathroom",
	"dining",
	"backyard",
	"garage",
	"pool",
	"aerial",
	"floor_plan",
	"icon",
	"other",
];

async function classifyImage(
	imageUrl: string,
	falKey: string,
): Promise<ClassifiedImage> {
	try {
		const response = await fetch("https://fal.run/fal-ai/moondream3-preview/query", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Key ${falKey}`,
			},
			body: JSON.stringify({
				image_url: imageUrl,
				prompt:
					"Classify this real estate listing photo. Reply with EXACTLY one word from this list: exterior, living_room, kitchen, bedroom, bathroom, dining, backyard, garage, pool, aerial, floor_plan, icon, other. Use floor_plan for floor plans or maps. Use icon for logos, icons, AR markers, text graphics, or agent headshots. Then a comma, then a 3-5 word description. Example: kitchen, modern white kitchen island",
				reasoning: false,
			}),
		});

		if (!response.ok) {
			console.error(`[pdfJob] fal.ai classify failed: ${response.status}`);
			return { url: imageUrl, tag: "other", caption: "property photo" };
		}

		const result = await response.json();
		const text = result?.output?.trim() || "other, property photo";
		const [rawTag, ...rest] = text.split(",");
		const tag = VALID_TAGS.includes(rawTag.trim().toLowerCase() as ImageTag)
			? (rawTag.trim().toLowerCase() as ImageTag)
			: "other";
		const caption = rest.join(",").trim() || "property photo";
		return { url: imageUrl, tag, caption };
	} catch (err) {
		console.error(`[pdfJob] Failed to classify image: ${err}`);
		return { url: imageUrl, tag: "other", caption: "property photo" };
	}
}

async function classifyImages(
	imageUrls: string[],
	falKey: string | undefined,
	onProgress?: (processed: number) => Promise<void>,
): Promise<ClassifiedImage[]> {
	if (!falKey || imageUrls.length === 0) {
		return imageUrls.map((url) => ({
			url,
			tag: "other" as ImageTag,
			caption: "property photo",
		}));
	}

	console.log(
		`[pdfJob] Classifying all ${imageUrls.length} images...`,
	);

	// Classify every image — no sampling
	const classified: ClassifiedImage[] = [];
	for (let i = 0; i < imageUrls.length; i++) {
		const result = await classifyImage(imageUrls[i], falKey);
		classified.push(result);
		if (onProgress) await onProgress(i + 1);
	}

	return classified;
}

// ── Non-property image tags (excluded from slide selection) ──

const EXCLUDED_TAGS: ImageTag[] = ["floor_plan", "icon", "other"];

// ── Neighborhood description ──

async function generateNeighborhoodDescription(
	listing: ZillowListing,
	openaiKey: string | undefined,
): Promise<string> {
	const loc = [listing.city, listing.state].filter(Boolean).join(", ");

	if (!openaiKey) {
		return buildFallback(loc);
	}

	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${openaiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "user",
						content: `Write a 3-4 sentence description of the neighborhood around ${listing.address || "this property"} in ${loc || "this area"}. Property: ${listing.propertyType}, ${listing.beds} bed, ${listing.baths} bath, ${listing.sqft ? listing.sqft + " sqft" : ""}, ${listing.yearBuilt ? "built " + listing.yearBuilt : ""}. Write naturally like a local agent. No emdashes, exclamation marks, or buzzwords. Don't start with "Welcome" or "Nestled in".`,
					},
				],
				max_tokens: 200,
			}),
		});

		if (!response.ok) return buildFallback(loc);
		const data = await response.json();
		return (
			data.choices?.[0]?.message?.content?.trim() || buildFallback(loc)
		);
	} catch {
		return buildFallback(loc);
	}
}

function buildFallback(loc: string): string {
	if (!loc) return "";
	return `${loc} is a well-established community with convenient access to local schools, parks, shopping, and dining. The area offers a mix of residential charm and everyday convenience that appeals to families and professionals alike. Reach out to the listing agent for more details about the neighborhood.`;
}
