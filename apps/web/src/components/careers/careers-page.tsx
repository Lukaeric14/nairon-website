/* Hallmark · genre: modern-minimal · macrostructure: grid-led role brief · theme: Nairon warm-light · nav: site · footer: site */
import {
	ArrowDown,
	ArrowRight,
	Calendar,
	Clock3,
	MapPin,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import { DESIGN_ENGINEER_ROLE } from "@/data/careers";
import {
	Footer,
	GridCell,
	GridSection,
	GridSystem,
	Navbar,
} from "@/components/landing";
import { CareerApplicationModal } from "./career-application-modal";
import { HireModal } from "@/components/landing/hire-modal";
import { ModalProvider } from "@/components/landing/modal-provider";

function Pill({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex h-8 items-center rounded-full border border-[#0C0C0C]/10 bg-white px-3 text-xs font-medium text-[#5C584F]">
			{children}
		</span>
	);
}

function PrimaryButton({
	onClick,
	children,
}: {
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1A1916] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
		>
			{children}
		</button>
	);
}

function SecondaryLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#0C0C0C]/12 bg-white px-5 text-sm font-semibold text-[#1A1916] transition-colors hover:bg-[#0C0C0C]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E]"
		>
			{children}
		</a>
	);
}

function RoleMeta({
	icon: Icon,
	label,
	value,
}: {
	icon: ElementType;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3 border-t border-[#0C0C0C]/8 py-4 first:border-t-0">
			<Icon className="mt-0.5 size-4 shrink-0 text-[#C9A96E]" />
			<div>
				<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#5C584F]">
					{label}
				</p>
				<p className="mt-1 text-sm font-medium text-[#1A1916]">{value}</p>
			</div>
		</div>
	);
}

function SectionIntro({
	label,
	title,
	children,
}: {
	label: string;
	title: string;
	children?: ReactNode;
}) {
	return (
		<div>
			<div className="mb-4 flex items-center gap-3">
				<span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
				<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C584F]">
					{label}
				</p>
			</div>
			<h2 className="max-w-3xl text-3xl font-normal leading-tight tracking-[-0.03em] text-[#1A1916] md:text-[48px] md:leading-[54px]">
				{title}
			</h2>
			{children && (
				<p className="mt-5 max-w-2xl text-base leading-7 text-[#5C584F] md:text-lg">
					{children}
				</p>
			)}
		</div>
	);
}

