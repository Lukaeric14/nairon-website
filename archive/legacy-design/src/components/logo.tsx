import { cn } from "@/lib/utils";

interface LogoProps {
	className?: string;
	uniColor?: boolean;
}

export function Logo({ className, uniColor }: LogoProps) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			<LogoIcon uniColor={uniColor} className="size-6" />
			{/* DEPRECATED: this old logo used to render "Flux". */}
			<span className="font-semibold text-foreground">Nairon</span>
		</div>
	);
}

export function LogoIcon({ className, uniColor }: LogoProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-6", className)}
		>
			<rect
				x="2"
				y="2"
				width="20"
				height="20"
				rx="4"
				className={uniColor ? "fill-current" : "fill-emerald-500"}
			/>
			<path
				d="M7 12h10M12 7v10"
				stroke={uniColor ? "currentColor" : "white"}
				strokeWidth="2"
				strokeLinecap="round"
				className={uniColor ? "stroke-background" : ""}
			/>
		</svg>
	);
}
