import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { AnimatedGradient } from "../landing/animated-gradient";
import { Section, SectionTag, colors } from "../landing/primitives";
import { LINKEDIN_PRIORITY_LINK } from "@/data/careers";
import type { JobDetail } from "@/data/careers";

// ─── Hero Section ────────────────────────────────────────────────
function JobDetailHero({ title }: { title: string }) {
	return (
		<header className="relative h-[320px] flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<AnimatedGradient />
			</div>
			<h1
				className="relative z-10 text-display-md md:text-display-2xl lg:text-display-3xl font-semibold text-[#1A1916] text-center px-4 tracking-hero"
			>
				{title}
			</h1>
		</header>
	);
}

// ─── Job Info Badge ──────────────────────────────────────────────
function InfoBadge({
	icon: Icon,
	text,
}: { icon: React.ElementType; text: string }) {
	return (
		<div className="flex items-center gap-2 text-[#1A1916]/70">
			<Icon className="w-4 h-4" />
			<span className="text-base">{text}</span>
		</div>
	);
}

// ─── Apply Button ────────────────────────────────────────────────
function ApplyButton({ className }: { className?: string }) {
	return (
		<a
			href="https://apply.naironai.com"
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center justify-center gap-2 bg-[#0C0C0C] hover:bg-[#0C0C0C]/85 text-white font-medium text-base px-6 py-3 rounded-full transition-colors ${className || ""}`}
		>
			Apply for this position
		</a>
	);
}

// ─── LinkedIn Banner ─────────────────────────────────────────────
function LinkedInBanner() {
	return (
		<a
			href={LINKEDIN_PRIORITY_LINK.href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-brand-dark hover:bg-brand-dark-hover transition-colors rounded-lg text-black text-sm font-medium mt-4"
		>
			<span>{LINKEDIN_PRIORITY_LINK.text}</span>
			<ArrowUpRight className="w-4 h-4" />
		</a>
	);
}

// ─── Job Header ──────────────────────────────────────────────────
function JobHeader({ job }: { job: JobDetail }) {
	const locationText = job.location === "Remote / Dubai" ? "Remote" : job.location;
	const typeText = job.type === "Full-time" ? "Full time" : job.type;

	return (
		<div className="mb-8">
			<SectionTag label="Job Opening" />
			<h2
				className={`text-4xl md:text-5xl font-medium ${colors.text} mb-4 tracking-tight-xl`}
			>
				{job.title}
			</h2>
			<div className="flex items-center gap-4 mb-6">
				<InfoBadge icon={MapPin} text={locationText} />
				<div className="w-px h-4 bg-[#0C0C0C]/20" />
				<InfoBadge icon={Clock} text={typeText} />
			</div>
			<ApplyButton />
			<LinkedInBanner />
		</div>
	);
}

// ─── Content Section (right side with job details) ───────────────
function ContentSection({
	title,
	children,
}: { title: string; children: React.ReactNode }) {
	return (
		<div className="mb-10">
			<h3
				className={`text-2xl font-semibold ${colors.text} mb-4 tracking-tighter`}
			>
				{title}
			</h3>
			{children}
		</div>
	);
}

// ─── Bullet List ─────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
	return (
		<ul className="space-y-3">
			{items.map((item, index) => (
				<li key={index} className="flex items-start gap-3">
					<span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]/40 mt-2.5 shrink-0" />
					<span className={`text-base leading-relaxed ${colors.textBody}`}>
						{item}
					</span>
				</li>
			))}
		</ul>
	);
}

// ─── Numbered List ───────────────────────────────────────────────
function NumberedList({ items }: { items: string[] }) {
	return (
		<ul className="space-y-3">
			{items.map((item, index) => (
				<li key={index} className="flex items-start gap-3">
					<span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]/40 mt-2.5 shrink-0" />
					<span className={`text-base leading-relaxed ${colors.textBody}`}>
						{index + 1}. {item}
					</span>
				</li>
			))}
		</ul>
	);
}

