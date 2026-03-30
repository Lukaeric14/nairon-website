import {
	Document,
	Page,
	Text,
	View,
	Image,
	StyleSheet,
	Svg,
	Path,
	Rect,
} from "@react-pdf/renderer";
import type {
	ZillowListing,
	PdfPersonalization,
	ImageTag,
	ClassifiedImage,
} from "@/server/zillow-scrape";

const SERIF_BOLD = "Times-Bold";
const SANS = "Helvetica";
const SANS_BOLD = "Helvetica-Bold";

/* ── Color tokens ── */
const cream = "#F5F1EB";
const warmWhite = "#FAF8F5";
const brown = "#3B2F24";
const brownLight = "#6B5D50";
const gold = "#B09060";
const goldLight = "#C9A96E";
const divider = "#D8D0C4";

const LANDSCAPE = { width: 792, height: 612 };

/**
 * Build an Unsplash URL for the property's city/state — used only on the
 * last slide (Location & Neighborhood) as a contextual stock image.
 */
function locationStockImage(city: string, state: string): string {
	const query = [city, state].filter(Boolean).join(" ") || "suburban neighborhood";
	return `https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=2400&q=90&fit=crop&auto=format`;
}

/* Use images as-is from the scraper — no URL rewriting */

/* ── Simple SVG icons (Lucide-inspired, 14×14) ── */
function IconBed() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Path
				d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
		</Svg>
	);
}

function IconBath() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Path
				d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1ZM6 12V5a2 2 0 0 1 2-2h3"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
		</Svg>
	);
}

function IconRuler() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="2"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
			<Path
				d="M3 9h4M3 15h4M9 3v4M15 3v4"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
		</Svg>
	);
}

function IconCalendar() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Rect
				x="3"
				y="4"
				width="18"
				height="18"
				rx="2"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
			<Path
				d="M16 2v4M8 2v4M3 10h18"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
		</Svg>
	);
}

function IconHome() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Path
				d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
			<Path d="M9 22V12h6v10" stroke={gold} strokeWidth="1.5" fill="none" />
		</Svg>
	);
}

function IconDollar() {
	return (
		<Svg width="14" height="14" viewBox="0 0 24 24">
			<Path
				d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"
				stroke={gold}
				strokeWidth="1.5"
				fill="none"
			/>
		</Svg>
	);
}

/* Map stat labels to icons */
const STAT_ICONS: Record<string, () => JSX.Element> = {
	Bedrooms: IconBed,
	Bathrooms: IconBath,
	"Square Feet": IconRuler,
	"Year Built": IconCalendar,
	"Lot Size": IconHome,
	"List Price": IconDollar,
};

