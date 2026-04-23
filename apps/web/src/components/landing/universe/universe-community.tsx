import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell, CornerNotches } from "../grid-system";

const COMMUNITY_STATS = [
	{ value: "2,400+", label: "Engineers in the community" },
	{ value: "150+", label: "Active daily discussions" },
	{ value: "40+", label: "Countries represented" },
];

const RECENT_TOPICS = [
	"Best practices for Claude Code in monorepos",
	"Cursor vs Windsurf — real benchmark comparison",
	"How we shipped a full-stack app in 48 hours with AI",
	"Token efficiency tips that actually work",
	"The future of code review in an agentic world",
];

function AnimatedCounter({
	value,
	isVisible,
}: { value: string; isVisible: boolean }) {
	const [display, setDisplay] = useState("0");
	const hasRun = useRef(false);

	useEffect(() => {
		if (!isVisible || hasRun.current) return;
		hasRun.current = true;

		const match = value.match(/^([^\d]*?)([\d,.]+)(.*)$/);
		if (!match) {
			setDisplay(value);
			return;
		}

		const prefix = match[1];
		const numStr = match[2].replace(/,/g, "");
		const suffix = match[3];
		const target = Number.parseFloat(numStr);
		const duration = 1200;
		const start = performance.now();

		const animate = (now: number) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - (1 - progress) ** 3;
			const current = Math.round(eased * target);
			const formatted = current.toLocaleString();
			setDisplay(`${prefix}${formatted}${suffix}`);
			if (progress < 1) requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}, [isVisible, value]);

	return <span>{display}</span>;
}

export function UniverseCommunity() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref}>
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-12 py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							Community
						</span>
					</div>
					<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl mb-3">
						Learn with the{" "}
						<span className="font-serif italic text-[#C9A96E]">
							sharpest engineers
						</span>
					</h2>
					<p className="text-[#5C584F] text-base max-w-xl">
						Join a community of engineers who are actively building
						with AI tools. Share workflows, get feedback, stay ahead.
					</p>
				</GridCell>
			</GridSection>

			{/* Stats + Topics */}
			<GridSection columns="5fr 7fr" border>
				{/* Stats */}
				<GridCell borderRight className="flex flex-col">
					{COMMUNITY_STATS.map((stat, i) => (
						<div
							key={stat.label}
							className="relative px-10 py-8 flex-1 flex flex-col justify-center"
							style={{
								borderBottom:
									i < COMMUNITY_STATS.length - 1
										? "var(--guide-width) solid var(--guide-color)"
										: "none",
							}}
						>
							<CornerNotches
								size={8}
								corners={["top-left", "bottom-left"]}
								color="rgba(12, 12, 12, 0.08)"
							/>
							<div className="text-3xl md:text-4xl font-normal tracking-[-1px] text-[#C9A96E] mb-1 font-urbanist tabular-nums">
								<AnimatedCounter
									value={stat.value}
									isVisible={isVisible}
								/>
							</div>
							<p className="text-[#5C584F] text-sm">
								{stat.label}
							</p>
						</div>
					))}
				</GridCell>

				{/* Recent topics */}
				<GridCell className="p-8 md:p-10">
					<h3 className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em] mb-6">
						Trending Discussions
					</h3>

					<div className="space-y-0">
						{RECENT_TOPICS.map((topic, i) => (
							<div
								key={topic}
								className="flex items-center gap-4 py-3.5 transition-all duration-500 ease-out hover:translate-x-1"
								style={{
									opacity: isVisible ? 1 : 0,
									transform: isVisible
										? "translateX(0)"
										: "translateX(-12px)",
									transitionDelay: `${i * 100 + 200}ms`,
									borderBottom:
										i < RECENT_TOPICS.length - 1
											? "1px solid rgba(12, 12, 12, 0.04)"
											: "none",
								}}
							>
								<span className="text-[#C9A96E]/40 text-xs font-mono tabular-nums">
									{String(i + 1).padStart(2, "0")}
								</span>
								<span className="text-[#1A1916] text-sm leading-snug cursor-pointer hover:text-[#C9A96E] transition-colors">
									{topic}
								</span>
							</div>
						))}
					</div>

					{/* Join CTA */}
					<div className="mt-8 flex gap-3">
						<a
							href="https://discord.gg/nairon"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#5865F2]/20 transition-colors"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
							</svg>
							Join Discord
						</a>
						<a
							href="https://slack.nairon.ai"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-[#0C0C0C]/10 text-[#1A1916] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0C0C0C]/5 transition-colors"
						>
							Join Slack
						</a>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
