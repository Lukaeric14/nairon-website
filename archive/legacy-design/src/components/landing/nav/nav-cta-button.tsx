import { cn } from "@/lib/utils";
import type { NavConfig } from "@/data/landing";
import { ArrowRightIcon } from "./arrow-right-icon";

interface NavCtaButtonProps {
	cta: NavConfig["cta"];
}

export function NavCtaButton({ cta }: NavCtaButtonProps) {
	const isGreen = cta.color === "green";

	return (
		<a
			href={cta.href}
			{...(cta.external
				? { target: "_blank", rel: "noopener noreferrer" }
				: {})}
			className={cn(
				"inline-flex items-center gap-2.5 font-semibold text-base pl-4 pr-1.5 py-1.5 rounded-full transition-colors",
				isGreen
					? "bg-brand text-[#1A1916] hover:bg-brand-hover"
					: "bg-brand-gold text-[#1A1916] hover:bg-brand-gold-light",
			)}
		>
			{cta.label}
			<span className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center">
				<span
					className={cn(
						"w-4 h-4 block",
						isGreen ? "text-brand" : "text-brand-gold",
					)}
				>
					<ArrowRightIcon />
				</span>
			</span>
		</a>
	);
}