// ─── Job Content ─────────────────────────────────────────────────
function JobContent({ job }: { job: JobDetail }) {
	return (
		<div>
			<ContentSection title="About the Role">
				<p className={`text-base leading-relaxed ${colors.textBody}`}>
					{job.aboutTheRole}
				</p>
			</ContentSection>

			<ContentSection title="Responsibilities">
				<BulletList items={job.responsibilities} />
			</ContentSection>

			<ContentSection title="Requirements">
				<BulletList items={job.requirements} />
			</ContentSection>

			<ContentSection title="Nice to Have">
				<BulletList items={job.niceToHave} />
			</ContentSection>

			{job.importantNote && (
				<ContentSection title="Important Note">
					<p className={`text-base leading-relaxed ${colors.textBody} mb-6`}>
						{job.importantNote.description}
					</p>
					<h4
						className={`text-lg font-medium ${colors.text} mb-3`}
						style={{ letterSpacing: "-0.36px" }}
					>
						How it works
					</h4>
					<NumberedList items={job.importantNote.howItWorks} />
				</ContentSection>
			)}

			<p className={`text-base leading-relaxed ${colors.textBody} mt-8 mb-6`}>
				You are not applying to work inside Nairon. You are applying to our
				training and evaluation program. Based on performance, you may be hired
				by one of our partner companies and placed into a role similar to the
				one described here.
			</p>
		</div>
	);
}

// ─── Bottom CTA ──────────────────────────────────────────────────
function BottomCTA() {
	return (
		<div className="flex justify-center py-12">
			<ApplyButton />
		</div>
	);
}

// ─── Main Export: JobDetailPage ──────────────────────────────────
export interface JobDetailPageProps {
	job: JobDetail;
}

export function JobDetailPage({ job }: JobDetailPageProps) {
	return (
		<>
			<JobDetailHero title={job.title} />
			<Section className={colors.pageBg}>
				<JobHeader job={job} />
				<JobContent job={job} />
				<BottomCTA />
			</Section>
		</>
	);
}

// ─── Loading State ───────────────────────────────────────────────
export function JobDetailLoading() {
	return (
		<>
			<header className="relative h-[320px] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<AnimatedGradient />
				</div>
				<div className="relative z-10 w-64 h-16 bg-[#0C0C0C]/10 rounded animate-pulse" />
			</header>
			<Section className={colors.pageBg}>
				<div className="space-y-4 mb-8">
					<div className="w-32 h-6 bg-[#0C0C0C]/10 rounded animate-pulse" />
					<div className="w-48 h-12 bg-[#0C0C0C]/10 rounded animate-pulse" />
					<div className="w-64 h-8 bg-[#0C0C0C]/10 rounded animate-pulse" />
				</div>
				<div className="space-y-8">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="space-y-4">
							<div className="w-40 h-8 bg-[#0C0C0C]/10 rounded animate-pulse" />
							<div className="space-y-2">
								<div className="w-full h-4 bg-[#0C0C0C]/10 rounded animate-pulse" />
								<div className="w-3/4 h-4 bg-[#0C0C0C]/10 rounded animate-pulse" />
								<div className="w-5/6 h-4 bg-[#0C0C0C]/10 rounded animate-pulse" />
							</div>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}

// ─── Not Found State ─────────────────────────────────────────────
export function JobDetailNotFound() {
	return (
		<>
			<header className="relative h-[320px] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<AnimatedGradient />
				</div>
				<h1
					className="relative z-10 text-display-md md:text-display-2xl font-semibold text-[#1A1916] text-center tracking-hero"
				>
					Not Found
				</h1>
			</header>
			<Section className={colors.pageBg}>
				<div className="text-center py-16">
					<h2 className={`text-3xl font-medium ${colors.text} mb-4`}>
						Job position not found
					</h2>
					<p className={`text-base ${colors.textBody} mb-8`}>
						The job you're looking for doesn't exist or has been removed.
					</p>
					<a
						href="/careers"
						className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#0C0C0C]/85 text-white font-medium text-base px-6 py-3 rounded-full transition-colors"
					>
						View all positions
						<ArrowUpRight className="w-4 h-4" />
					</a>
				</div>
			</Section>
		</>
	);
}
