import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import { useModals } from "./modal-provider";

// Universe dropdown constants - commented out until Universe is ready
// const UNIVERSE_EXPLORE = [...];
// const UNIVERSE_TOOLS = [...];
// function UniverseDropdown() { ... }

export function Navbar({ minimal = false }: { minimal?: boolean }) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { openHireModal } = useModals();
	const location = useLocation();
	const isFluxPage = location.pathname === "/flux";

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handler);
		return () => window.removeEventListener("scroll", handler);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname]);

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? "backdrop-blur-xl bg-[#0C0C0C]/80 border-b border-white/6"
					: "bg-transparent",
			)}
		>
			<div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
				{/* Logo */}
				<a href="/" className="flex items-center shrink-0">
					{isFluxPage ? (
						<div className="flex items-center gap-3">
							<span className="font-mono text-2xl font-bold tracking-tight text-white">
								Flux
							</span>
							<span className="font-inter text-[12px] tracking-[0.02em] text-white/48">
								by
							</span>
							<span className="group/nairon relative inline-flex items-center overflow-hidden rounded-[5px]">
								<img
									src="/nairon-logo.png"
									alt="Nairon"
									width={600}
									height={120}
									className="h-6 w-auto"
								/>
								<span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover/nairon:bg-black/20" />
							</span>
						</div>
					) : (
						<img
							src="/nairon-logo.png"
							alt="nairon."
							width={600}
							height={120}
							className="h-7 md:h-9 w-auto"
						/>
					)}
				</a>

				{/* Desktop nav */}
				{!minimal && (
				<div className="hidden md:flex items-center gap-1">
					<a
						href="/flux"
						className="px-4 py-2 rounded-full text-sm text-[#E8E4DE] hover:text-[#C9A96E] transition-colors"
					>
						Flux
					</a>


					<a
						href="https://github.com/Nairon-AI/flux"
						target="_blank"
						rel="noopener noreferrer"
						className="ml-1 p-2 rounded-full text-[#A39E96] hover:text-[#E8E4DE] transition-colors"
						aria-label="GitHub"
					>
						<GithubIcon size={20} />
					</a>

					<button
						type="button"
						onClick={openHireModal}
						className="ml-2 inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
					>
						Hire engineers
						<ArrowUpRight className="w-3.5 h-3.5" />
					</button>
				</div>
				)}

				<div className={cn("md:hidden flex items-center gap-2", minimal && "hidden")}>
					<button
						type="button"
						className="w-10 h-10 flex items-center justify-center text-[#E8E4DE]"
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
				<div className="md:hidden bg-[#0C0C0C] border-t border-white/6 px-6 py-6 space-y-1">
					<a
						href="/flux"
						className="block px-4 py-3 rounded-xl text-base text-[#E8E4DE] hover:bg-white/5 transition-colors"
						onClick={() => setMobileOpen(false)}
					>
						Flux
					</a>


					<a
						href="https://github.com/Nairon-AI/flux"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-3 rounded-xl text-base text-[#E8E4DE] hover:bg-white/5 transition-colors"
					>
						<GithubIcon size={20} />
						GitHub
					</a>

					<div className="pt-4">
						<button
							type="button"
							onClick={() => {
								setMobileOpen(false);
								openHireModal();
							}}
							className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
						>
							Hire engineers
							<ArrowUpRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}
		</nav>
	);
}
