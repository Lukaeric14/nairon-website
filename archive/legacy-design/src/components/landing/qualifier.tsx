import { GridSection, GridCell } from "./grid-system";

const QUALIFIER_COPY = "For owners with one painful workflow they want solved in 30 days.";

export function Qualifier() {
	return (
		<GridSection columns="1fr" border>
			<GridCell className="px-6 md:px-12 py-8 md:py-10">
				<div className="flex flex-col items-center text-center gap-3">
					<div className="flex items-center gap-2">
						<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-[11px] font-medium uppercase tracking-[0.18em]">
							Who this is for
						</span>
						<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
					</div>
					<p className="max-w-[28rem] text-lg font-normal leading-snug tracking-[-0.3px] text-[#1A1916] md:max-w-none md:whitespace-nowrap md:text-2xl">
						{QUALIFIER_COPY}
					</p>
				</div>
			</GridCell>
		</GridSection>
	);
}
