import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { CAL_ATTRS } from "./cal";
import type { VerticalFaq } from "@/content/vertical-faqs";

/**
 * Per-vertical FAQ — same layout as the homepage Faq (heading left, single-open
 * accordion right) but driven by the vertical's own Q&A. The identical items
 * are emitted as FAQPage JSON-LD by the route head, so the rich result always
 * matches the visible page.
 */
export function VerticalFaqSection({ name, faqs }: { name: string; faqs: VerticalFaq[] }) {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				{/* Left — title */}
				<div className="lg:pt-2">
					<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
						FAQ
					</div>
					<h2 className="mt-3 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
						{name},
						<br />
						answered
					</h2>
					<p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						How AI employees work for teams like yours. Still curious?{" "}
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
				<Accordion type="single" collapsible defaultValue="item-0" className="w-full">
					{faqs.map((item, i) => (
						<AccordionItem
							key={item.question}
							value={`item-${i}`}
							className="border-ds-border"
						>
							<AccordionTrigger className="py-5 text-[1.0625rem] font-medium text-ds-text-primary hover:no-underline">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="max-w-xl text-[0.9375rem] leading-relaxed text-ds-text-secondary">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
