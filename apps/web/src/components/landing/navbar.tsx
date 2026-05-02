import type { MouseEvent } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { ArrowUpRight, Menu, X } from "lucide-react";

// Universe dropdown constants - commented out until Universe is ready
// const UNIVERSE_EXPLORE = [...];
// const UNIVERSE_TOOLS = [...];
// function UniverseDropdown() { ... }

export function Navbar({ minimal = false }: { minimal?: boolean }) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();
	// DEPRECATED: Flux-specific navbar treatment is disabled with the Flux page.
	// const isFluxPage = location.pathname === "/flux";

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handler);
		return () => window.removeEventListener("scroll", handler);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname]);

	const handleSectionClick =
		(sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
			if (location.pathname !== "/") return;

			event.preventDefault();
			setMobileOpen(false);

			document.getElementById(sectionId)?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});

			window.history.replaceState(null, "", `/#${sectionId}`);
		};

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? "backdrop-blur-xl bg-white/80 border-b border-[#0C0C0C]/6"
					: "bg-transparent",
			)}
		>
			<div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
				{/* Logo */}
				<a href="/" className="flex items-center shrink-0">
					{/* DEPRECATED: Flux logo lockup removed while Flux is retired. */}
					{/* {isFluxPage ? (
						<div className="flex items-center gap-3">
							<span className="font-mono text-2xl font-bold tracking-tight text-[#1A1916]">
								Flux
							</span>
							<span className="font-inter text-[12px] tracking-[0.02em] text-[#1A1916]/48">
								by
							</span>
							<span className="group/nairon relative inline-flex items-center overflow-hidden rounded-[5px]">
								<img
									src="/nairon-logo.png"
									alt="Nairon"
									width={600}
									height={120}
									className="h-6 w-auto [filter:brightness(0)]"
								/>
								<span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover/nairon:bg-black/20" />
							</span>
						</div>
					) : ( */}
						<img
							src="/nairon-logo.png"
							alt="nairon."
							width={600}
							height={120}
							className="h-7 md:h-9 w-auto [filter:brightness(0)]"
						/>
					{/* )} */}
				</a>

				{/* Desktop nav */}
				{!minimal && (
				<div className="hidden md:flex items-center gap-1">
						<a
							href="/#vsl"
							onClick={handleSectionClick("vsl")}
							className="px-4 py-2 rounded-full text-sm text-[#1A1916] hover:text-[#C9A96E] transition-colors"
						>
							How it works
					</a>

						<a
							href="/#security"
							onClick={handleSectionClick("security")}
							className="px-4 py-2 rounded-full text-sm text-[#1A1916] hover:text-[#C9A96E] transition-colors"
						>
								Infrastructure
					</a>

					<a
						href="/#faq"
						onClick={handleSectionClick("faq")}
						className="px-4 py-2 rounded-full text-sm text-[#1A1916] hover:text-[#C9A96E] transition-colors"
					>
						FAQ
					</a>
					<a
						href={DISCOVERY_CALL_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="ml-2 inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
					>
						Book Discovery
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				</div>
				)}

				<div className={cn("md:hidden flex items-center gap-2", minimal && "hidden")}>
					<button
						type="button"
						className="w-10 h-10 flex items-center justify-center text-[#1A1916]"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>

			{/* Full-width Universe dropdown intentionally disabled while coming soon */}

			{/* Mobile menu */}
			{mobileOpen && !minimal && (
				<div className="md:hidden bg-white border-t border-[#0C0C0C]/6 px-6 py-6 space-y-1">
						<a
							href="/#vsl"
							className="block px-4 py-3 rounded-xl text-base text-[#1A1916] hover:bg-[#0C0C0C]/5 transition-colors"
							onClick={handleSectionClick("vsl")}
						>
							How it works
						</a>

						<a
							href="/#security"
							className="block px-4 py-3 rounded-xl text-base text-[#1A1916] hover:bg-[#0C0C0C]/5 transition-colors"
							onClick={handleSectionClick("security")}
						>
								Infrastructure
						</a>

					<a
						href="/#faq"
						className="block px-4 py-3 rounded-xl text-base text-[#1A1916] hover:bg-[#0C0C0C]/5 transition-colors"
						onClick={handleSectionClick("faq")}
					>
						FAQ
					</a>
					<div className="pt-4">
						<a
							href={DISCOVERY_CALL_URL}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setMobileOpen(false)}
							className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
						>
							Book Discovery
							<ArrowUpRight className="w-4 h-4" />
						</a>
					</div>
				</div>
			)}
		</nav>
	);
}
