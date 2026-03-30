import {
	Document,
	Page,
	Text,
	View,
	Image,
	StyleSheet,
} from "@react-pdf/renderer";
import type { ZillowListing } from "@/server/zillow-scrape";

/* ── Styles ── */
const gold = "#C9A96E";
const dark = "#0C0C0C";
const muted = "#8A8580";

const s = StyleSheet.create({
	page: {
		backgroundColor: dark,
		padding: 0,
	},
	/* ── Cover page ── */
	cover: {
		position: "relative",
		width: "100%",
		height: "100%",
	},
	coverImage: {
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
		backgroundColor: "rgba(0,0,0,0.55)",
	},
	coverContent: {
		position: "absolute",
		bottom: 60,
		left: 48,
		right: 48,
	},
	coverTag: {
		color: gold,
		fontSize: 9,
		letterSpacing: 3,
		textTransform: "uppercase",
		marginBottom: 12,
	},
	coverAddress: {
		color: "#FFFFFF",
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 1.2,
		marginBottom: 8,
	},
	coverLocation: {
		color: "rgba(255,255,255,0.7)",
		fontSize: 14,
		marginBottom: 20,
	},
	coverPrice: {
		color: gold,
		fontSize: 28,
		fontWeight: "bold",
	},
	coverDivider: {
		width: 48,
		height: 2,
		backgroundColor: gold,
		marginBottom: 16,
	},

	/* ── Details page ── */
	detailsPage: {
		backgroundColor: "#FAFAF8",
		padding: 48,
	},
	sectionLabel: {
		color: gold,
		fontSize: 9,
		letterSpacing: 3,
		textTransform: "uppercase",
		marginBottom: 16,
	},
	heading: {
		color: dark,
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 24,
	},
	statsRow: {
		flexDirection: "row",
		marginBottom: 32,
		gap: 0,
	},
	statBox: {
		flex: 1,
		borderRight: "1px solid #E0DDD8",
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	statBoxLast: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: "center",
		borderRight: "none",
	},
	statValue: {
		color: dark,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 4,
	},
	statLabel: {
		color: muted,
		fontSize: 8,
		letterSpacing: 2,
		textTransform: "uppercase",
	},
	description: {
		color: "#4A4640",
		fontSize: 11,
		lineHeight: 1.7,
		marginBottom: 32,
	},
	detailsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 0,
		marginBottom: 32,
	},
	detailItem: {
		width: "50%",
		paddingVertical: 10,
		paddingRight: 16,
		borderBottom: "1px solid #E0DDD8",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	detailLabel: {
		color: muted,
		fontSize: 9,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	detailValue: {
		color: dark,
		fontSize: 10,
		fontWeight: "bold",
	},

	/* ── Gallery page ── */
	galleryPage: {
		backgroundColor: dark,
		padding: 48,
	},
	galleryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	galleryImage: {
		width: "49%",
		height: 180,
		objectFit: "cover",
		borderRadius: 4,
	},

	/* ── Footer on every page ── */
	footer: {
		position: "absolute",
		bottom: 24,
		left: 48,
		right: 48,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	footerText: {
		color: "rgba(255,255,255,0.3)",
		fontSize: 7,
		letterSpacing: 1,
	},
	footerTextDark: {
		color: "rgba(0,0,0,0.25)",
		fontSize: 7,
		letterSpacing: 1,
	},
	footerBrand: {
		color: gold,
		fontSize: 8,
		fontWeight: "bold",
		letterSpacing: 2,
	},
	footerBrandDark: {
		color: gold,
		fontSize: 8,
		fontWeight: "bold",
		letterSpacing: 2,
		opacity: 0.6,
	},

	/* ── Market page ── */
	marketPage: {
		backgroundColor: "#FAFAF8",
		padding: 48,
	},
	insightCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 6,
		padding: 20,
		marginBottom: 12,
		borderLeft: `3px solid ${gold}`,
	},
	insightTitle: {
		color: dark,
		fontSize: 11,
		fontWeight: "bold",
		marginBottom: 6,
	},
	insightText: {
		color: "#4A4640",
		fontSize: 10,
		lineHeight: 1.6,
	},
	ctaBox: {
		backgroundColor: dark,
		borderRadius: 8,
		padding: 32,
		marginTop: 24,
		alignItems: "center",
	},
	ctaHeading: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
	},
	ctaSub: {
		color: "rgba(255,255,255,0.5)",
		fontSize: 10,
		textAlign: "center",
		marginBottom: 16,
	},
	ctaButton: {
		backgroundColor: gold,
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 28,
	},
	ctaButtonText: {
		color: dark,
		fontSize: 10,
		fontWeight: "bold",
		letterSpacing: 1,
	},
});

