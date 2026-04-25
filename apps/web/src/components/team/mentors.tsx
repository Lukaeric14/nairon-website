import { Section, SectionTag, SectionHeading, DimText, colors } from "../landing/primitives";
import { TEAM_PAGE_MEMBERS, FEATURED_MEMBER } from "@/data/landing";

function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			className={className}
			fill="currentColor"
		>
			<path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
		</svg>
	);
}

function XIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			className={className}
			fill="currentColor"
		>
			<path d="M218.12,209.56l-61-95.8,59.72-69.36a12,12,0,1,0-18.2-15.64L142.82,93.08,99.56,25.16A12,12,0,0,0,89.13,20H48a12,12,0,0,0-10.12,18.44l61,95.8L39.16,203.6a12,12,0,0,0,18.2,15.64l55.82-64.88L156.44,222.84A12,12,0,0,0,166.87,228H208a12,12,0,0,0,10.12-18.44ZM97.29,44l55.22,88-20.67,24L68.83,44ZM158.71,204l-55.22-88,20.67-24L187.17,204Z" />
		</svg>
	);
}

function TeamMemberCard({
	name,
	role,
	image,
	linkedin,
}: {
	name: string;
	role: string;
	image: string;
	linkedin: string;
}) {
	return (
		<div>
			<div className="relative mb-4">
				<img
					src={image}
					alt={name}
					className="w-full aspect-square object-cover rounded-2xl"
					loading="lazy"
				/>
				<a
					href={linkedin}
					target="_blank"
					rel="noopener noreferrer"
					className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center text-[#1A1916] hover:text-[#1A1916]/80 transition-colors"
					aria-label={`${name} LinkedIn`}
				>
					<LinkedInIcon className="w-6 h-6" />
				</a>
			</div>
			<h4
				className="font-semibold text-sm md:text-xl text-[#1A1916] tracking-tighter"
			>
				{name}
			</h4>
			<p className="text-xs md:text-base text-[#1A1916]/55">{role}</p>
		</div>
	);
}

function FeaturedMemberCard() {
	return (
		<div className="glass-card rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-8">
			{/* Left side - Photo and social links */}
			<div className="lg:w-[280px] shrink-0">
				<img
					src={FEATURED_MEMBER.image}
					alt={FEATURED_MEMBER.name}
					className="w-full aspect-square object-cover rounded-2xl mb-6"
					loading="lazy"
				/>
				<p className="text-base text-[#1A1916]/55 mb-3">Get in touch</p>
				<div className="flex gap-3">
					<a
						href={FEATURED_MEMBER.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="w-10 h-10 rounded-lg border border-[#0C0C0C]/10 flex items-center justify-center text-landing-text hover:bg-[#0C0C0C]/5 transition-colors"
						aria-label="LinkedIn"
					>
						<LinkedInIcon className="w-5 h-5" />
					</a>
					<a
						href={FEATURED_MEMBER.twitter}
						target="_blank"
						rel="noopener noreferrer"
						className="w-10 h-10 rounded-lg border border-[#0C0C0C]/10 flex items-center justify-center text-landing-text hover:bg-[#0C0C0C]/5 transition-colors"
						aria-label="X / Twitter"
					>
						<XIcon className="w-5 h-5" />
					</a>
				</div>
			</div>

			{/* Right side - Bio and logos */}
			<div className="flex-1 flex flex-col">
				<div className="mb-6">
					<h2
						className="text-4xl md:text-[56px] font-medium text-[#1A1916] leading-tight tracking-tight-xl"
					>
						{FEATURED_MEMBER.name}
					</h2>
					<h3
						className="text-xl md:text-2xl font-medium text-[#1A1916]/55 mt-2 tracking-tighter"
					>
						{FEATURED_MEMBER.title}
					</h3>
				</div>

				<div className="space-y-5 flex-1">
					{FEATURED_MEMBER.bio.map((paragraph, index) => (
						<p
							key={index}
							className="text-base leading-relaxed text-landing-text-body"
						>
							{paragraph}
						</p>
					))}
				</div>

				{/* Company logos */}
				<div className="flex flex-wrap items-center gap-6 mt-10">
					{FEATURED_MEMBER.logos.map((logo) => (
						<img
							key={logo.name}
							src={logo.src}
							alt={logo.name}
							className="h-8 md:h-10 w-auto opacity-50"
							loading="lazy"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export function Mentors() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Mentors" />
			<SectionHeading className="mb-16">
				Meet The Team
				<br />
				<DimText>Behind The Vision</DimText>
			</SectionHeading>

			{/* Team grid - 2 cols mobile, 4 cols desktop */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-10">
				{TEAM_PAGE_MEMBERS.map((member) => (
					<TeamMemberCard
						key={member.name}
						name={member.name}
						role={member.role}
						image={member.image}
						linkedin={member.linkedin}
					/>
				))}
			</div>

			{/* Featured member card */}
			<FeaturedMemberCard />
		</Section>
	);
}
