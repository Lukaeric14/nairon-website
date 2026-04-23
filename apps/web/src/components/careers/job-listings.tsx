import { ArrowUpRight, Search } from "lucide-react";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	colors,
} from "../landing/primitives";
import { JOB_LISTINGS, LINKEDIN_PRIORITY_LINK } from "@/data/careers";
import type { JobListing } from "@/data/careers";

function LinkedInBanner() {
	return (
		<a
			href={LINKEDIN_PRIORITY_LINK.href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-brand-dark hover:bg-brand-dark-hover transition-colors rounded-lg text-black text-sm font-medium"
		>
			<span>{LINKEDIN_PRIORITY_LINK.text}</span>
			<ArrowUpRight className="w-4 h-4" />
		</a>
	);
}

function FilterBar() {
	return (
		<div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-8 md:mt-10">
			<div className="flex-1 h-[48px] md:h-[54px] bg-[#0C0C0C]/5 rounded-xl px-4 flex items-center">
				<span className={`text-sm md:text-base ${colors.text}`}>Job title</span>
			</div>
			<div className="flex-1 h-[48px] md:h-[54px] bg-[#0C0C0C]/5 rounded-xl px-4 flex items-center">
				<span className={`text-sm md:text-base ${colors.text}`}>Job type</span>
			</div>
			<div className="flex-1 h-[48px] md:h-[54px] bg-[#0C0C0C]/5 rounded-xl px-4 flex items-center">
				<span className={`text-sm md:text-base ${colors.text}`}>Location</span>
			</div>
			<button
				type="button"
				className="h-[44px] md:h-[48px] px-6 bg-[#0C0C0C] hover:bg-[#1A1916] rounded-xl flex items-center justify-center gap-2 transition-colors"
			>
				<Search className="w-5 h-5 text-white" />
				<span className="text-sm md:text-base font-medium text-white">Search</span>
			</button>
		</div>
	);
}

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-3 py-1 rounded-lg border border-[#0C0C0C]/12">
			<span className="text-sm text-[#1A1916]">{children}</span>
		</div>
	);
}

function ApplyButton() {
	return (
		<div className="flex items-center gap-2.5 px-5 pl-6 py-1.5 rounded-full bg-[#0C0C0C]/[0.01] border border-[#0C0C0C]/12 backdrop-blur-sm">
			<span className="text-base text-[#1A1916]">Apply</span>
			<div className="w-[38px] h-[38px] rounded-full flex items-center justify-center">
				<ArrowUpRight className="w-5 h-5 text-[#1A1916]" />
			</div>
		</div>
	);
}

function JobCard({ job }: { job: JobListing }) {
	return (
		<a
			href={job.href}
			className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 px-2 md:px-4 border-b border-[#0C0C0C]/12 hover:bg-[#0C0C0C]/[0.02] transition-colors gap-4"
		>
			<div className="flex-1">
				<h3
					className={`text-lg md:text-2xl font-semibold ${colors.text} mb-2 tracking-tighter`}
				>
					{job.title}
				</h3>
				<p className="text-sm md:text-base text-landing-text-body leading-relaxed mb-3 md:mb-4 max-w-3xl">
					{job.description}
				</p>
				<div className="flex flex-wrap items-center gap-2">
					<Badge>{job.type}</Badge>
					<Badge>{job.location}</Badge>
					{job.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
				</div>
			</div>
			<ApplyButton />
		</a>
	);
}

export function JobListings() {
	const resultsCount = JOB_LISTINGS.length;

	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Careers" />
			<SectionHeading>
				All <DimText>open positions</DimText>
			</SectionHeading>

			<p className={`text-base ${colors.textBody} mt-4`}>
				Nairon helps fast growing tech companies hire the best. All open
				positions are external positions.
			</p>

			<div className="mt-6">
				<LinkedInBanner />
			</div>

			<FilterBar />

			<div className="mt-8">
				<p className={`text-base ${colors.textBody} mb-4`}>
					{resultsCount} Results
				</p>
				<div className="border-t border-[#0C0C0C]/12">
					{JOB_LISTINGS.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
			</div>
		</Section>
	);
}
