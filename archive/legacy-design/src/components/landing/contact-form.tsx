import { useState } from "react";
import { ArrowUpRight, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	colors,
} from "./primitives";
import {
	CONTACT_INFO,
	COMMUNITY_SECTION,
} from "@/data/contact";
import { submitContactForm } from "@/server/contact";

// ─── Contact Info Card ──────────────────────────────────────────
function ContactInfoCard({
	icon,
	title,
	description,
	value,
	href,
}: {
	icon: string;
	title: string;
	description: string;
	value: string;
	href: string;
}) {
	return (
		<a
			href={href}
			className="flex flex-col gap-4 group cursor-pointer"
		>
			<div className="shrink-0">
				<img
					src={icon}
					alt=""
					className="w-[60px] h-[60px]"
					loading="lazy"
				/>
			</div>
			<div className="flex flex-col">
				<h4
					className={`text-2xl font-semibold ${colors.text} group-hover:text-[#1A1916]/80 transition-colors tracking-tighter`}
				>
					{title}
				</h4>
				<p className={`text-base ${colors.textBody} mt-1`}>{description}</p>
				<h4
					className={`text-2xl font-semibold ${colors.text} mt-4 tracking-tighter`}
				>
					{value}
				</h4>
			</div>
		</a>
	);
}

// ─── Community Card ─────────────────────────────────────────────
function CommunityCard() {
	return (
		<div className="glass-card rounded-2xl p-6 md:p-8">
			<div className="flex flex-col gap-4">
				<div>
					<h4
						className={`text-2xl font-semibold ${colors.text} tracking-tighter`}
					>
						{COMMUNITY_SECTION.title}
					</h4>
					<p className={`text-base ${colors.textBody} mt-2`}>
						{COMMUNITY_SECTION.description}
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
					<div className="flex-1">
						<div className="space-y-2 mb-6">
							{COMMUNITY_SECTION.benefits.map((benefit) => (
								<p key={benefit} className={`text-base ${colors.text}`}>
									{benefit}
								</p>
							))}
						</div>
						<a
							href={COMMUNITY_SECTION.buttonHref}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-[#0C0C0C]/12 hover:bg-[#0C0C0C]/20 text-[#1A1916] text-base pl-4 pr-1.5 py-1.5 rounded-full transition-colors"
						>
							<span>{COMMUNITY_SECTION.buttonText}</span>
							<span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
								<ArrowUpRight className="w-4 h-4 text-black" />
							</span>
						</a>
					</div>
					<div className="shrink-0">
						<img
							src={COMMUNITY_SECTION.image}
							alt=""
							className="w-28 h-28 object-contain"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// ─── Form Input ─────────────────────────────────────────────────
function FormInput({
	label,
	name,
	type,
	placeholder,
	value,
	onChange,
	disabled,
}: {
	label: string;
	name: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}) {
	const inputClasses = `w-full bg-transparent border-b border-[#0C0C0C]/20 text-landing-text text-base py-3 px-0 focus:outline-none focus:border-[#0C0C0C]/40 transition-colors placeholder:text-[#1A1916]/30 disabled:opacity-50`;

	return (
		<div className="flex flex-col gap-1">
			<label className={`text-sm ${colors.text}`}>{label}</label>
			{type === "textarea" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`${inputClasses} min-h-[100px] resize-none`}
					disabled={disabled}
				/>
			) : (
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={inputClasses}
					disabled={disabled}
				/>
			)}
		</div>
	);
}

// ─── Contact Form ───────────────────────────────────────────────
function ContactFormCard() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
			toast.error("Please fill in all required fields");
			return;
		}

		setIsSubmitting(true);

		try {
			const result = await submitContactForm({ data: formData });

			if (!result.success) {
				throw new Error("Failed to send message");
			}

			setIsSubmitted(true);
			toast.success("Message sent successfully! We'll get back to you soon.");

			// Reset form after a delay
			setTimeout(() => {
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					message: "",
				});
				setIsSubmitted(false);
			}, 3000);
		} catch (error) {
			console.error("Form submission error:", error);
			toast.error("Failed to send message. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="glass-card rounded-2xl p-6 md:p-8">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Name row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormInput
						label="First Name"
						name="firstName"
						type="text"
						placeholder="Jane"
						value={formData.firstName}
						onChange={(value) =>
							setFormData({ ...formData, firstName: value })
						}
						disabled={isSubmitting}
					/>
					<FormInput
						label="Last Name"
						name="lastName"
						type="text"
						placeholder="Smith"
						value={formData.lastName}
						onChange={(value) =>
							setFormData({ ...formData, lastName: value })
						}
						disabled={isSubmitting}
					/>
				</div>

				{/* Email */}
				<FormInput
					label="Email"
					name="email"
					type="email"
					placeholder="jane@naironai.com"
					value={formData.email}
					onChange={(value) => setFormData({ ...formData, email: value })}
					disabled={isSubmitting}
				/>

				{/* Phone */}
				<FormInput
					label="Contact Number"
					name="phone"
					type="tel"
					placeholder="+1234567890"
					value={formData.phone}
					onChange={(value) => setFormData({ ...formData, phone: value })}
					disabled={isSubmitting}
				/>

				{/* Message */}
				<FormInput
					label="Message"
					name="message"
					type="textarea"
					placeholder="Write your message"
					value={formData.message}
					onChange={(value) => setFormData({ ...formData, message: value })}
					disabled={isSubmitting}
				/>

				{/* Submit button */}
				<button
					type="submit"
					disabled={isSubmitting || isSubmitted}
					className="w-full flex items-center justify-center gap-2 bg-[#0C0C0C] hover:bg-[#0C0C0C]/85 disabled:bg-[#0C0C0C]/60 text-white text-base font-medium py-3 px-6 rounded-full transition-colors disabled:cursor-not-allowed"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							<span>Sending...</span>
						</>
					) : isSubmitted ? (
						<>
							<Check className="w-4 h-4" />
							<span>Sent!</span>
						</>
					) : (
						<span>Submit</span>
					)}
				</button>
			</form>
		</div>
	);
}

// ─── Main Contact Section ───────────────────────────────────────
export function ContactSection() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Contact Us" />
			<SectionHeading className="mb-16 max-w-4xl">
				We'd Love to Hear From You{" "}
				<DimText>Get in Touch with Us Today!</DimText>
			</SectionHeading>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
				{/* Left column - Contact info and community */}
				<div className="flex flex-col gap-8">
					{/* Email and Call cards - side by side */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
						<ContactInfoCard
							icon={CONTACT_INFO.email.icon}
							title={CONTACT_INFO.email.title}
							description={CONTACT_INFO.email.description}
							value={CONTACT_INFO.email.value}
							href={CONTACT_INFO.email.href}
						/>
						<ContactInfoCard
							icon={CONTACT_INFO.phone.icon}
							title={CONTACT_INFO.phone.title}
							description={CONTACT_INFO.phone.description}
							value={CONTACT_INFO.phone.value}
							href={CONTACT_INFO.phone.href}
						/>
					</div>

					{/* Community card */}
					<CommunityCard />
				</div>

				{/* Right column - Contact form */}
				<ContactFormCard />
			</div>
		</Section>
	);
}
