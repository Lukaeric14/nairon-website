import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { CAL_ATTRS } from "./cal";

/**
 * FAQ — heading + supporting copy on the left, a single-open accordion on the
 * right. Uses the shared shadcn Accordion (Radix) with landing-scale type and
 * ds tokens so it matches the rest of the page.
 */

const FAQS: { q: string; a: string }[] = [
	{
		q: "What exactly is an AI employee?",
		a: "An AI worker built around one of your real workflows. It executes operational work end to end — across revenue, support, and operations — rather than handling a single isolated task.",
	},
	{
		q: "How is this different from buying more software?",
		a: "There's nothing new to learn or migrate to. Each agent runs on top of the tools you already use, so it slots into how your team works today instead of asking everyone to change.",
	},
	{
		q: "How long until something is live?",
		a: "Weeks, not quarters. We scope a workflow, build the agent against it, and get it running inside your systems — no 18-month timelines or rip-and-replace projects.",
	},
	{
		q: "Is our data secure?",
		a: "Agents run in your cloud with role-based access and human approvals, and the platform is SOC 2 aligned. A human on your team stays accountable for every agent.",
	},
	{
		q: "Do we need engineers to maintain them?",
		a: "No. Nairon builds and tunes the agents. Your team reviews output and stays in the loop through Hive — assigning work and approving actions like you would with any teammate.",
	},
	{
		q: "Which AI models do you use?",
		a: "Whichever you choose. Agents are model-agnostic, so you're never locked to a single provider and can adopt better models as they ship.",
	},
];

export function Faq() {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				{/* Left — title */}
				<div className="lg:pt-2">
					<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
						FAQ
					</div>
					<h2 className="mt-3 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
						Questions,
						<br />
						answered
					</h2>
					<p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						Everything you need to know about how Nairon's AI employees work. Still
						curious?{" "}
						<a
							href="#book-demo"
							{...CAL_ATTRS}
							className="font-medium underline-offset-4 hover:underline"
							style={{ color: "var(--brand-blue)" }}
						>
							Talk to the founder
						</a>
						.
					</p>
				</div>

				{/* Right — accordion */}
				<Accordion
					type="single"
					collapsible
					defaultValue="item-0"
					className="w-full"
				>
					{FAQS.map((item, i) => (
						<AccordionItem
							key={item.q}
							value={`item-${i}`}
							className="border-ds-border"
						>
							<AccordionTrigger className="py-5 text-[1.0625rem] font-medium text-ds-text-primary hover:no-underline">
								{item.q}
							</AccordionTrigger>
							<AccordionContent className="max-w-xl text-[0.9375rem] leading-relaxed text-ds-text-secondary">
								{item.a}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
