export interface CareerRole {
	id: string;
	title: string;
	department: string;
	type: string;
	duration: string;
	location: string;
	opening: string;
	summary: string;
	whyNairon: Array<{
		label: string;
		text: string;
	}>;
	work: string[];
	bring: string[];
	teamReasons: string[];
	benefits: string[];
}

export const DESIGN_ENGINEER_ROLE: CareerRole = {
	id: "design-engineer",
	title: "Design Engineer Intern",
	department: "Engineering",
	type: "Internship",
	duration: "3 months",
	location: "Remote / Miami",
	opening: "Summer 2026",
	summary:
		"A 3-month internship for frontend builders who care about agent-friendly UI: interfaces where humans can direct, inspect, and trust agent work without friction.",
	whyNairon: [
		{
			label: "Build the interface layer for AI employees",
			text: "Nairon builds AI employees around real business workflows. You will design the surfaces where people understand what agents are doing, direct their next move, review their work, and stay in control.",
		},
		{
			label: "Small team, visible work",
			text: "The role is close to founders, product thinking, customer feedback, and production code. Good taste will not sit in a Figma file for months.",
		},
		{
			label: "Slope over credentials",
			text: "We care about learning velocity, taste, curiosity, and what you have actually built more than a perfect CV. This role is based on how effective you are with agents and how strong your UI taste is for human-AI interactions.",
		},
	],
	work: [
		"Craft polished, responsive interfaces that help agents and humans collaborate without confusion.",
		"Design agent-friendly UI patterns: tool timelines, reasoning traces, approvals, handoffs, progress states, recovery flows, and interaction states that make agent behavior legible.",
		"Turn messy product ideas into clear screens, prototypes, flows, and production-ready frontend code for agent-powered workflows.",
		"Use animation, transitions, and motion to clarify state changes instead of decorating the interface.",
		"Build user-facing features with React, TypeScript, modern component systems, and strong performance habits.",
		"Use AI tools to explore options, critique UX, document systems, and iterate faster without lowering the bar.",
		"Work closely with founders and engineering to ship fast concepts while keeping typography, spacing, visual hierarchy, and interaction quality tight.",
		"Improve established product surfaces and contribute to greenfield experiments where the interface is still being discovered.",
	],
	bring: [
		"You have built and shipped frontend projects. React, Next.js, TanStack, or similar production experience is a strong signal.",
		"You have a good-looking portfolio with no broken links and enough context to understand your decisions.",
		"You have experience building agent-friendly interfaces, AI workflows, developer tools, automation dashboards, copilots, or products where the user needs to inspect what a system is doing.",
		"You notice typography, spacing, hierarchy, motion, empty states, loading states, and the small details that make software feel considered.",
		"You think deeply about how humans should give direction to agents, inspect their work, recover from mistakes, and stay in control.",
		"You can explain why a tool call, reasoning trace, approval step, animation, or transition belongs in the interface.",
		"You are comfortable using AI tools for prototyping, coding, critique, documentation, and workflow design.",
		"You can take a vague ask, ask useful questions, make a direction concrete, and keep iterating until it works.",
		"Bonus: experience with Figma, Framer, Storybook, Vitest, React Testing Library, or product analytics.",
	],
	teamReasons: [
		"You will get long blocks of builder time and direct feedback from people who care about shipping.",
		"You will work at the intersection of product, design, engineering, and agent-human collaboration.",
		"You will learn how taste turns into business value when the work has to survive real customers.",
		"Shortlisted candidates will complete a focused take-home project that can be built in a few hours and shows how they think, design, and ship.",
	],
	benefits: [
		"3-month internship designed around real product work",
		"Founder and engineering mentorship",
		"Hands-on AI tooling and workflow design",
		"Portfolio-worthy shipped work",
		"Direct feedback and review cycles",
	],
};
