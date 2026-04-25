import { ArrowUpRight } from "lucide-react";
import { Section, SectionTag, SectionHeading, DimText, GlassCard, colors } from "../landing/primitives";
import { HIRE_PROCESS_STEPS } from "@/data/hire";

// Process step 1: Orbit/atom icon
function OrbitIcon() {
	return (
		<svg width="209" height="209" viewBox="0 0 209 209" fill="none" className="w-full h-full">
			<g opacity="0.4">
				<mask id="orbit-mask-1" fill="white">
					<path d="M52.2383 89.9795C52.2383 69.1356 69.1356 52.2383 89.9795 52.2383C110.823 52.2383 127.721 69.1356 127.721 89.9795C127.721 110.823 110.823 127.721 89.9795 127.721C69.1356 127.721 52.2383 110.823 52.2383 89.9795Z" />
				</mask>
				<path d="M89.9795 127.721V124.576C70.8726 124.576 55.3834 109.086 55.3834 89.9795H52.2383H49.0932C49.0932 112.56 67.3986 130.866 89.9795 130.866V127.721ZM127.721 89.9795H124.576C124.576 109.086 109.086 124.576 89.9795 124.576V127.721V130.866C112.56 130.866 130.866 112.56 130.866 89.9795H127.721ZM89.9795 52.2383V55.3834C109.086 55.3834 124.576 70.8726 124.576 89.9795H127.721H130.866C130.866 67.3986 112.56 49.0932 89.9795 49.0932V52.2383ZM89.9795 52.2383V49.0932C67.3986 49.0932 49.0932 67.3986 49.0932 89.9795H52.2383H55.3834C55.3834 70.8726 70.8726 55.3834 89.9795 55.3834V52.2383Z" fill="#CF9611" mask="url(#orbit-mask-1)" />
			</g>
			<g opacity="0.2">
				<path d="M106.395 94.8073C106.395 80.9114 117.659 69.6465 131.555 69.6465C145.451 69.6465 156.716 80.9114 156.716 94.8073C156.716 108.703 145.451 119.968 131.555 119.968C117.659 119.968 106.395 108.703 106.395 94.8073Z" fill="#CF9611" />
			</g>
			<g opacity="0.3">
				<mask id="orbit-mask-2" fill="white">
					<path d="M69.6484 107.855C69.6484 90.4854 83.7295 76.4043 101.099 76.4043C118.469 76.4043 132.551 90.4854 132.551 107.855C132.551 125.225 118.469 139.306 101.099 139.306C83.7295 139.306 69.6484 125.225 69.6484 107.855Z" />
				</mask>
				<path d="M101.099 139.306V137.734C84.598 137.734 71.221 124.357 71.221 107.855H69.6484H68.0759C68.0759 126.094 82.861 140.879 101.099 140.879V139.306ZM132.551 107.855H130.978C130.978 124.357 117.601 137.734 101.099 137.734V139.306V140.879C119.338 140.879 134.123 126.094 134.123 107.855H132.551ZM101.099 76.4043V77.9768C117.601 77.9768 130.978 91.3539 130.978 107.855H132.551H134.123C134.123 89.6169 119.338 74.8317 101.099 74.8317V76.4043ZM101.099 76.4043V74.8317C82.861 74.8317 68.0759 89.6169 68.0759 107.855H69.6484H71.221C71.221 91.3539 84.598 77.9768 101.099 77.9768V76.4043Z" fill="#D4A518" mask="url(#orbit-mask-2)" />
			</g>
			<g opacity="0.3">
				<path d="M62.6875 104.476L146.269 62.6855" stroke="#CF9611" strokeWidth="4.17906" />
			</g>
			<g opacity="0.3">
				<path d="M104.477 146.267L146.267 62.6855" stroke="#D4A518" strokeWidth="4.17906" />
			</g>
		</svg>
	);
}

// Process step 2: Filled circle icon
function FilledCircleIcon() {
	return (
		<svg width="209" height="209" viewBox="0 0 209 209" fill="none" className="w-full h-full">
			<circle cx="104.5" cy="104.5" r="50" fill="#CF9611" opacity="0.6" />
			<circle cx="104.5" cy="104.5" r="35" fill="#D4A518" opacity="0.4" />
		</svg>
	);
}

