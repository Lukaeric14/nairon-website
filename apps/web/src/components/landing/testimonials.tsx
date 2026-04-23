import { GridSection, GridCell, CornerNotches } from "./grid-system";

const testimonials = [
	{
		quote:
			"Nairon helped us turn a messy acquisition workflow into an AI employee with real guardrails. It started saving the team time within the first month.",
		name: "Sarah Al-Rashid",
		role: "CEO, TechVentures Dubai",
		avatar: "/avatars/avatar-4.jpg",
	},
	{
		quote:
			"They did not just bolt AI onto our stack. They defined the role, the KPI, the approval flow, and the operating loop. That was the difference.",
		name: "Marcus Chen",
		role: "COO, Northstar Ops",
		avatar: "/avatars/avatar-5.jpg",
	},
	{
		quote:
			"The real estate page got our attention, but the underlying model was broader than that. It was clear they were building AI employees, not selling hype.",
		name: "Omar Khalid",
		role: "Founder, BuildStack",
		avatar: "/avatars/avatar-6.jpg",
	},
];

export function Testimonials() {
	return (
		<div>
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10">
					<div className="flex items-center gap-3 mb-4 md:mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							Testimonials
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl">
						What they say
					</h2>
				</GridCell>
			</GridSection>

			{/* 3 testimonial cells — stacked on mobile, 3 columns on desktop */}
			<GridSection columns="1fr 1fr 1fr" border>
				{testimonials.map((t, i) => (
					<GridCell
						key={t.name}
						borderRight={i < 2}
						className="p-6 md:p-12 flex flex-col justify-between"
					>
						<CornerNotches size={10} />
						<p className="text-[#1A1916] text-sm md:text-base leading-relaxed mb-6 md:mb-8">
							"{t.quote}"
						</p>
						<div className="flex items-center gap-3">
							<img
								src={t.avatar}
								alt={t.name}
								className="w-9 md:w-10 h-9 md:h-10 rounded-full object-cover"
							/>
							<div>
								<p className="text-[#1A1916] text-sm font-medium">
									{t.name}
								</p>
								<p className="text-[#5C584F] text-xs md:text-sm">{t.role}</p>
							</div>
						</div>
					</GridCell>
				))}
			</GridSection>
		</div>
	);
}
