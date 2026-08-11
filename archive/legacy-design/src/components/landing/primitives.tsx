import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Design Tokens ──────────────────────────────────────────────
// Dark rustic palette inspired by Warp.dev — warm tones, gold accents
export const colors = {
	/** Primary text — warm off-white (Warp: rgba(250,249,246,0.9)) */
	text: "text-[#1A1916]",
	/** Dimmed heading text — warm white at 55% */
	textDim: "text-[#1A1916]/55",
	/** Body / secondary text — warm gray */
	textBody: "text-[#5C584F]",
	/** Muted text — warm white at 40% */
	textMuted: "text-[#1A1916]/40",
	/** Secondary text — warm white at 50% */
	textSecondary: "text-[#1A1916]/50",
	/** Gold accent text */
	textGold: "text-[#C9A96E]",
	/** Card/glass border — warm white at 6% */
	border: "border-[#0C0C0C]/6",
	/** Interactive border — warm white at 10% */
	borderInteractive: "border-[#0C0C0C]/10",
	/** Emphasis border — warm white at 14% (tags, badges) */
	borderEmphasis: "border-[#0C0C0C]/14",
	/** Glass background — white at 3% */
	glassBg: "bg-[#0C0C0C]/[0.03]",
	/** Secondary surface — white at 5% */
	secondaryBg: "bg-[#0C0C0C]/[0.05]",
	/** Hover surface — white at 8% */
	hoverBg: "bg-[#0C0C0C]/8",
	/** Page background — near black */
	pageBg: "bg-white",
} as const;

// Typography class bundles for reuse across pages
export const typography = {
	/** Serif section heading base — tracking + leading + color only */
	serif: "font-serif tracking-serif leading-serif text-[#1A1916]",
	/** Uppercase label — tight */
	label: "uppercase tracking-label",
	/** Uppercase label — wide */
	labelWide: "uppercase tracking-label-wide",
} as const;

// ─── Section Container ───────────────────────────────────────────
export function Section({
	children,
	className,
	id,
}: { children: ReactNode; className?: string; id?: string }) {
	return (
		<section id={id} className={cn("py-24 md:py-32", className)}>
			<div className="max-w-7xl mx-auto px-6">{children}</div>
		</section>
	);
}

// ─── Section Eyebrow (small uppercase label with gold dot) ──────
export function SectionEyebrow({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-3 mb-6">
			<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
			<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
				{label}
			</span>
		</div>
	);
}

// ─── Section Tag (line + text — kept for compatibility) ─────────
export function SectionTag({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-4 mb-6">
			<div className="w-10 h-[2px] bg-[#C9A96E]" />
			<span className="text-[#1A1916] text-lg">{label}</span>
		</div>
	);
}

// ─── Section Heading ─────────────────────────────────────────────
export function SectionHeading({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	return (
		<h2
			className={cn(
				"text-4xl md:text-display-md font-normal leading-tight tracking-tight-xl",
				colors.text,
				className,
			)}
		>
			{children}
		</h2>
	);
}

// ─── Dimmed Text (for partial heading dimming) ───────────────────
export function DimText({ children }: { children: ReactNode }) {
	return <span className={colors.textDim}>{children}</span>;
}

// ─── Gold Accent Text ────────────────────────────────────────────
export function GoldText({ children }: { children: ReactNode }) {
	return <span className="text-gradient-gold">{children}</span>;
}

// ─── Accent Text (neon green — rare usage) ───────────────────────
export function AccentText({ children }: { children: ReactNode }) {
	return <span className="text-[#BEFF00]">{children}</span>;
}

// ─── Glass Card ──────────────────────────────────────────────────
export function GlassCard({
	children,
	className,
	hover = false,
}: { children: ReactNode; className?: string; hover?: boolean }) {
	return (
		<div
			className={cn(
				"glass-card rounded-2xl",
				hover && "hover:bg-[#0C0C0C]/[0.05] transition-colors",
				className,
			)}
		>
			{children}
		</div>
	);
}

// ─── Outline Button (link-styled) ────────────────────────────────
export function OutlineButton({
	href,
	children,
	target,
	className,
}: {
	href: string;
	children: ReactNode;
	target?: string;
	className?: string;
}) {
	return (
		<a
			href={href}
			target={target}
			rel={target === "_blank" ? "noopener noreferrer" : undefined}
			className={cn(
				"inline-flex items-center gap-2 border border-[#0C0C0C]/10",
				"text-[#1A1916] font-medium text-base px-5 py-2.5 rounded-full hover:bg-[#0C0C0C]/5 transition-colors",
				className,
			)}
		>
			{children}
			<ArrowUpRight className="w-4 h-4" />
		</a>
	);
}

// ─── Primary Button (gold-tinted CTA) ───────────────────────────
export function PrimaryButton({
	href,
	children,
	target,
	className,
}: {
	href: string;
	children: ReactNode;
	target?: string;
	className?: string;
}) {
	return (
		<a
			href={href}
			target={target}
			rel={target === "_blank" ? "noopener noreferrer" : undefined}
			className={cn(
				"inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors",
				className,
			)}
		>
			{children}
			<ArrowUpRight className="w-4 h-4" />
		</a>
	);
}

// ─── Secondary Button (dark pill, Warp-style nav CTA) ───────────
export function SecondaryButton({
	href,
	children,
	target,
	className,
}: {
	href: string;
	children: ReactNode;
	target?: string;
	className?: string;
}) {
	return (
		<a
			href={href}
			target={target}
			rel={target === "_blank" ? "noopener noreferrer" : undefined}
			className={cn(
				"inline-flex items-center gap-2 bg-[#353534] hover:bg-[#454544] text-[#5C584F] font-medium text-base px-5 py-2.5 rounded-full transition-colors",
				className,
			)}
		>
			{children}
		</a>
	);
}

// ─── Card Title ──────────────────────────────────────────────────
export function CardTitle({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	return (
		<h4
			className={cn("text-2xl font-medium tracking-tighter", colors.text, className)}
		>
			{children}
		</h4>
	);
}

// ─── Body Text ───────────────────────────────────────────────────
export function BodyText({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	return (
		<p className={cn("text-base leading-relaxed", colors.textBody, className)}>
			{children}
		</p>
	);
}

// ─── Bullet Point ────────────────────────────────────────────────
export function BulletPoint({
	children,
	color = "gold",
}: { children: ReactNode; color?: "green" | "gold" }) {
	return (
		<div className="flex items-start gap-3">
			<div
				className={cn(
					"w-1.5 h-1.5 rounded-full mt-2 shrink-0",
					color === "green" ? "bg-green-400" : "bg-[#C9A96E]",
				)}
			/>
			<BodyText>{children}</BodyText>
		</div>
	);
}

// ─── Nature Painting Background ──────────────────────────────────
// Utility for sections that use rustic nature art as background
export function PaintingBackground({
	src,
	alt = "",
	children,
	className,
	overlay = "rgba(12, 12, 12, 0.6)",
}: {
	src: string;
	alt?: string;
	children: ReactNode;
	className?: string;
	overlay?: string;
}) {
	return (
		<div className={cn("relative overflow-hidden", className)}>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div
				className="absolute inset-0"
				style={{ background: overlay }}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
}
