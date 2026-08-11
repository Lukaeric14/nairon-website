// ─── Contact page data ──────────────────────────────────────────

export const CONTACT_INFO = {
	email: {
		title: "Email Us",
		description: "Reach out to our team for quick assistance.",
		value: "info@naironai.com",
		href: "mailto:info@naironai.com",
		icon: "/assets/framer/BK87RnGWq8W5d4JPHVEHK7yvIO0.png",
	},
	phone: {
		title: "Call Us",
		description: "Drop us a message, and we'll get back to you soon.",
		value: "+971 58 588 9750",
		href: "tel:+971585889750",
		icon: "/assets/framer/qZrHBQaNvlw4cXQS67MoFsMjE.png",
	},
} as const;

export const COMMUNITY_SECTION = {
	title: "Join Our Community",
	description:
		"Join our vibrant community of AI enthusiasts, professionals, and innovators.",
	benefits: [
		"Connect with Like-minded Individuals.",
		"Exclusive Access to Events.",
		"Stay Updated with the Latest Trends.",
	],
	buttonText: "Join Now",
	buttonHref:
		"https://join.slack.com/t/naironaicommunity/shared_invite/zt-3iqxykjaq-U_PYxtF12xecClDIfgPsCQ",
	image: "/assets/framer/omnpDwff1GtuDQBypx8joilLBEk.png",
} as const;

export const CONTACT_FORM = {
	fields: [
		{
			name: "firstName",
			label: "First Name",
			placeholder: "Jane",
			type: "text",
		},
		{
			name: "lastName",
			label: "Last Name",
			placeholder: "Smith",
			type: "text",
		},
		{
			name: "email",
			label: "Email",
			placeholder: "jane@naironai.com",
			type: "email",
			fullWidth: true,
		},
		{
			name: "phone",
			label: "Contact Number",
			placeholder: "+1234567890",
			type: "tel",
			fullWidth: true,
		},
		{
			name: "message",
			label: "Message",
			placeholder: "Write your message",
			type: "textarea",
			fullWidth: true,
		},
	],
	submitText: "Submit",
} as const;
