import { Navbar, Footer, CTA } from "@/components/landing";
import { ProgramHero } from "./hero";
import { BentoGrid } from "./bento-grid";
import { SocialProof } from "./social-proof";
import { Curriculum } from "./curriculum";
import { Requirements } from "./requirements";
import { ApplicationTimeline } from "./application-timeline";
import { Outcomes } from "./outcomes";
import { ProgramPhilosophy } from "./philosophy";
import { ProgramFAQ } from "./faq";
import { ProgramCTA } from "./program-cta";
import type { ProgramData } from "@/data/programs";

export function ProgramPage({ data }: { data: ProgramData }) {
	return (
		<div className="bg-[#0C0C0C] text-[#E8E4DE] min-h-screen font-inter">
			<Navbar />
			<ProgramHero data={data.hero} />
			<BentoGrid cards={data.bentoCards} />
			<SocialProof data={data.testimonials} />
			<Curriculum data={data.curriculum} />
			<Requirements data={data.requirements} />
			<ApplicationTimeline data={data.applicationSteps} />
			<Outcomes data={data.outcomes} />
			<ProgramPhilosophy data={data.philosophy} />
			<ProgramFAQ items={data.faq} />
			<ProgramCTA data={data.cta} />
			<CTA />
			<Footer />
		</div>
	);
}
