import { ArrowUpRight } from "lucide-react";
import { useModals } from "./modal-provider";

type FooterLink =
	| { label: string; href: string; external?: boolean; action?: never; disabled?: boolean }
	| { label: string; action: string; href?: never; external?: never; disabled?: never };

type FooterCol = { heading: string; links: FooterLink[] };

const FOOTER_COLS: FooterCol[] = [
	{
		heading: "Company",
		links: [
			{ label: "About", href: "/#what-we-do" },
			{ label: "Contact", action: "hire" },
		],
	},
	{
		heading: "Services",
		links: [
			{ label: "AI-Native Recruiting", action: "hire" },
			{ label: "Flux", href: "/flux" },
			{ label: "For Candidates", action: "candidate" },
		],
	},
	{
		heading: "Universe (Coming Soon)",
		links: [
			{ label: "Signals & Trends", href: "#", disabled: true },
			{ label: "AI Tool Directory", href: "#", disabled: true },
			{ label: "Jobs", href: "#", disabled: true },
			{ label: "Community", href: "#", disabled: true },
		],
	},
	{
		heading: "Legal",
		links: [
			{ label: "Privacy", href: "/privacy" },
			{ label: "Terms", href: "/terms-and-conditions" },
		],
	},
];

const REAL_ESTATE_COLS: FooterCol[] = [];

function SocialLinks() {
	return (
		<div className="flex gap-3">
			<a
				href="https://www.linkedin.com/company/nairon-ai"
				target="_blank"
				rel="noopener noreferrer"
				className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-[#A39E96] hover:text-[#E8E4DE] hover:bg-white/5 transition-colors"
				aria-label="LinkedIn"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 256 256"
					className="w-4 h-4"
					fill="currentColor"
				>
					<path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
				</svg>
			</a>
			<a
				href="https://x.com/nairon__ai"
				target="_blank"
				rel="noopener noreferrer"
				className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-[#A39E96] hover:text-[#E8E4DE] hover:bg-white/5 transition-colors"
				aria-label="X / Twitter"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 256 256"
					className="w-4 h-4"
					fill="currentColor"
				>
					<path d="M218.12,209.56l-61-95.8,59.72-69.36a12,12,0,1,0-18.2-15.64L142.82,93.08,99.56,25.16A12,12,0,0,0,89.13,20H48a12,12,0,0,0-10.12,18.44l61,95.8L39.16,203.6a12,12,0,0,0,18.2,15.64l55.82-64.88L156.44,222.84A12,12,0,0,0,166.87,228H208a12,12,0,0,0,10.12-18.44ZM97.29,44l55.22,88-20.67,24L68.83,44ZM158.71,204l-55.22-88,20.67-24L187.17,204Z" />
				</svg>
			</a>
		</div>
	);
}

export function Footer({ variant = "default" }: { variant?: "default" | "real-estate" }) {
	const { openHireModal, openCandidateModal } = useModals();

	const handleAction = (action: string) => {
		if (action === "hire") openHireModal();
		else if (action === "candidate") openCandidateModal();
	};

	const cols = variant === "real-estate" ? REAL_ESTATE_COLS : FOOTER_COLS;
	const tagline =
		variant === "real-estate"
			? "Custom AI infrastructure for real estate brokerages."
			: "Data-driven technical recruiting. Powered by Flux.";

	return (
		<footer className="bg-[#0C0C0C] border-t border-white/6">
			<div className="max-w-7xl mx-auto px-6 py-16">
				{/* Top: Logo + columns */}
				<div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 md:gap-16">
					{/* Brand */}
					<div>
						<img
							src="/nairon-logo.png"
							alt="nairon."
							width={600}
							height={120}
							className="h-8 w-auto mb-4"
						/>
						<p className="text-[#A39E96] text-sm leading-relaxed max-w-xs">
							{tagline}
						</p>
						{variant !== "real-estate" && (
						<div className="mt-6">
							<SocialLinks />
						</div>
					)}
					</div>

					{/* Nav columns */}
					{cols.map((col) => (
						<div key={col.heading}>
							<h4 className="text-[#E8E4DE] text-xs font-medium uppercase tracking-[0.16em] mb-4">
								{col.heading}
							</h4>
							<ul className="space-y-3">
								{col.links.map((link) => (
									<li key={link.label}>
										{link.action ? (
											<button
												type="button"
												onClick={() => handleAction(link.action)}
												className="text-[#A39E96] text-sm hover:text-[#E8E4DE] transition-colors"
											>
												{link.label}
											</button>
									) : link.disabled ? (
										<span className="text-[#A39E96]/40 text-sm cursor-not-allowed">
											{link.label}
										</span>
									) : (
										<a
											href={link.href}
											{...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
											className="text-[#A39E96] text-sm hover:text-[#E8E4DE] transition-colors"
										>
											{link.label}
										</a>
									)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom */}
				<div className="mt-16 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-[#A39E96] text-xs">
						&copy; {new Date().getFullYear()} Nairon. All rights reserved.
					</p>
					<button
						type="button"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="flex items-center gap-2 text-[#A39E96] hover:text-[#E8E4DE] transition-colors text-xs"
						aria-label="Back to top"
					>
						Back to top
						<ArrowUpRight className="w-3 h-3" />
					</button>
				</div>
			</div>
		</footer>
	);
}
