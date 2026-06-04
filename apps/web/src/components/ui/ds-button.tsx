import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Design-system button — ported from Hive's atom and adapted to shadcn
 * conventions (cva + asChild). Hierarchy comes from fill + a single 3D
 * primary; the rest are quiet. `brand` uses the active palette's blue so the
 * /brandkit page can A/B the trio on a real CTA.
 */
const dsButtonVariants = cva(
	"inline-flex items-center justify-center gap-1.5 font-geist font-medium whitespace-nowrap transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-mid)] focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
	{
		variants: {
			variant: {
				// cal.com-style 3D dark button: gradient + 1px border + inset rim.
				primary:
					"rounded-xl border border-[rgb(20,20,20)] text-white " +
					"bg-[linear-gradient(180deg,rgb(41,41,41)_0%,rgb(20,20,20)_100%)] " +
					"shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)] " +
					"hover:bg-[linear-gradient(180deg,rgb(50,50,50)_0%,rgb(28,28,28)_100%)]",
				// brand: the active palette blue, same 3D treatment.
				brand:
					"rounded-xl border border-[var(--brand-deep)] text-white " +
					"bg-[var(--brand-blue)] " +
					"shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] " +
					"hover:brightness-110",
				secondary:
					"rounded-xl bg-ds-surface-hover text-ds-text-primary border border-ds-border hover:bg-ds-border",
				outline:
					"rounded-xl bg-transparent text-ds-text-primary border border-ds-border hover:bg-ds-surface-hover",
				ghost:
					"rounded-xl bg-transparent text-ds-text-secondary hover:bg-ds-surface-hover hover:text-ds-text-primary",
				link: "text-[var(--brand-mid)] underline-offset-4 hover:underline",
				danger:
					"rounded-xl text-white bg-ds-error border border-ds-error hover:brightness-95",
				success:
					"rounded-xl text-white bg-ds-success border border-ds-success hover:brightness-95",
			},
			size: {
				sm: "h-8 px-3 text-[0.75rem] rounded-lg",
				md: "h-9 px-3.5 text-[0.8125rem]",
				lg: "h-11 px-5 text-[0.875rem]",
				icon: "h-9 w-9 rounded-lg",
				"icon-sm": "h-8 w-8 rounded-lg",
			},
		},
		defaultVariants: { variant: "secondary", size: "md" },
	},
);

export interface DsButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof dsButtonVariants> {
	asChild?: boolean;
}

const DsButton = React.forwardRef<HTMLButtonElement, DsButtonProps>(
	({ className, variant, size, asChild = false, type, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				ref={ref}
				type={asChild ? undefined : (type ?? "button")}
				className={cn(dsButtonVariants({ variant, size }), className)}
				{...props}
			/>
		);
	},
);
DsButton.displayName = "DsButton";

export { DsButton, dsButtonVariants };
