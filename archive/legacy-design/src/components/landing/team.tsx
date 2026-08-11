import { ArrowUpRight } from "lucide-react";
import { Section, SectionTag, SectionHeading, colors } from "./primitives";
import { AnimatedGradient } from "./animated-gradient";
import { TEAM_MEMBERS } from "@/data/landing";

function LinkedInIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			className="w-5 h-5"
			fill="currentColor"
		>
			<path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
		</svg>
	);
}

function TeamMemberCard({
	name,
	role,
	image,
	linkedin,
}: { name: string; role: string; image?: string; linkedin?: string }) {
	return (
		<div>
			<div className="relative rounded-3xl overflow-hidden mb-4">
				{image ? (
					<img
						src={image}
						alt={name}
						className="w-full aspect-[380/427] object-cover"
						loading="lazy"
					/>
				) : (
					<div className="w-full aspect-[380/427] bg-gradient-to-b from-gray-700/50 to-gray-900/50 flex items-center justify-center">
						<span className="text-6xl text-[#1A1916]/20 font-display font-bold">
							{name.charAt(0)}
						</span>
					</div>
				)}
				{linkedin && (
					<a
						href={linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center text-landing-text hover:text-[#1A1916] transition-colors"
						aria-label={`${name} LinkedIn`}
					>
						<LinkedInIcon />
					</a>
				)}
			</div>
			<h4
				className="font-semibold text-2xl font-display tracking-tighter text-[#1A1916]"
			>
				{name}
			</h4>
			<p className="text-base text-[#1A1916]/55">{role}</p>
		</div>
	);
}

function MentorBar() {
	return (
		<div className="mt-16 flex items-center gap-3">
			<span className="text-lg font-normal text-[#1A1916]">20+ Mentors</span>
			<div className="flex-1 h-px bg-[#0C0C0C]/55" />
			<div className="flex items-center gap-2.5">
				<span className="text-lg font-normal text-[#1A1916]">See All</span>
				<a
					href="/team"
					className="w-12 h-12 rounded-full bg-[#0C0C0C] flex items-center justify-center hover:bg-[#1A1916] transition-colors"
					aria-label="See all team members"
				>
					<ArrowUpRight className="w-5 h-5 text-white" />
				</a>
			</div>
		</div>
	);
}

export function Team() {
	return (
		<Section className={`${colors.pageBg} relative overflow-hidden`}>
			{/* Same animated gradient as hero, behind team photos */}
			<div className="absolute inset-0 pointer-events-none opacity-40">
				<AnimatedGradient />
			</div>

			<div className="relative">
				<SectionTag label="Team" />
				<SectionHeading className="mb-16">
					Meet the Team
				</SectionHeading>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{TEAM_MEMBERS.map((member) => (
						<TeamMemberCard
							key={member.name}
							name={member.name}
							role={member.role}
							image={member.image}
							linkedin={member.linkedin}
						/>
					))}
				</div>

				<MentorBar />
			</div>
		</Section>
	);
}
