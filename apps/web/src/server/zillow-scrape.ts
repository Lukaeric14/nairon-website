import { createServerFn } from "@tanstack/react-start";

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
	lotSize: string | null;
	propertyType: string;
	zestimate: number | null;
	daysOnZillow: number | null;
	url: string;
}

/**
 * Extract listing data from Zillow page HTML.
 * Zillow embeds structured data as JSON-LD and in preloaded Apollo/Next state.
 */
function parseZillowHtml(html: string, url: string): ZillowListing {
	// Try JSON-LD first (most reliable)
	const jsonLdMatch = html.match(
		/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
	);

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

	// Parse JSON-LD
	if (jsonLdMatch) {
		try {
			const ld = JSON.parse(jsonLdMatch[1]);
			const item = Array.isArray(ld) ? ld[0] : ld;
			if (item?.["@type"]?.includes?.("SingleFamilyResidence") || item?.["@type"]?.includes?.("Product") || item) {
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
			// JSON-LD parse failed, continue with other methods
		}
	}

	// Extract from meta tags as fallback
	const ogTitle =
		html.match(/<meta property="og:title" content="([^"]*)"/)
			?.[1] || "";
	const ogDesc =
		html.match(/<meta property="og:description" content="([^"]*)"/)
			?.[1] || "";
	const ogImage =
		html.match(/<meta property="og:image" content="([^"]*)"/)
			?.[1] || "";

	if (!address && ogTitle) {
		// og:title is usually like "123 Main St, City, ST 12345"
		address = ogTitle.split("|")[0]?.trim() || ogTitle;
	}
	if (!description && ogDesc) description = ogDesc;
	if (ogImage && images.length === 0) images = [ogImage];

	// Extract price from common patterns
	if (!price) {
		const priceMatch = html.match(
			/"price"\s*:\s*(\d[\d,]*)/,
		);
		if (priceMatch) price = Number(priceMatch[1].replace(/,/g, ""));
	}
	if (!price) {
		const priceMatch2 = html.match(
			/\$\s*([\d,]+(?:\.\d+)?)\s*<\/span>/,
		);
		if (priceMatch2) price = Number(priceMatch2[1].replace(/,/g, ""));
	}

	// Extract beds/baths/sqft from common patterns
	if (!beds) {
		const bedsMatch = html.match(/"bedrooms"\s*:\s*(\d+)/);
		if (bedsMatch) beds = Number(bedsMatch[1]);
	}
	if (!baths) {
		const bathsMatch = html.match(/"bathrooms"\s*:\s*(\d+)/);
		if (bathsMatch) baths = Number(bathsMatch[1]);
	}
	if (!sqft) {
		const sqftMatch = html.match(/"livingArea"\s*:\s*(\d[\d,]*)/);
		if (sqftMatch) sqft = Number(sqftMatch[1].replace(/,/g, ""));
	}

	// Year built
	const yearMatch = html.match(/"yearBuilt"\s*:\s*(\d{4})/);
	if (yearMatch) yearBuilt = Number(yearMatch[1]);

	// Property type
	const typeMatch = html.match(/"homeType"\s*:\s*"([^"]+)"/);
	if (typeMatch) propertyType = typeMatch[1].replace(/_/g, " ");

	// Zestimate
	const zestMatch = html.match(/"zestimate"\s*:\s*(\d[\d,]*)/);
	if (zestMatch) zestimate = Number(zestMatch[1].replace(/,/g, ""));

	// Days on Zillow
	const daysMatch = html.match(/"daysOnZillow"\s*:\s*(-?\d+)/);
	if (daysMatch) daysOnZillow = Number(daysMatch[1]);

	// Lot size
	const lotMatch = html.match(/"lotSize"\s*:\s*(\d[\d,.]*)/);
	if (lotMatch) lotSize = `${Number(lotMatch[1]).toLocaleString()} sqft`;
	const lotAcresMatch = html.match(/"lotAreaValue"\s*:\s*([\d.]+)/);
	if (!lotSize && lotAcresMatch) lotSize = `${lotAcresMatch[1]} acres`;

	// Extract more images from carousel data
	const imgMatches = html.matchAll(/"url"\s*:\s*"(https:\/\/photos\.zillowstatic\.com\/[^"]+)"/g);
	for (const m of imgMatches) {
		if (!images.includes(m[1]) && images.length < 6) {
			images.push(m[1]);
		}
	}

	// Parse address components from URL if not found
	if (!city || !state) {
		const urlParts = url.match(
			/zillow\.com\/homedetails\/([^/]+)/,
		);
		if (urlParts) {
			const slug = urlParts[1].replace(/-/g, " ");
			// Usually format: "123-Main-St-City-ST-12345"
			const parts = slug.split(" ");
			if (parts.length >= 3) {
				// Try to extract state (2-letter) and zip (5-digit)
				for (let i = parts.length - 1; i >= 0; i--) {
					if (!zipCode && /^\d{5}$/.test(parts[i])) zipCode = parts[i];
					if (!state && /^[A-Z]{2}$/i.test(parts[i])) state = parts[i].toUpperCase();
				}
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
		images: images.slice(0, 6),
		lotSize,
		propertyType,
		zestimate,
		daysOnZillow,
		url,
	};
}

export const scrapeZillowListing = createServerFn({ method: "POST" })
	.inputValidator((data: { url: string; email: string }) => {
		if (!data.url || !data.email) throw new Error("URL and email are required");
		// Validate Zillow URL
		if (!data.url.includes("zillow.com")) {
			throw new Error("Please provide a valid Zillow listing URL");
		}
		// Basic email validation
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
			throw new Error("Please provide a valid email address");
		}
		return data;
	})
	.handler(async ({ data }) => {
		const { url, email } = data;

		// Normalize URL
		const cleanUrl = url.startsWith("http") ? url : `https://${url}`;

		try {
			const response = await fetch(cleanUrl, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
					Accept:
						"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "en-US,en;q=0.9",
					"Cache-Control": "no-cache",
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch listing (${response.status})`);
			}

			const html = await response.text();
			const listing = parseZillowHtml(html, cleanUrl);

			if (!listing.address && !listing.price) {
				throw new Error(
					"Could not extract listing data. Zillow may have blocked the request. Please try again.",
				);
			}

			// Send Slack notification for lead capture
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
										text: "New Property PDF Lead",
										emoji: true,
									},
								},
								{
									type: "section",
									fields: [
										{ type: "mrkdwn", text: `*Email:*\n${email}` },
										{ type: "mrkdwn", text: `*Listing:*\n${listing.address}` },
										{ type: "mrkdwn", text: `*Price:*\n$${listing.price.toLocaleString()}` },
										{ type: "mrkdwn", text: `*URL:*\n${cleanUrl}` },
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
				error instanceof Error ? error.message : "Failed to scrape listing";
			return { success: false, error: message, listing: null };
		}
	});