function BulletList({ items }: { items: string[] }) {
	return (
		<ul className="space-y-4">
			{items.map((item) => (
				<li key={item} className="flex gap-3 text-sm leading-6 text-[#5C584F] md:text-base md:leading-7">
					<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A96E]" />
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

function ValueItem({
	label,
	text,
	index,
}: {
	label: string;
	text: string;
	index: number;
}) {
	return (
		<div className="border-t border-[#0C0C0C]/8 py-6 first:border-t-0">
			<div className="mb-3 flex items-center gap-3">
				<span className="text-xs font-semibold text-[#C9A96E]">
					{String(index + 1).padStart(2, "0")}
				</span>
				<h3 className="text-lg font-semibold tracking-[-0.02em] text-[#1A1916]">
					{label}
				</h3>
			</div>
			<p className="text-sm leading-6 text-[#5C584F] md:text-base md:leading-7">
				{text}
			</p>
		</div>
	);
}

export function CareersPage() {
	const role = DESIGN_ENGINEER_ROLE;
	const [applicationModalOpen, setApplicationModalOpen] = useState(false);

	return (
		<ModalProvider>
			<div className="min-h-screen bg-white font-inter text-[#1A1916]">
				<Navbar />

				<GridSystem className="pt-16 mt-12 md:mt-16">
					<GridSection columns="7fr 5fr" border>
						<GridCell borderRight className="px-6 py-12 md:px-12 md:py-20">
							<div className="flex flex-wrap gap-2">
								<Pill>{role.opening}</Pill>
								<Pill>{role.duration}</Pill>
								<Pill>{role.type}</Pill>
							</div>
							<h1 className="mt-8 max-w-4xl text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-[#1A1916] md:text-[84px]">
								Design Engineer Internship
							</h1>
							<p className="mt-6 max-w-2xl text-base leading-7 text-[#5C584F] md:text-xl md:leading-8">
								{role.summary}
							</p>
							<div className="mt-9 flex flex-col gap-3 sm:flex-row">
								<PrimaryButton onClick={() => setApplicationModalOpen(true)}>
									Register interest
									<ArrowRight className="size-4" />
								</PrimaryButton>
								<SecondaryLink href="#details">
									Read the role
									<ArrowDown className="size-4" />
								</SecondaryLink>
							</div>
						</GridCell>

						<GridCell className="flex items-end px-6 py-10 md:px-10 md:py-12">
							<div className="w-full">
								<p className="mb-6 max-w-sm text-sm leading-6 text-[#5C584F]">
									Applications open in {role.opening}. Register interest and we
									will review portfolios as the internship gets closer.
								</p>
								<RoleMeta icon={Clock3} label="Duration" value={role.duration} />
								<RoleMeta icon={Calendar} label="Opening" value={role.opening} />
								<RoleMeta icon={MapPin} label="Location" value={role.location} />
							</div>
						</GridCell>
					</GridSection>

					<GridSection columns="4fr 8fr" border>
						<GridCell borderRight className="px-6 py-10 md:px-12 md:py-16">
							<SectionIntro label="Why Nairon" title="For builders with taste." />
						</GridCell>
						<GridCell className="px-6 py-8 md:px-12 md:py-12">
							<p className="mb-8 max-w-2xl text-base leading-7 text-[#5C584F]">
								This is not a traditional developer internship, and it is not a
								write-prompts-all-day role. It is for someone who wants to make
								AI-powered work feel clear, useful, and well designed.
							</p>
							<div>
								{role.whyNairon.map((item, index) => (
									<ValueItem
										key={item.label}
										label={item.label}
										text={item.text}
										index={index}
									/>
								))}
							</div>
						</GridCell>
					</GridSection>

					<div id="details" className="scroll-mt-24">
						<GridSection columns="1fr 1fr" border>
							<GridCell borderRight className="px-6 py-10 md:px-12 md:py-16">
								<SectionIntro label="The work" title="What you'll work on here">
									You will build at the point where product thinking, frontend
									engineering, and AI-native workflows meet.
								</SectionIntro>
								<div className="mt-8">
									<BulletList items={role.work} />
								</div>
							</GridCell>
							<GridCell className="px-6 py-10 md:px-12 md:py-16">
								<SectionIntro label="The profile" title="What you bring" />
								<div className="mt-8">
									<BulletList items={role.bring} />
								</div>
							</GridCell>
						</GridSection>
					</div>

					<GridSection columns="5fr 7fr" border>
						<GridCell borderRight className="px-6 py-10 md:px-12 md:py-16">
							<SectionIntro label="Engineering team" title="Why join" />
						</GridCell>
						<GridCell className="px-6 py-10 md:px-12 md:py-16">
							<div className="space-y-5 text-base leading-7 text-[#5C584F]">
								{role.teamReasons.map((reason) => (
									<p key={reason}>{reason}</p>
								))}
							</div>
							<div className="mt-10 border-t border-[#0C0C0C]/8 pt-8">
								<h3 className="mb-5 text-xl font-semibold tracking-[-0.02em]">
									Internship benefits
								</h3>
								<BulletList items={role.benefits} />
							</div>
						</GridCell>
					</GridSection>

					<div id="apply" className="scroll-mt-24">
						<GridSection columns="4fr 8fr" border={false}>
							<GridCell borderRight className="px-6 py-10 md:px-12 md:py-16">
								<SectionIntro label="Apply" title="Register interest" />
								<div className="mt-8">
									<PrimaryButton onClick={() => setApplicationModalOpen(true)}>
										Register interest
										<ArrowRight className="size-4" />
									</PrimaryButton>
								</div>
							</GridCell>
							<GridCell className="px-6 py-10 md:px-12 md:py-16">
								<p className="max-w-2xl text-base leading-7 text-[#5C584F] md:text-lg">
									Leave your name, email, and portfolio link. We will review the
									work and reach out when the Summer 2026 internship opens.
								</p>
							</GridCell>
						</GridSection>
					</div>
				</GridSystem>

				<Footer />
			</div>
			<CareerApplicationModal
				open={applicationModalOpen}
				onOpenChange={setApplicationModalOpen}
			/>
			<HireModal />
		</ModalProvider>
	);
}