function formatPrice(n: number): string {
	if (!n) return "Price on Request";
	return `$${n.toLocaleString()}`;
}

function truncate(text: string, maxLen: number): string {
	if (!text) return "";
	if (text.length <= maxLen) return text;
	return `${text.slice(0, maxLen).trimEnd()}...`;
}

export function PropertyPDF({ listing }: { listing: ZillowListing }) {
	const location = [listing.city, listing.state, listing.zipCode]
		.filter(Boolean)
		.join(", ");

	const details: { label: string; value: string }[] = [
		listing.yearBuilt ? { label: "Year Built", value: String(listing.yearBuilt) } : null,
		listing.propertyType ? { label: "Type", value: listing.propertyType } : null,
		listing.lotSize ? { label: "Lot Size", value: listing.lotSize } : null,
		listing.zestimate ? { label: "Zestimate", value: formatPrice(listing.zestimate) } : null,
		listing.daysOnZillow !== null && listing.daysOnZillow >= 0
			? { label: "Days on Market", value: String(listing.daysOnZillow) }
			: null,
		listing.sqft ? { label: "Price/sqft", value: `$${Math.round(listing.price / listing.sqft)}` } : null,
	].filter((d): d is { label: string; value: string } => d !== null);

	const hasGallery = listing.images.length > 1;

	return (
		<Document>
			{/* ── Page 1: Cover ── */}
			<Page size="LETTER" style={s.page}>
				<View style={s.cover}>
					{listing.images[0] && (
						<Image src={listing.images[0]} style={s.coverImage} />
					)}
					<View style={s.coverOverlay} />
					<View style={s.coverContent}>
						<Text style={s.coverTag}>Property Overview</Text>
						<View style={s.coverDivider} />
						<Text style={s.coverAddress}>{listing.address || "Property Listing"}</Text>
						{location && <Text style={s.coverLocation}>{location}</Text>}
						<Text style={s.coverPrice}>{formatPrice(listing.price)}</Text>
					</View>
					<View style={s.footer}>
						<Text style={s.footerText}>PREPARED BY NAIRON AI</Text>
						<Text style={s.footerBrand}>NAIRON</Text>
					</View>
				</View>
			</Page>

			{/* ── Page 2: Details ── */}
			<Page size="LETTER" style={s.detailsPage}>
				<Text style={s.sectionLabel}>Property Details</Text>
				<Text style={s.heading}>{listing.address || "Property Details"}</Text>

				{/* Key stats */}
				<View style={s.statsRow}>
					<View style={s.statBox}>
						<Text style={s.statValue}>{listing.beds || "—"}</Text>
						<Text style={s.statLabel}>Bedrooms</Text>
					</View>
					<View style={s.statBox}>
						<Text style={s.statValue}>{listing.baths || "—"}</Text>
						<Text style={s.statLabel}>Bathrooms</Text>
					</View>
					<View style={s.statBox}>
						<Text style={s.statValue}>
							{listing.sqft ? listing.sqft.toLocaleString() : "—"}
						</Text>
						<Text style={s.statLabel}>Sq. Ft.</Text>
					</View>
					<View style={s.statBoxLast}>
						<Text style={s.statValue}>{formatPrice(listing.price)}</Text>
						<Text style={s.statLabel}>List Price</Text>
					</View>
				</View>

				{/* Description */}
				{listing.description && (
					<>
						<Text style={s.sectionLabel}>About This Property</Text>
						<Text style={s.description}>
							{truncate(listing.description, 800)}
						</Text>
					</>
				)}

				{/* Details grid */}
				{details.length > 0 && (
					<>
						<Text style={s.sectionLabel}>Quick Facts</Text>
						<View style={s.detailsGrid}>
							{details.map((d) => (
								<View key={d.label} style={s.detailItem}>
									<Text style={s.detailLabel}>{d.label}</Text>
									<Text style={s.detailValue}>{d.value}</Text>
								</View>
							))}
						</View>
					</>
				)}

				<View style={s.footer}>
					<Text style={s.footerTextDark}>
						Data sourced from Zillow. Verify all information independently.
					</Text>
					<Text style={s.footerBrandDark}>NAIRON</Text>
				</View>
			</Page>

			{/* ── Page 3: Gallery (if images available) ── */}
			{hasGallery && (
				<Page size="LETTER" style={s.galleryPage}>
					<Text style={{ ...s.sectionLabel, color: "rgba(255,255,255,0.4)" }}>
						Photo Gallery
					</Text>
					<Text style={{ ...s.heading, color: "#FFFFFF", marginBottom: 20 }}>
						Property Photos
					</Text>
					<View style={s.galleryGrid}>
						{listing.images.slice(1, 5).map((img) => (
							<Image key={`img-${img.slice(-20)}`} src={img} style={s.galleryImage} />
						))}
					</View>
					<View style={s.footer}>
						<Text style={s.footerText}>
							Photos from Zillow listing
						</Text>
						<Text style={s.footerBrand}>NAIRON</Text>
					</View>
				</Page>
			)}

			{/* ── Page 4: Market Insights + CTA ── */}
			<Page size="LETTER" style={s.marketPage}>
				<Text style={s.sectionLabel}>Market Intelligence</Text>
				<Text style={s.heading}>AI-Powered Insights</Text>

				<View style={s.insightCard}>
					<Text style={s.insightTitle}>Pricing Analysis</Text>
					<Text style={s.insightText}>
						{listing.price && listing.sqft
							? `At $${Math.round(listing.price / listing.sqft)}/sqft, this property's pricing can be compared against local comps. `
							: ""}
						{listing.zestimate
							? `The Zillow Zestimate for this property is ${formatPrice(listing.zestimate)}, ${listing.zestimate > listing.price ? "above" : "below"} the current list price by ${formatPrice(Math.abs(listing.zestimate - listing.price))}.`
							: "Contact us for a detailed comparable market analysis."}
					</Text>
				</View>

				<View style={s.insightCard}>
					<Text style={s.insightTitle}>Market Timing</Text>
					<Text style={s.insightText}>
						{listing.daysOnZillow !== null && listing.daysOnZillow >= 0
							? `This property has been on the market for ${listing.daysOnZillow} days. `
							: ""}
						Properties with AI-powered marketing and instant lead response sell faster. Brokerages using AI infrastructure respond to leads in under 30 seconds — 21x more likely to qualify a buyer.
					</Text>
				</View>

				<View style={s.insightCard}>
					<Text style={s.insightTitle}>Lead Response Advantage</Text>
					<Text style={s.insightText}>
						Industry data shows that responding to a lead within 5 minutes increases qualification rates by 21x compared to 30-minute response times. AI-powered systems can respond instantly with personalized property information, scheduling, and follow-up.
					</Text>
				</View>

				{/* CTA */}
				<View style={s.ctaBox}>
					<Text style={s.ctaHeading}>
						Want AI Infrastructure for Your Brokerage?
					</Text>
					<Text style={s.ctaSub}>
						Nairon builds custom AI systems that automate lead gen, qualification, follow-up, and more.
					</Text>
					<View style={s.ctaButton}>
						<Text style={s.ctaButtonText}>BOOK A DISCOVERY CALL</Text>
					</View>
					<Text style={{ ...s.ctaSub, marginTop: 8, marginBottom: 0 }}>
						nairon.ai/for/real-estate
					</Text>
				</View>

				<View style={s.footer}>
					<Text style={s.footerTextDark}>
						{new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Text>
					<Text style={s.footerBrandDark}>NAIRON</Text>
				</View>
			</Page>
		</Document>
	);
}
