import { useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/view-mode-context";
import type { NavConfig, NavLinkDropdown } from "@/data/landing";
import { isDropdownItem } from "@/data/landing";
import { ArrowRightIcon } from "./arrow-right-icon";

interface MobileMenuProps {
	nav: NavConfig;
}

function MobileAccordion({ item }: { item: NavLinkDropdown }) {
	const [expanded, setExpanded] = useState(false);

	const allLinks = item.columns.flatMap((col) => col.items);

	return (
		<div>
			<button
				type="button"
				onClick={() => setExpanded((e) => !e)}
				className="flex items-center justify-between w-full py-3 text-base font-medium text-[#1A1916]"
			>
				{item.label}
				<ChevronDown
					className={cn(
						"w-5 h-5 text-[#1A1916]/50 transition-transform duration-200",
						expanded && "rotate-180",
					)}
				/>
			</button>

			<div
				className={cn(
					"overflow-hidden transition-[max-height] duration-300 ease-in-out",
					expanded ? "max-h-96" : "max-h-0",
				)}
			>
				<div className="pb-2 pl-4 space-y-1">
					{allLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="block py-2 text-sm text-[#1A1916]/70 hover:text-[#1A1916] transition-colors"
						>
							{link.label}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}

export function MobileMenu({ nav }: MobileMenuProps) {
	const [open, setOpen] = useState(false);
	const { viewMode } = useViewMode();
	const lenis = useLenis();

	// Close on viewMode change
	useEffect(() => {
		setOpen(false);
	}, [viewMode]);

	// Close on Escape
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open]);

	// Scroll lock via Lenis
	useEffect(() => {
		if (!lenis) return;
		if (open) {
			lenis.stop();
		} else {
			lenis.start();
		}
		return () => {
			lenis.start();
		};
	}, [open, lenis]);

	const toggle = useCallback(() => setOpen((o) => !o), []);

	const isGreen = nav.cta.color === "green";

	return (
		<div className="md:hidden">
			{/* Hamburger button */}
			<button
				type="button"
				onClick={toggle}
				className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-[#0C0C0C]/12 text-[#1A1916]"
				aria-label={open ? "Close menu" : "Open menu"}
			>
				{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
			</button>

			{/* Dropdown panel */}
			<div
				className={cn(
					"fixed left-0 right-0 top-[72px] z-40 transition-all duration-300",
					open
						? "opacity-100 max-h-[calc(100dvh-72px)] pointer-events-auto"
						: "opacity-0 max-h-0 pointer-events-none",
				)}
			>
				<div className="bg-black/95 backdrop-blur-xl border-t border-[#0C0C0C]/5 overflow-y-auto max-h-[calc(100dvh-72px)]">
					<div className="px-6 py-4">
						{/* Nav items */}
						<div className="space-y-1">
							{nav.items.map((item) =>
								isDropdownItem(item) ? (
									<MobileAccordion key={item.label} item={item} />
								) : (
									<a
										key={item.href}
										href={item.href}
										className="block py-3 text-base font-medium text-[#1A1916] hover:text-[#1A1916]/80 transition-colors"
									>
										{item.label}
									</a>
								),
							)}
						</div>

						{/* Separator + CTA */}
						<div className="mt-4 pt-4 border-t border-[#0C0C0C]/10">
							<a
								href={nav.cta.href}
								{...(nav.cta.external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className={cn(
									"inline-flex items-center gap-2.5 font-semibold text-base pl-4 pr-1.5 py-1.5 rounded-full transition-colors w-full justify-center",
									isGreen
										? "bg-brand text-[#1A1916] hover:bg-brand-hover"
										: "bg-brand-gold text-[#1A1916] hover:bg-brand-gold-light",
								)}
							>
								{nav.cta.label}
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
