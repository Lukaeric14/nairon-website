import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { FLUX_MODELS } from "@/data/flux";
import { FluxSection } from "@/components/landing/flux/primitives";
import { cn } from "@/lib/utils";

const MODEL_LOGOS: Record<string, string> = {
	"Kimi K2.5": "/icons/models/kimi.ico",
	"Claude Sonnet 4.5": "/icons/models/anthropic.ico",
	"GPT-5": "/icons/models/openai.png",
	"Gemini 2.5 Flash": "/icons/models/gemini.png",
	"DeepSeek V3.2": "/icons/models/deepseek.ico",
	OpenCode: "/icons/models/opencode.png",
};

function ModelBadge({ selected = false }: { selected?: boolean }) {
	return (
		<span
			className={`inline-flex items-center rounded-md px-2 py-0.5 font-inter text-[11px] tracking-[0.02em] ${
				selected
					? "border border-[#0C0C0C]/[0.28] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.18),rgba(12, 12, 12, 0.07))] text-[#1A1916]/78 shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.28)]"
					: "border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.04] text-[#1A1916]/42"
			}`}
		>
			Model
		</span>
	);
}

function ModelAvatar({ name }: { name: string }) {
	const logo = MODEL_LOGOS[name] ?? "/nairon-logo.png";
	return (
		<div className="relative h-6 w-6 shrink-0 rounded-full border border-[#0C0C0C]/16 bg-[linear-gradient(135deg,#1f2126,#101216)] p-[4px] shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.14)]">
			<img src={logo} alt={`${name} logo`} className="h-full w-full rounded-full object-contain" loading="lazy" />
		</div>
	);
}

