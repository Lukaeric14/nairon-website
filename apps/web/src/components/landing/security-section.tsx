import ExpandableFeatures from "@/components/expandable-features-9";
import { GridCell, GridSection } from "./grid-system";

export function SecuritySection() {
	return (
		<div id="security" className="scroll-mt-24 md:scroll-mt-28">
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-8 md:py-10">
					<div className="flex flex-col items-center text-center gap-3">
						<div className="flex items-center gap-2">
							<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
							<span className="text-[#5C584F] text-[11px] font-medium uppercase tracking-[0.18em]">
								How this works
							</span>
							<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
						</div>
						<p className="text-lg md:text-2xl font-normal tracking-[-0.3px] text-[#1A1916] leading-snug whitespace-nowrap">
							AI Employees That Work Even When You Don't.
						</p>
					</div>
				</GridCell>
			</GridSection>
			<ExpandableFeatures />
		</div>
	);
}
