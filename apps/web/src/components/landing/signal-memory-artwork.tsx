import { cn } from "@/lib/utils";

type SignalMemoryArtworkProps = {
	className?: string;
	tone?: "pink" | "blue" | "green";
	compact?: boolean;
};

export function SignalMemoryArtwork({
	className,
	tone = "pink",
	compact = false,
}: SignalMemoryArtworkProps) {
	const accents = {
		pink: {
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		blue: {
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		green: {
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
	}[tone];

	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative overflow-hidden rounded-[8px] border border-[#171612]/10 bg-[#FFF8FB]",
				className,
			)}
		>
			<div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(217,54,127,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,54,127,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div
				className={cn(
					"absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
					compact ? "w-[58%]" : "w-[68%]",
					accents.glow,
				)}
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<svg
					viewBox="0 0 520 520"
					role="img"
					className={cn(
						"drop-shadow-[0_24px_44px_rgba(217,54,127,0.18)]",
						compact ? "w-[68%] max-w-[360px]" : "w-[78%] max-w-[430px]",
					)}
				>
					<defs>
						<linearGradient
							id="signal-brain-fill"
							x1="120"
							y1="70"
							x2="420"
							y2="430"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#FFE0EC" />
							<stop offset="0.55" stopColor="#F8A8C8" />
							<stop offset="1" stopColor="#EE6EA8" />
						</linearGradient>
						<linearGradient
							id="signal-brain-stroke"
							x1="95"
							y1="80"
							x2="430"
							y2="445"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#F47BAF" />
							<stop offset="1" stopColor="#C51F69" />
						</linearGradient>
					</defs>
					<path
						d="M170 384c-38-8-66-41-66-82 0-26 12-50 31-66-7-14-9-29-6-45 6-32 32-56 64-60 17-38 55-62 98-58 42 4 77 31 91 69 35 9 61 40 63 78 26 17 42 46 40 78-3 43-38 78-81 81-16 32-49 53-86 52-24-1-46-10-63-25-22 17-53 25-85 18Z"
						fill="url(#signal-brain-fill)"
						stroke="url(#signal-brain-stroke)"
						strokeWidth="8"
						strokeLinejoin="round"
					/>
					<g
						fill="none"
						stroke="#A90F55"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="10"
						opacity="0.78"
					>
						<path d="M253 106c-27 20-34 46-22 79 10 28-1 50-26 65" />
						<path d="M333 116c-29 10-47 31-49 62-2 30 13 51 44 64" />
						<path d="M165 191c28-10 57 3 70 32" />
						<path d="M367 181c26 6 43 24 50 54" />
						<path d="M153 289c25-24 57-27 92-9" />
						<path d="M280 279c37-15 72-5 103 27" />
						<path d="M215 348c25-5 48 3 68 24" />
						<path d="M312 353c24 2 44-7 60-27" />
					</g>
					<g fill="#FFFFFF" opacity="0.62">
						<circle cx="181" cy="160" r="9" />
						<circle cx="382" cy="219" r="7" />
						<circle cx="244" cy="306" r="6" />
					</g>
				</svg>
			</div>
			<div className={cn("absolute bottom-6 left-6 h-2 w-2", accents.dot)} />
			<div
				className={cn(
					"absolute right-8 top-8 h-2 w-2",
					accents.dot,
					"opacity-50",
				)}
			/>
		</div>
	);
}
