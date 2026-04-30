import { cn } from "@/lib/utils";

type HivePlatformPreviewProps = {
	className?: string;
	context?: "waitlist" | "memory";
};

export function HivePlatformPreview({
	className,
	context = "waitlist",
}: HivePlatformPreviewProps) {
	const image =
		context === "memory"
			? {
					src: "/hive-channel.png",
					alt: "Hive sales topic channel with agent mentions and threaded replies",
				}
			: {
					src: "/hive-dashboard.png",
					alt: "Hive dashboard with AI employees, assignments, workflows, and status columns",
				};

	return (
		<div
			className={cn(
				"relative overflow-hidden border border-[#171612]/10 bg-[#171612] p-3 shadow-[14px_14px_0_rgba(201,169,110,0.18)]",
				className,
			)}
		>
			<div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(201,169,110,0.22),transparent_24%),radial-gradient(circle_at_78%_64%,rgba(188,255,0,0.08),transparent_30%)]" />
			<div className="relative overflow-hidden border border-white/10 bg-[#FBFAF6]">
				<img
					src={image.src}
					alt={image.alt}
					className="block aspect-[1.28] h-auto w-full object-cover object-left-top sm:aspect-[1.45]"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	);
}
