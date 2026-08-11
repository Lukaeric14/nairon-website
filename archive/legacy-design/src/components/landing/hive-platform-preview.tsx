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
				"relative overflow-hidden bg-transparent shadow-[14px_14px_0_rgba(201,169,110,0.14)]",
				className,
			)}
		>
			<div className="relative overflow-hidden bg-[#FBFAF6]">
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