const s = StyleSheet.create({
	/* ═══ PAGE 1: Cover ═══ */
	cover: { backgroundColor: "#1A1510", padding: 0 },
	coverWrap: { position: "relative", width: "100%", height: "100%" },
	coverImg: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	coverOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(20,16,10,0.68)",
	},
	coverContent: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		padding: 80,
	},
	coverBrokerage: {
		fontFamily: SANS,
		fontSize: 9,
		letterSpacing: 5,
		textTransform: "uppercase",
		color: goldLight,
		marginBottom: 16,
		textAlign: "center",
	},
	coverDivider: {
		width: 48,
		height: 1.5,
		backgroundColor: goldLight,
		marginBottom: 20,
	},
	coverAddress: {
		fontFamily: SERIF_BOLD,
		fontSize: 36,
		color: "#FFFFFF",
		textAlign: "center",
		lineHeight: 1.2,
		marginBottom: 10,
	},
	coverLocation: {
		fontFamily: SANS,
		fontSize: 12,
		color: "rgba(255,255,255,0.55)",
		textAlign: "center",
	},
	coverBrand: {
		position: "absolute",
		top: 32,
		left: 0,
		width: "100%",
		alignItems: "center",
	},
	coverBrandText: {
		fontFamily: SANS_BOLD,
		fontSize: 9,
		color: goldLight,
		letterSpacing: 4,
		opacity: 0.5,
	},
	coverBottom: {
		position: "absolute",
		bottom: 32,
		left: 0,
		width: "100%",
		alignItems: "center",
	},
	coverBottomText: {
		fontFamily: SANS,
		fontSize: 8,
		color: "rgba(255,255,255,0.35)",
		letterSpacing: 1,
	},

	/* ═══ PAGE 2: Split — image left, stats right ═══ */
	splitPage: {
		flexDirection: "row",
		height: "100%",
		backgroundColor: cream,
	},
	splitLeft: { width: "55%", height: "100%" },
	splitLeftImg: { width: "100%", height: "100%", objectFit: "cover" },
	splitRight: {
		width: "45%",
		padding: 36,
		paddingTop: 32,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: cream,
	},
	splitHeading: {
		fontFamily: SERIF_BOLD,
		fontSize: 24,
		color: brown,
		lineHeight: 1.2,
		marginBottom: 6,
		textAlign: "center",
	},
	splitLocation: {
		fontFamily: SANS,
		fontSize: 10,
		color: brownLight,
		marginBottom: 16,
		textAlign: "center",
	},
	splitDivider: {
		width: 40,
		height: 1.5,
		backgroundColor: gold,
		marginBottom: 16,
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 14,
	},
	statCell: {
		width: "33.33%",
		paddingVertical: 10,
		alignItems: "center",
	},
	statTextWrap: { alignItems: "center" },
	statValue: {
		fontFamily: SERIF_BOLD,
		fontSize: 28,
		color: brown,
		marginBottom: 4,
		textAlign: "center",
	},
	statLabel: {
		fontFamily: SANS,
		fontSize: 7,
		letterSpacing: 1.5,
		textTransform: "uppercase",
		color: brownLight,
		textAlign: "center",
	},
	splitDesc: {
		fontFamily: SANS,
		fontSize: 9,
		lineHeight: 1.7,
		color: brownLight,
		marginBottom: 24,
		textAlign: "center",
	},

	/* ═══ PAGE 3: About — image left, description right ═══ */
	aboutPage: {
		flexDirection: "row",
		height: "100%",
		backgroundColor: cream,
	},
	aboutImgWrap: { width: "58%", height: "100%" },
	aboutImg: { width: "100%", height: "100%", objectFit: "cover" },
	aboutContent: {
		width: "42%",
		padding: 36,
		justifyContent: "center",
		backgroundColor: warmWhite,
	},
	aboutLabel: {
		fontFamily: SANS,
		fontSize: 8,
		letterSpacing: 3,
		textTransform: "uppercase",
		color: gold,
		marginBottom: 14,
	},
	aboutHeading: {
		fontFamily: SERIF_BOLD,
		fontSize: 20,
		color: brown,
		marginBottom: 14,
		lineHeight: 1.25,
	},
	aboutDesc: {
		fontFamily: SANS,
		fontSize: 9,
		lineHeight: 1.7,
		color: brownLight,
	},

	/* ═══ PAGE 4: Highlights — text left, image right ═══ */
	highlightPage: {
		flexDirection: "row",
		height: "100%",
		backgroundColor: cream,
	},
	highlightLeft: {
		width: "42%",
		padding: 36,
		justifyContent: "center",
		backgroundColor: warmWhite,
	},
	highlightRight: { width: "58%", height: "100%" },
	highlightRightImg: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	highlightLabel: {
		fontFamily: SANS,
		fontSize: 8,
		letterSpacing: 3,
		textTransform: "uppercase",
		color: gold,
		marginBottom: 16,
	},
	highlightHeading: {
		fontFamily: SERIF_BOLD,
		fontSize: 20,
		color: brown,
		lineHeight: 1.25,
		marginBottom: 16,
	},
	/* Icon + text row for highlight features */
	featureRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 10,
	},
	featureText: {
		fontFamily: SANS,
		fontSize: 9,
		color: brownLight,
	},
	highlightDesc: {
		fontFamily: SANS,
		fontSize: 8.5,
		lineHeight: 1.7,
		color: brownLight,
		marginTop: 12,
	},

	/* ═══ PAGE 5: Location & Market ═══ */
	marketPage: {
		flexDirection: "row",
		height: "100%",
		backgroundColor: warmWhite,
	},
	marketLeft: {
		width: "50%",
		padding: 36,
		justifyContent: "center",
	},
	marketRight: { width: "50%", height: "100%" },
	marketRightImg: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	marketLabel: {
		fontFamily: SANS,
		fontSize: 8,
		letterSpacing: 3,
		textTransform: "uppercase",
		color: gold,
		marginBottom: 14,
	},
	marketHeading: {
		fontFamily: SERIF_BOLD,
		fontSize: 24,
		color: brown,
		marginBottom: 6,
	},
	marketAddress: {
		fontFamily: SANS,
		fontSize: 10,
		color: brownLight,
		marginBottom: 20,
	},
	marketDivider: {
		width: "100%",
		height: 0.5,
		backgroundColor: divider,
		marginBottom: 20,
	},
	marketCard: {
		marginBottom: 14,
		paddingBottom: 14,
		borderBottom: `0.5px solid ${divider}`,
	},
	marketCardTitle: {
		fontFamily: SERIF_BOLD,
		fontSize: 12,
		color: brown,
		marginBottom: 5,
	},
	marketCardText: {
		fontFamily: SANS,
		fontSize: 8.5,
		lineHeight: 1.65,
		color: brownLight,
	},

	/* ── Shared footer ── */
	footer: {
		position: "absolute",
		bottom: 18,
		left: 36,
		right: 36,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	footerLeft: {
		fontFamily: SANS,
		fontSize: 7,
		color: brownLight,
		opacity: 0.4,
		letterSpacing: 1,
	},
	footerRight: {
		fontFamily: SANS_BOLD,
		fontSize: 7,
		color: gold,
		letterSpacing: 2,
		opacity: 0.5,
	},
});

