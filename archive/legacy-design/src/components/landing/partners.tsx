import {
	Section,
	SectionTag,
	SectionHeading,
	GlassCard,
	BodyText,
	colors,
} from "./primitives";
import { PARTNERS, PARTNER_CONTENT } from "@/data/landing";
import { useViewMode } from "@/contexts/view-mode-context";

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
	return (
		<div className="glass-card rounded-3xl p-8 flex items-center justify-center h-[104px]">
			<img
				src={logo}
				alt={name}
				width={240}
				height={48}
				className="h-12 w-auto opacity-80"
				loading="lazy"
			/>
		</div>
	);
}

export function Partners() {
	const { isEngineer } = useViewMode();
	const content = isEngineer ? PARTNER_CONTENT.engineer : PARTNER_CONTENT.hiringManager;

	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Partners" />
			<SectionHeading className="mb-16">{content.title}</SectionHeading>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{PARTNERS.map((p) => (
					<PartnerLogo key={p.name} name={p.name} logo={p.logo} />
				))}
			</div>

			{/* Quote card */}
			<GlassCard className="mt-10 p-6 md:p-8 max-w-3xl mx-auto text-center">
				<BodyText className="text-lg italic">"{content.quote}"</BodyText>
			</GlassCard>
		</Section>
	);
}