export function FluxModels() {
	const rowsRef = useRef<HTMLDivElement>(null);
	const hasAnimatedRef = useRef(false);
	const timerIdRef = useRef<number | null>(null);
	const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

	useEffect(() => {
		if (!rowsRef.current) {
			return;
		}

		const runHighlightAnimation = () => {
			if (hasAnimatedRef.current) {
				return;
			}

			hasAnimatedRef.current = true;

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				setHighlightedIndex(1);
				return;
			}

			timerIdRef.current = window.setTimeout(() => setHighlightedIndex(1), 300);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						runHighlightAnimation();
						observer.disconnect();
						break;
					}
				}
			},
			{ threshold: 0.45, rootMargin: "0px 0px -10% 0px" },
		);

		observer.observe(rowsRef.current);

		return () => {
			observer.disconnect();
			if (timerIdRef.current !== null) {
				window.clearTimeout(timerIdRef.current);
			}
		};
	}, []);

	return (
		<FluxSection className="overflow-hidden pb-24 pt-20 md:pb-32 md:pt-24">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_12%,rgba(12, 12, 12, 0.035),transparent_36%),radial-gradient(circle_at_76%_18%,rgba(115,146,255,0.04),transparent_34%),linear-gradient(180deg,rgba(4,5,7,0),rgb(5,5,6)_72%)]" />

			<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
				<div className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.02] px-3 py-1 font-inter text-[12px] text-[#1A1916]/72">
					<span className="h-2 w-2 rounded-full bg-[#2bdbff]" />
					{FLUX_MODELS.badge}
				</div>
				<h2 className="mt-5 max-w-[16ch] font-inter text-[42px] font-[530] leading-[1.02] tracking-[-0.03em] text-[#1A1916] sm:max-w-none sm:text-[58px] md:text-[72px]">
					Insights across all AI tools
				</h2>
				<p className="mt-4 max-w-3xl font-inter text-[18px] leading-[1.45] tracking-[-0.01em] text-[#1A1916]/52 md:text-[19px]">
					{FLUX_MODELS.description}
				</p>
				<button
					type="button"
					className="mt-8 inline-flex items-center gap-2 rounded-[13px] border border-[#0C0C0C]/14 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.12),rgba(12, 12, 12, 0.06))] px-5 py-2.5 font-inter text-[18px] font-[520] tracking-[-0.02em] text-[#1A1916] shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.22),0_10px_28px_rgba(0,0,0,0.42)]"
				>
					{FLUX_MODELS.cta}
					<ChevronRight className="size-4 text-[#1A1916]/80" />
				</button>
			</div>

			<div className="relative mx-auto mt-12 w-full max-w-[1180px] px-1 pb-18 md:mt-14 md:px-4">
				<div className="pointer-events-none absolute inset-x-[17%] top-2 h-20 bg-[radial-gradient(ellipse_at_center,rgba(12, 12, 12, 0.06),transparent_72%)] blur-2xl" />
				<div className="pointer-events-none absolute inset-x-[12%] bottom-[-3%] h-22 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.66),transparent_78%)] blur-xl" />
				<div className="relative mx-auto h-[350px] w-full max-w-[860px] overflow-hidden rounded-[16px] border border-[#0C0C0C]/[0.11] bg-[linear-gradient(180deg,rgba(21,22,25,0.88)_0%,rgba(8,8,10,0.96)_40%,rgba(3,3,4,1)_100%)] shadow-[0_42px_124px_rgba(0,0,0,0.86)] [transform:perspective(2200px)_rotateX(34deg)_scale(1.06)] [transform-origin:center_top] md:h-[410px] md:[transform:perspective(2500px)_rotateX(34deg)_scale(1.1)]">
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.035)_0%,transparent_16%,transparent_78%,rgba(0,0,0,0.92)_100%)]" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12, 12, 12, 0.06),transparent_52%)]" />
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12, 12, 12, 0.05)_0%,transparent_24%)]" />
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.18),rgba(0,0,0,0),rgba(0,0,0,0.2))]" />
					<div className="pointer-events-none absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,rgba(12, 12, 12, 0.03)_0px,rgba(12, 12, 12, 0.03)_1px,transparent_1px,transparent_74px)]" />
					<div className="pointer-events-none absolute -bottom-px left-0 right-0 h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.72)_66%,rgba(0,0,0,0.94))]" />

					<div className="relative px-5 pt-5 md:px-8 md:pt-6">
						<div className="rounded-[12px] border border-[#0C0C0C]/[0.1] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.045),rgba(12, 12, 12, 0.015))] px-5 py-2.5 font-inter text-[20px] italic tracking-[-0.01em] text-[#1A1916]/48 shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.12)] md:text-[17px]">
							{FLUX_MODELS.placeholder}
						</div>

						<div className="mt-3 overflow-visible rounded-[14px] border border-[#0C0C0C]/[0.08] bg-[linear-gradient(180deg,rgba(13,14,16,0.7),rgba(7,7,8,0.74))] shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.05)]">
							<div ref={rowsRef} className="relative px-3 py-2">
								{FLUX_MODELS.rows.map((model, index) => {
									const isSelected = highlightedIndex === index;
									return (
										<div
											key={model.name}
											className={cn(
												"relative flex items-center gap-3 rounded-[10px] px-4 py-3 transition-[transform,box-shadow,border-color,background,color] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
												isSelected
													? "z-20 -mx-4 -translate-y-[6px] my-2 border border-[#0C0C0C]/[0.38] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.34)_0%,rgba(12, 12, 12, 0.12)_44%,rgba(12, 12, 12, 0.22)_100%)] [transform:translateY(-6px)_scale(1.012)] shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.42),inset_0_-1px_0_rgba(12, 12, 12, 0.12),0_0_0_1px_rgba(12, 12, 12, 0.12),0_18px_46px_rgba(0,0,0,0.62),0_6px_14px_rgba(0,0,0,0.45)]"
													: "border border-[#0C0C0C]/[0.05] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.03),rgba(12, 12, 12, 0.01))] text-[#1A1916]/56",
											)}
										>
											<div className={isSelected ? "rounded-full ring-2 ring-white/26 shadow-[0_0_18px_rgba(12, 12, 12, 0.24)]" : ""}>
												<ModelAvatar name={model.name} />
											</div>
											<p className={`font-inter text-[15px] font-[500] tracking-[-0.01em] ${isSelected ? "text-[#1A1916]" : "text-[#1A1916]/68"}`}>
												{model.name}
											</p>
											<ModelBadge selected={isSelected} />
											{isSelected ? (
												<div className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0C0C0C]/18 ring-1 ring-white/30 shadow-[0_0_0_1px_rgba(12, 12, 12, 0.06)]">
													<Check className="size-3.5 text-[#1A1916]/86" />
												</div>
											) : null}
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(180deg,transparent,rgba(3,3,4,0.6)_68%,rgba(3,3,4,0.9)_100%)]" />
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.78),rgba(0,0,0,0))]" />
				</div>
			</div>
		</FluxSection>
	);
}