function fmt(n: number): string {
	if (!n) return "Price on Request";
	return `$${n.toLocaleString()}`;
}

function trunc(text: string, max: number): string {
	if (!text) return "";
	if (text.length <= max) return text;
	return `${text.slice(0, max).trimEnd()}…`;
}

export function PropertyPDF({
	listing,
	personalization,
}: {
	listing: ZillowListing;
	personalization: PdfPersonalization;
}) {
	const loc = [listing.city, listing.state, listing.zipCode]
		.filter(Boolean)
		.join(", ");
	const rawImages = listing.images;
	const classified = listing.classifiedImages || [];

	// Smart image picker: find best image for each slide by tag preference
	// Page 1 (Cover): exterior/aerial — hero shot
	// Page 2 (Overview): living_room/kitchen — interior wide
	// Page 3 (About): kitchen/dining — lifestyle
	// Page 4 (Highlights): bedroom/bathroom — features
	// Page 5 (Location): backyard/exterior/aerial — outdoor/area
	function pickImage(preferredTags: ImageTag[], fallbackIndex: number): string {
		if (classified.length === 0) {
			return rawImages.length > 0 ? rawImages[fallbackIndex % rawImages.length] : "";
		}
		for (const tag of preferredTags) {
			const match = classified.find((c) => c.tag === tag);
			if (match) return match.url;
		}
		// No tag match — use fallback index
		return rawImages.length > 0 ? rawImages[fallbackIndex % rawImages.length] : "";
	}

	// Pick unique images per slide — avoid repeats
	const used = new Set<string>();
	function pickUniqueImage(preferredTags: ImageTag[], fallbackIndex: number): string {
		if (classified.length > 0) {
			for (const tag of preferredTags) {
				const match = classified.find((c) => c.tag === tag && !used.has(c.url));
				if (match) {
					used.add(match.url);
					return match.url;
				}
			}
		}
		// Fallback: pick first unused image
		for (let i = 0; i < rawImages.length; i++) {
			const idx = (fallbackIndex + i) % rawImages.length;
			if (!used.has(rawImages[idx])) {
				used.add(rawImages[idx]);
				return rawImages[idx];
			}
		}
		return rawImages.length > 0 ? rawImages[fallbackIndex % rawImages.length] : "";
	}

	const coverImg = pickUniqueImage(["exterior", "aerial"], 0);
	const overviewImg = pickUniqueImage(["living_room", "kitchen", "dining"], 1);
	const aboutImg = pickUniqueImage(["kitchen", "dining", "living_room"], 2);
	const highlightImg = pickUniqueImage(["bedroom", "bathroom", "other"], 3);
	const locationImg = pickUniqueImage(["backyard", "pool", "aerial", "exterior"], 4);
	const brokerage = personalization.brokerageName;

	/* Stats for page 2 grid (with icon mapping) */
	const stats: { value: string; label: string }[] = [];
	if (listing.beds > 0)
		stats.push({ value: `${listing.beds}`, label: "Bedrooms" });
	if (listing.baths > 0)
		stats.push({ value: `${listing.baths}`, label: "Bathrooms" });
	if (listing.sqft > 0)
		stats.push({
			value: listing.sqft.toLocaleString(),
			label: "Square Feet",
		});
	if (listing.yearBuilt)
		stats.push({ value: `${listing.yearBuilt}`, label: "Year Built" });
	if (listing.lotSize)
		stats.push({ value: listing.lotSize, label: "Lot Size" });
	if (listing.price > 0)
		stats.push({ value: fmt(listing.price), label: "List Price" });

	return (
		<Document>
			{/* ═══════ PAGE 1: COVER ═══════ */}
			<Page size={LANDSCAPE} style={s.cover}>
				<View style={s.coverWrap}>
					<Image
						src={coverImg}
						style={s.coverImg}
					/>
					<View style={s.coverOverlay} />

					<View style={s.coverBrand}>
						<Text style={s.coverBrandText}>
							{brokerage || "EXCLUSIVE LISTING"}
						</Text>
					</View>

					<View style={s.coverContent}>
						<View style={s.coverDivider} />
						<Text style={s.coverAddress}>
							{listing.address || "Property Listing"}
						</Text>
						{loc && (
							<Text style={s.coverLocation}>{loc}</Text>
						)}
					</View>

					<View style={s.coverBottom}>
						<Text style={s.coverBottomText}>
							{new Date().toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
							})}
						</Text>
					</View>
				</View>
			</Page>

			{/* ═══════ PAGE 2: Property Overview — EMAAR-style stats ═══════ */}
			<Page size={LANDSCAPE} style={s.splitPage}>
				<View style={s.splitLeft}>
					<Image
						src={overviewImg}
						style={s.splitLeftImg}
					/>
				</View>

				<View style={s.splitRight}>
					<Text style={s.splitHeading}>
						{listing.address || "Property Listing"}
					</Text>
					{loc && (
						<Text style={s.splitLocation}>{loc}</Text>
					)}

					<Text style={s.splitDesc}>
						{trunc(listing.description, 200) ||
							`A beautifully appointed ${listing.propertyType.toLowerCase()} in ${loc || "a prime location"}.`}
					</Text>

					{/* 3-column stats grid — large bold numbers */}
					<View style={s.statsGrid}>
						{stats.slice(0, 6).map((st) => (
							<View key={st.label} style={s.statCell}>
								<Text style={s.statValue}>
									{st.value}
								</Text>
								<Text style={s.statLabel}>
									{st.label}
								</Text>
							</View>
						))}
					</View>
				</View>
			</Page>

			{/* ═══════ PAGE 3: About ═══════ */}
			<Page size={LANDSCAPE} style={s.aboutPage}>
				<View style={s.aboutImgWrap}>
					<Image
						src={aboutImg}
						style={s.aboutImg}
					/>
				</View>

				<View style={s.aboutContent}>
					<Text style={s.aboutLabel}>About This Property</Text>
					<Text style={s.aboutHeading}>
						{listing.propertyType}
						{listing.yearBuilt
							? ` — Built ${listing.yearBuilt}`
							: ""}
					</Text>
					<Text style={s.aboutDesc}>
						{trunc(listing.description, 500) ||
							`This ${listing.propertyType.toLowerCase()} offers ${listing.beds ? `${listing.beds} bedrooms` : "generous living spaces"}${listing.baths ? ` and ${listing.baths} bathrooms` : ""}${listing.sqft ? ` across ${listing.sqft.toLocaleString()} square feet of thoughtfully designed living space` : ""}. Contact the listing agent for a private showing.`}
					</Text>

					<View style={s.footer}>
						<Text style={s.footerLeft}>
							{brokerage || "Property Brochure"}
						</Text>
						<Text style={s.footerRight}>
							{listing.propertyType.toUpperCase()}
						</Text>
					</View>
				</View>
			</Page>

			{/* ═══════ PAGE 4: Highlights with feature icons ═══════ */}
			<Page size={LANDSCAPE} style={s.highlightPage}>
				<View style={s.highlightLeft}>
					<Text style={s.highlightLabel}>
						Property Features
					</Text>
					<Text style={s.highlightHeading}>
						At a Glance
					</Text>

					{/* Feature rows with icons */}
					{listing.beds > 0 && (
						<View style={s.featureRow}>
							<IconBed />
							<Text style={s.featureText}>
								{listing.beds} Bedrooms
							</Text>
						</View>
					)}
					{listing.baths > 0 && (
						<View style={s.featureRow}>
							<IconBath />
							<Text style={s.featureText}>
								{listing.baths} Bathrooms
							</Text>
						</View>
					)}
					{listing.sqft > 0 && (
						<View style={s.featureRow}>
							<IconRuler />
							<Text style={s.featureText}>
								{listing.sqft.toLocaleString()} Square Feet
							</Text>
						</View>
					)}
					{listing.lotSize && (
						<View style={s.featureRow}>
							<IconHome />
							<Text style={s.featureText}>
								Lot Size: {listing.lotSize}
							</Text>
						</View>
					)}
					{listing.yearBuilt && (
						<View style={s.featureRow}>
							<IconCalendar />
							<Text style={s.featureText}>
								Built in {listing.yearBuilt}
							</Text>
						</View>
					)}
					{listing.price > 0 && listing.sqft > 0 && (
						<View style={s.featureRow}>
							<IconDollar />
							<Text style={s.featureText}>
								${Math.round(listing.price / listing.sqft)}{" "}
								per Square Foot
							</Text>
						</View>
					)}

					{listing.zestimate ? (
						<Text style={s.highlightDesc}>
							Zillow estimates this property at{" "}
							{fmt(listing.zestimate)},{" "}
							{listing.zestimate > listing.price
								? "above"
								: "below"}{" "}
							the current list price of{" "}
							{fmt(listing.price)}.
						</Text>
					) : null}
				</View>

				<View style={s.highlightRight}>
					<Image
						src={highlightImg}
						style={s.highlightRightImg}
					/>
				</View>
			</Page>

			{/* ═══════ PAGE 5: Location & Neighborhood ═══════ */}
			<Page size={LANDSCAPE} style={s.marketPage}>
				<View style={s.marketLeft}>
					<Text style={s.marketLabel}>
						Location & Neighborhood
					</Text>
					<Text style={s.marketHeading}>
						{listing.city || "About the Area"}
						{listing.state ? `, ${listing.state}` : ""}
					</Text>
					<Text style={s.marketAddress}>
						{listing.address || "Property Address"}
						{listing.zipCode ? ` ${listing.zipCode}` : ""}
					</Text>

					<View style={s.marketDivider} />

					{/* AI-generated neighborhood description */}
					{listing.neighborhoodDescription ? (
						<View style={s.marketCard}>
							<Text style={s.marketCardText}>
								{listing.neighborhoodDescription}
							</Text>
						</View>
					) : null}

					{listing.daysOnZillow !== null &&
						listing.daysOnZillow >= 0 && (
							<View style={s.marketCard}>
								<Text style={s.marketCardTitle}>
									Time on Market
								</Text>
								<Text style={s.marketCardText}>
									This property has been listed for{" "}
									{listing.daysOnZillow} days.
									{listing.daysOnZillow < 7
										? " This is a new listing. Schedule a showing before it's gone."
										: listing.daysOnZillow < 30
											? " Still a fresh listing with strong interest expected."
											: " There may be room for negotiation. Ask your agent."}
								</Text>
							</View>
						)}

					<View
						style={{ ...s.marketCard, borderBottom: "none" }}
					>
						<Text style={s.marketCardTitle}>
							Property Details
						</Text>
						<Text style={s.marketCardText}>
							{listing.propertyType} in {loc || "a desirable location"}.
							{listing.price && listing.sqft
								? ` Listed at $${Math.round(listing.price / listing.sqft)} per square foot.`
								: ""}
							{listing.yearBuilt
								? ` Built in ${listing.yearBuilt}.`
								: ""}
							{listing.lotSize
								? ` ${listing.lotSize} lot.`
								: ""}
						</Text>
					</View>

					<View style={s.footer}>
						<Text style={s.footerLeft}>
							Data sourced from Zillow. Verify independently.
						</Text>
						<Text style={s.footerRight}>
							{brokerage || "PROPERTY BROCHURE"}
						</Text>
					</View>
				</View>

				<View style={s.marketRight}>
					<Image
						src={locationImg || locationStockImage(listing.city, listing.state)}
						style={s.marketRightImg}
					/>
				</View>
			</Page>
		</Document>
	);
}
