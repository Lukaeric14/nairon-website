import { ArrowUpRight } from "lucide-react";
import { useModals } from "./modal-provider";

const NOTCH_SIZE = 10;
const NOTCH_COLOR = "rgba(255, 255, 255, 0.12)";

const corners = [
	{ top: 0, left: 0, borderTop: true, borderLeft: true },
	{ top: 0, right: 0, borderTop: true, borderRight: true },
	{ bottom: 0, left: 0, borderBottom: true, borderLeft: true },
	{ bottom: 0, right: 0, borderBottom: true, borderRight: true },
] as const;

function CornerNotches() {
	return (
		<>
			{corners.map((corner, i) => (
				<div
					key={i}
					className="absolute pointer-events-none z-2"
					style={{
						width: NOTCH_SIZE,
						height: NOTCH_SIZE,
						top: "top" in corner ? corner.top : undefined,
						bottom: "bottom" in corner ? corner.bottom : undefined,
						left: "left" in corner ? corner.left : undefined,
						right: "right" in corner ? corner.right : undefined,
						borderTop: "borderTop" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderBottom: "borderBottom" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderLeft: "borderLeft" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderRight: "borderRight" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
					}}
				/>
			))}
		</>
	);
}

export function HeroNew() {
	const { openHireModal, openCandidateModal } = useModals();
	return (
		<div className="relative flex flex-col justify-center items-center text-center px-5 md:px-12 py-16 md:py-24">
			<CornerNotches />

			{/* Social proof badge */}
			<div className="flex items-center gap-3 mb-8">
				<div className="flex -space-x-2">
					{["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg", "/avatars/avatar-3.jpg"].map((src, i) => (
						<img
							key={i}
							src={src}
							alt=""
							width={32}
							height={32}
							className="w-8 h-8 rounded-full border-2 border-[#0C0C0C] object-cover"
						/>
					))}
				</div>
				<span className="text-[#A39E96] text-sm">
					Trusted by hundreds of engineers
				</span>
			</div>

			{/* Headline */}
			<h1 className="text-[36px] leading-[40px] md:text-[80px] md:leading-[80px] font-normal tracking-[-1.5px] md:tracking-[-2.4px] text-[#E8E4DE] max-w-4xl">
				Find AI-native engineers{" "}
				<span className="font-serif italic text-[#C9A96E]">
					who ship
				</span>
			</h1>

			{/* Subtitle */}
			<p className="mt-6 text-lg md:text-xl text-[#A39E96] max-w-2xl leading-relaxed">
				Nairon is a data-driven technical recruiting startup. We use proprietary
				benchmarks to match companies with AI-native engineers who build.
			</p>

			{/* CTAs */}
			<div className="flex flex-wrap justify-center gap-4 mt-10">
				<button
					type="button"
					onClick={openHireModal}
					className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
				>
					Hire engineers
					<ArrowUpRight className="w-4 h-4" />
				</button>
				<button
					type="button"
					onClick={openCandidateModal}
					className="inline-flex items-center gap-2 border border-white/10 text-[#E8E4DE] font-medium text-base px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
				>
					I'm a candidate
					<ArrowUpRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
