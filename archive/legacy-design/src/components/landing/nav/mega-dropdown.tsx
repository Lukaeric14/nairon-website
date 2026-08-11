import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Building2, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLinkDropdown } from "@/data/landing";
import { ArrowRightIcon } from "./arrow-right-icon";

const ICON_MAP: Record<string, typeof Building2> = {
	building: Building2,
	laptop: Laptop,
};

interface MegaDropdownProps {
	item: NavLinkDropdown;
	variant?: "green" | "gold";
	onOpenChange?: (open: boolean) => void;
}

export function MegaDropdown({ item, variant = "green", onOpenChange }: MegaDropdownProps) {
	const [open, setOpen] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const setOpenState = useCallback(
		(next: boolean) => {
			setOpen(next);
			onOpenChange?.(next);
		},
		[onOpenChange],
	);

	const clearCloseTimer = useCallback(() => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
	}, []);

	const handleMouseEnter = useCallback(() => {
		clearCloseTimer();
		setOpenState(true);
	}, [clearCloseTimer, setOpenState]);

	const handleMouseLeave = useCallback(() => {
		clearCloseTimer();
		closeTimer.current = setTimeout(() => setOpenState(false), 300);
	}, [clearCloseTimer, setOpenState]);

	// Keyboard support
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpenState(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open, setOpenState]);

	// Split columns: first column is "Programs" (large cards), rest are simple
	const programsCol = item.columns[0];
	const restCols = item.columns.slice(1);

	return (
		<div
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Trigger — same pill as NavLink but with chevron */}
			<button
				type="button"
				onClick={() => setOpenState(!open)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setOpenState(!open);
					}
				}}
				className="group relative flex items-center justify-center h-10 px-4 rounded-full bg-[#0C0C0C]/12 overflow-hidden transition-colors"
			>
				<span className="text-base text-[#1A1916] transition-transform duration-300 group-hover:-translate-y-10">
					{item.label}
					<ChevronDown
						className={cn(
							"inline-block w-4 h-4 ml-1 -mt-0.5 transition-transform duration-200",
							open && "rotate-180",
						)}
					/>
				</span>

				<span className={cn("absolute inset-x-[-1px] top-full h-[45px] rounded-full transition-all duration-300 group-hover:top-[-3px]", variant === "gold" ? "bg-brand-gold" : "bg-brand")} />

				<span className="absolute text-base text-[#1A1916] top-12 transition-all duration-300 group-hover:top-2">
					{item.label}
					<ChevronDown
						className={cn(
							"inline-block w-4 h-4 ml-1 -mt-0.5 transition-transform duration-200",
							open && "rotate-180",
						)}
					/>
				</span>
			</button>

			{/* Full-width panel — anchored below navbar */}
			<div
				className={cn(
					"fixed left-0 right-0 top-[72px] z-[100] transition-all duration-200",
					open
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="bg-[#0a0a0c]">
					<div className="border-t border-[#0C0C0C]/8">
						<div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
							<div className="grid grid-cols-[1.1fr_0.7fr_0.9fr] gap-8">
								{/* Programs column — large cards with icons */}
								{programsCol && (
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-[#1A1916]/40 mb-5">
											{programsCol.heading}
										</p>
										<div className="space-y-1">
											{programsCol.items.map((link) => {
												const Icon = link.icon
													? ICON_MAP[link.icon]
													: null;
												return (
													<a
														key={link.href}
														href={link.href}
														className="flex items-start gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-[#0C0C0C]/5"
													>
														{Icon && (
															<span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0C0C0C]/8">
																<Icon className="w-5 h-5 text-[#1A1916]/70" />
															</span>
														)}
														<div>
															<span className="text-lg font-semibold text-[#1A1916]">
																{link.label}
															</span>
															{link.description && (
																<span className="block text-sm text-[#1A1916]/50 mt-0.5">
																	{link.description}
																</span>
															)}
														</div>
													</a>
												);
											})}
										</div>
									</div>
								)}

								{/* Resource columns — simple links */}
								{restCols.map((col) => (
									<div key={col.heading}>
										<p className="text-xs font-semibold uppercase tracking-wider text-[#1A1916]/40 mb-5">
											{col.heading}
										</p>
										<ul className="space-y-0.5">
											{col.items.map((link) => (
												<li key={link.href}>
													<a
														href={link.href}
														className="block rounded-lg px-4 py-2 text-[15px] font-medium text-[#1A1916] transition-colors hover:bg-[#0C0C0C]/5"
													>
														{link.label}
													</a>
												</li>
											))}
										</ul>
									</div>
								))}

								{/* CTA card */}
								{item.cta && (
									<div className="flex flex-col justify-between rounded-xl bg-brand/10 border border-brand/20 p-5">
										<div>
											<p className="text-base font-semibold text-[#1A1916] mb-1.5">
												{item.cta.headline}
											</p>
											<p className="text-sm text-[#1A1916]/60">
												{item.cta.description}
											</p>
										</div>
										<a
											href={item.cta.href}
											className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
										>
											{item.cta.buttonLabel}
											<span className="w-4 h-4 block text-brand">
												<ArrowRightIcon />
											</span>
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