// Process step 3: Target/bullseye icon
function TargetIcon() {
	return (
		<svg width="209" height="209" viewBox="0 0 209 209" fill="none" className="w-full h-full">
			<circle cx="104.5" cy="104.5" r="50" stroke="#CF9611" strokeWidth="3" opacity="0.4" />
			<circle cx="104.5" cy="104.5" r="35" stroke="#D4A518" strokeWidth="3" opacity="0.5" />
			<circle cx="104.5" cy="104.5" r="20" fill="#CF9611" opacity="0.6" />
		</svg>
	);
}

// Process step 4: Checkmark with squares icon
function CheckmarkSquaresIcon() {
	return (
		<svg width="209" height="209" viewBox="0 0 209 209" fill="none" className="w-full h-full">
			<path opacity="0.6" d="M81.8281 104.477L96.9246 119.574L127.118 89.3809" stroke="#CF9611" strokeWidth="6.0386" strokeLinecap="round" strokeLinejoin="round" />
			<path opacity="0.3" d="M104.474 130.896C119.064 130.896 130.892 119.068 130.892 104.477C130.892 89.8867 119.064 78.0586 104.474 78.0586C89.8828 78.0586 78.0547 89.8867 78.0547 104.477C78.0547 119.068 89.8828 130.896 104.474 130.896Z" stroke="#CF9611" strokeWidth="2.26447" />
			<g opacity="0.2">
				<path d="M183.789 9.43612C183.789 7.69913 185.197 6.29102 186.934 6.29102H199.515C201.252 6.29102 202.66 7.69913 202.66 9.43612V22.0165C202.66 23.7535 201.252 25.1616 199.515 25.1616H186.934C185.197 25.1616 183.789 23.7535 183.789 22.0165V9.43612Z" fill="#CF9611" />
			</g>
			<g opacity="0.2">
				<path d="M12.5781 174.356C12.5781 172.619 13.9862 171.211 15.7232 171.211H34.5939C36.3308 171.211 37.739 172.619 37.739 174.356V193.227C37.739 194.964 36.3308 196.372 34.5939 196.372H15.7232C13.9862 196.372 12.5781 194.964 12.5781 193.227V174.356Z" fill="#D4A518" />
			</g>
		</svg>
	);
}

const PROCESS_ICONS = [OrbitIcon, FilledCircleIcon, TargetIcon, CheckmarkSquaresIcon];

function ProcessCard({
	number,
	title,
	description,
}: { number: number; title: string; description: string }) {
	const IconComponent = PROCESS_ICONS[number - 1];
	return (
		<div className="flex flex-col">
			{/* Icon card */}
			<GlassCard className="aspect-square flex items-center justify-center relative overflow-hidden mb-6">
				{/* Large number watermark */}
				<span
					className="absolute top-4 left-6 text-display-lg font-bold leading-none text-amber-600/30 select-none pointer-events-none"
				>
					{number}
				</span>
				<div className="w-[140px] h-[140px]">
					<IconComponent />
				</div>
			</GlassCard>

			{/* Text */}
			<h4
				className={`text-lg font-semibold tracking-tighter ${colors.text} mb-2`}
			>
				{title}
			</h4>
			<p className={`text-sm leading-relaxed ${colors.textBody}`}>{description}</p>
		</div>
	);
}

export function HireProcess() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Process" />
			<SectionHeading className="mt-4 mb-16">
				How Does <DimText>Hiring Work?</DimText>
			</SectionHeading>

			{/* 4-column grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{HIRE_PROCESS_STEPS.map((step) => (
					<ProcessCard
						key={step.number}
						number={step.number}
						title={step.title}
						description={step.description}
					/>
				))}
			</div>

			{/* Submit Real Projects callout */}
			<GlassCard className="mt-16 border-l-2 border-amber-500/50 pl-6 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
				<div>
					<h4
						className={`text-xl font-semibold tracking-tighter ${colors.text} mb-2`}
					>
						Submit Real Projects to the Cohort
					</h4>
					<p className={`text-base leading-relaxed ${colors.textBody} max-w-2xl`}>
						Priority and Exclusive Partners can submit real product challenges or
						internal tasks for the cohort to work on. Your roadmap directly shapes
						their training — and you get early visibility into top performers.
					</p>
				</div>
				<a
					href="/bookacall"
					className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-base px-5 py-2.5 rounded-full hover:bg-[#0C0C0C]/15 transition-colors shrink-0"
				>
					Start Hiring Process
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</GlassCard>
		</Section>
	);
}
