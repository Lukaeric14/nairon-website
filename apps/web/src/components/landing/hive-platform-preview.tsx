import { cn } from "@/lib/utils";

type HivePlatformPreviewProps = {
	className?: string;
	context?: "waitlist" | "memory";
};

export function HivePlatformPreview({
	className,
	context = "waitlist",
}: HivePlatformPreviewProps) {
	const rows =
		context === "memory"
			? ["Company memory", "Permission policy", "Decision history"]
			: ["AI employee", "Workflow run", "Company context"];

	return (
		<div
			className={cn(
				"relative overflow-hidden border border-[#171612]/10 bg-[#171612] p-4 shadow-[14px_14px_0_rgba(201,169,110,0.18)]",
				className,
			)}
		>
			<div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(201,169,110,0.22),transparent_24%),radial-gradient(circle_at_78%_64%,rgba(188,255,0,0.08),transparent_30%)]" />
			<div className="relative border border-white/10 bg-[#FBFAF6]">
				<div className="flex h-9 items-center justify-between border-b border-[#171612]/10 px-3">
					<div className="flex items-center gap-1.5">
						<span className="h-2 w-2 rounded-full bg-[#E86F55]" />
						<span className="h-2 w-2 rounded-full bg-[#D8C497]" />
						<span className="h-2 w-2 rounded-full bg-[#B7E457]" />
					</div>
					<span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B806F]">
						Hive
					</span>
				</div>
				<div className="grid min-h-[260px] grid-cols-[0.72fr_1fr] bg-[#FBFAF6] text-[#171612]">
					<div className="border-r border-[#171612]/10 p-4">
						<div className="mb-5 h-7 w-20 bg-[#171612]" />
						<div className="space-y-2">
							{["Memory", "Agents", "Tools"].map((item) => (
								<div
									key={item}
									className="border border-[#171612]/10 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#6D675C]"
								>
									{item}
								</div>
							))}
						</div>
					</div>
					<div className="p-4">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<div className="mb-2 h-2 w-24 bg-[#171612]/18" />
								<div className="h-3 w-40 bg-[#171612]" />
							</div>
							<div className="h-8 w-8 rounded-full border border-[#171612]/10 bg-[#C9A96E]/40" />
						</div>
						<div className="space-y-3">
							{rows.map((row, index) => (
								<div
									key={row}
									className="grid grid-cols-[1fr_auto] items-center gap-3 border border-[#171612]/10 bg-white p-3"
								>
									<div>
										<div className="mb-2 text-xs font-medium text-[#171612]">
											{row}
										</div>
										<div className="h-1.5 w-full bg-[#171612]/10" />
									</div>
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171612] text-[11px] text-white">
										{index + 1}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
