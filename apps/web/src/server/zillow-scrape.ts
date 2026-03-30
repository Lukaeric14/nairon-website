import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { fal } from "@fal-ai/client";

/* ── In-memory cache (dev only — survives HMR within same server process) ── */
const listingCache = new Map<string, { listing: ZillowListing; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export type ImageTag =
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
	| "other";

export interface ClassifiedImage {
	url: string;
	tag: ImageTag;
	caption: string;
}

export interface ZillowListing {
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

export interface PdfPersonalization {
	brokerageName: string;
	agentName: string;
}

/**
 * Fetch the Zillow page HTML via ScrapingBee proxy (handles CAPTCHAs, JS rendering).
 * Falls back to direct fetch if no API key is configured.
 */
async function fetchWithFirecrawl(url: string, apiKey: string): Promise<string> {
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
	if (!html) {
		throw new Error("Firecrawl returned no HTML content");
	}
	return html;
}

async function fetchPageHtml(url: string): Promise<string> {
	const apiKey = process.env.FIRECRAWL_API_KEY;

	if (apiKey) {
		// Retry up to 3 times — Firecrawl proxy tunnels can fail transiently
		let lastError: Error | null = null;
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				console.log(`[zillow] Firecrawl attempt ${attempt}/3 for ${url}`);
				return await fetchWithFirecrawl(url, apiKey);
			} catch (err) {
				lastError = err instanceof Error ? err : new Error(String(err));
				console.error(`[zillow] Attempt ${attempt} failed: ${lastError.message}`);
				if (attempt < 3) {
					// Wait 2s before retrying
					await new Promise((r) => setTimeout(r, 2000));
				}
			}
		}
		throw lastError!;
	}

	// No API key — try direct fetch (will likely get blocked by Zillow)
	const response = await fetch(url, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.9",
			Referer: "https://www.google.com/",
		},
		redirect: "follow",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch listing (${response.status})`);
	}

	return await response.text();
}

/**
 * Parse listing data from Zillow page HTML.
 */
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
					images = Array.isArray(item.image)
						? item.image
						: [item.image];
				}
				description = item.description || "";
			}
		} catch {
			// continue
		}
	}

	// Meta tags fallback
	const ogTitle =
		html.match(/<meta property="og:title" content="([^"]*)"/)
			?.[1] || "";
	const ogDesc =
		html.match(/<meta property="og:description" content="([^"]*)"/)
			?.[1] || "";
	const ogImage =
		html.match(/<meta property="og:image" content="([^"]*)"/)
			?.[1] || "";

	if (!address && ogTitle) address = ogTitle.split("|")[0]?.trim() || ogTitle;
	if (!description && ogDesc) description = ogDesc;
	if (ogImage && images.length === 0) images = [ogImage];

	// Regex extraction from embedded JSON — try multiple key variations
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

	// Last resort: parse beds/baths/sqft from description or og:description text
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

	// Also try og:title which often has "3 bed, 2 bath" format
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

	// ── Extract images: collect ALL zillowstatic URLs, group by photo hash, pick largest ──
	// Zillow photo URLs look like: photos.zillowstatic.com/fp/<hash>-cc_ft_<size>.jpg
	// The same photo appears at multiple resolutions (1536, 960, 576, 384, etc.)
	// We group by hash and pick the largest for each unique photo.
	const photoMap = new Map<string, { url: string; size: number }>();

	for (const m of html.matchAll(
		/(?:"|'|src=)(https:\/\/photos\.zillowstatic\.com\/fp\/([a-f0-9]+)[^"']*)/g,
	)) {
		const imgUrl = m[1];
		const hash = m[2]; // unique photo identifier

		// Skip tiny thumbnails
		if (imgUrl.includes("_t.") || imgUrl.includes("/32_")) continue;

		// Extract size from URL (e.g., cc_ft_1536 → 1536, uncropped_scaled_within_1536_1152 → 1536)
		const sizeMatch = imgUrl.match(/(\d{3,4})(?:\.\w+$|_\d+\.\w+$)/);
		const size = sizeMatch ? Number(sizeMatch[1]) : 0;

		const existing = photoMap.get(hash);
		if (!existing || size > existing.size) {
			photoMap.set(hash, { url: imgUrl, size });
		}
	}

	// Also grab any non-/fp/ zillowstatic URLs (og:image, JSON-LD, etc.)
	for (const m of html.matchAll(
		/"(https:\/\/photos\.zillowstatic\.com\/(?!fp\/)[^"]+)"/g,
	)) {
		const imgUrl = m[1];
		if (imgUrl.includes("_t.") || imgUrl.includes("/32_")) continue;
		// Use full URL as key since no hash
		if (!photoMap.has(imgUrl)) {
			photoMap.set(imgUrl, { url: imgUrl, size: 0 });
		}
	}

	// Merge with any images already found (JSON-LD, og:image)
	const existingSet = new Set(images);
	for (const { url: imgUrl } of photoMap.values()) {
		if (!existingSet.has(imgUrl)) {
			images.push(imgUrl);
			existingSet.add(imgUrl);
		}
	}

	console.log(`[zillow] Found ${photoMap.size} unique photos from HTML`);

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
		classifiedImages: [], // filled by AI after scraping
		lotSize,
		propertyType,
		zestimate,
		daysOnZillow,
		url,
		neighborhoodDescription: "", // filled by AI after scraping
	};
}

/**
 * Classify a single image using Moondream 3 on fal.ai.
 * Returns a tag and short caption.
 */
async function classifyImage(imageUrl: string): Promise<ClassifiedImage> {
	const VALID_TAGS: ImageTag[] = [
		"exterior", "living_room", "kitchen", "bedroom", "bathroom",
		"dining", "backyard", "garage", "pool", "aerial", "other",
	];

	try {
		const result = await fal.subscribe("fal-ai/moondream3-preview/query", {
			input: {
				image_url: imageUrl,
				prompt:
					"Classify this real estate photo. Reply with EXACTLY one word from this list: exterior, living_room, kitchen, bedroom, bathroom, dining, backyard, garage, pool, aerial, other. Then a comma, then a 3-5 word description. Example: kitchen, modern white kitchen island",
				reasoning: false,
			},
		});

		const text = (result.data as { output?: string })?.output?.trim() || "other, property photo";
		const [rawTag, ...rest] = text.split(",");
		const tag = VALID_TAGS.includes(rawTag.trim().toLowerCase() as ImageTag)
			? (rawTag.trim().toLowerCase() as ImageTag)
			: "other";
		const caption = rest.join(",").trim() || "property photo";

		return { url: imageUrl, tag, caption };
	} catch (err) {
		console.error(`[zillow] Failed to classify image: ${err}`);
		return { url: imageUrl, tag: "other", caption: "property photo" };
	}
}

/**
 * Classify all images in parallel using fal.ai Moondream 3.
 */
async function classifyImages(imageUrls: string[]): Promise<ClassifiedImage[]> {
	const falKey = process.env.FAL_KEY;
	if (!falKey || imageUrls.length === 0) {
		return imageUrls.map((url) => ({ url, tag: "other" as ImageTag, caption: "property photo" }));
	}

	fal.config({ credentials: falKey });

	console.log(`[zillow] Classifying ${imageUrls.length} images with Moondream 3...`);
	const results = await Promise.all(imageUrls.map(classifyImage));
	console.log(`[zillow] Classification complete:`, results.map((r) => `${r.tag}: ${r.caption}`));
	return results;
}

/**
 * Generate a human-sounding neighborhood description using GPT-4o-mini.
 * Falls back to a simple static blurb if no API key or if generation fails.
 */
async function generateNeighborhoodDescription(
	listing: ZillowListing,
): Promise<string> {
	if (!process.env.OPENAI_API_KEY) {
		return buildFallbackNeighborhoodDescription(listing);
	}

	try {
		const loc = [listing.city, listing.state].filter(Boolean).join(", ");
		const result = await generateText({
			model: openai("gpt-4o-mini"),
			prompt: `Write a 3-4 sentence description of the neighborhood and community around ${listing.address || "this property"} in ${loc || "this area"}.

Property details for context: ${listing.propertyType}, ${listing.beds} bedrooms, ${listing.baths} bathrooms, ${listing.sqft ? listing.sqft + " sqft" : ""}, ${listing.yearBuilt ? "built in " + listing.yearBuilt : ""}.

Write naturally like a local real estate agent would describe the area to a buyer. Mention the feel of the community, what makes it a good place to live, and any likely nearby amenities. Do not use emdashes, exclamation marks, or marketing buzzwords. Keep it warm, conversational, and grounded. Do not start with "Welcome" or "Nestled in". Just describe the area plainly.`,
			maxTokens: 200,
		});

		return result.text.trim() || buildFallbackNeighborhoodDescription(listing);
	} catch (err) {
		console.error("[zillow] AI neighborhood description failed:", err);
		return buildFallbackNeighborhoodDescription(listing);
	}
}

function buildFallbackNeighborhoodDescription(
	listing: ZillowListing,
): string {
	const loc = [listing.city, listing.state].filter(Boolean).join(", ");
	if (!loc) return "";
	return `${loc} is a well-established community with convenient access to local schools, parks, shopping, and dining. The area offers a mix of residential charm and everyday convenience that appeals to families and professionals alike. Reach out to the listing agent for more details about the neighborhood.`;
}

export const scrapeZillowListing = createServerFn({ method: "POST" })
	.inputValidator(
		(data: {
			url: string;
		}) => {
			if (!data.url) throw new Error("URL is required");
			if (!data.url.includes("zillow.com")) {
				throw new Error("Please provide a valid Zillow listing URL");
			}
			return data;
		},
	)
	.handler(async ({ data }) => {
		const { url } = data;
		const cleanUrl = url.startsWith("http") ? url : `https://${url}`;

		// Check in-memory cache first (saves ScrapingBee credits during dev)
		const cached = listingCache.get(cleanUrl);
		if (cached && Date.now() - cached.ts < CACHE_TTL) {
			console.log(`[zillow] Cache hit for ${cleanUrl}`);
			return { success: true, listing: cached.listing };
		}

		try {
			const html = await fetchPageHtml(cleanUrl);
			console.log(`[zillow] HTML length: ${html.length} chars`);
			const listing = parseZillowHtml(html, cleanUrl);
			console.log(`[zillow] Extracted ${listing.images.length} images (pre-validation)`);

			// Validate images in parallel — remove any that 404 or are access-restricted
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
							return res.ok ? imgUrl : null;
						} catch {
							return null;
						}
					}),
				);
				listing.images = validated.filter(Boolean) as string[];
				console.log(`[zillow] ${listing.images.length} images passed validation`);
			}

			if (!listing.address && !listing.price) {
				throw new Error(
					"Could not extract listing data. Zillow may have blocked the request. Please try again.",
				);
			}

			// Classify images with fal.ai Moondream 3 + generate neighborhood description in parallel
			const [classifiedImages, neighborhoodDesc] = await Promise.all([
				classifyImages(listing.images),
				generateNeighborhoodDescription(listing),
			]);
			listing.classifiedImages = classifiedImages;
			listing.neighborhoodDescription = neighborhoodDesc;

			// Cache the result
			listingCache.set(cleanUrl, { listing, ts: Date.now() });

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
										{
											type: "mrkdwn",
											text: `*URL:*\n${cleanUrl}`,
										},
									],
								},
							],
						}),
					});
				} catch {
					console.error("Slack notification failed");
				}
			}

			return { success: true, listing };
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Failed to scrape listing";
			return { success: false, error: message, listing: null };
		}
	});
