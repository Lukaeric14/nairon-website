import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GridCell, GridSection } from "./grid-system";

const FAQ_ITEMS = [
	{
		question: "What is the 1-Month AI Employee Pilot?",
		answer:
			"We build one AI employee for one workflow inside your business. The goal is not a demo. The goal is one measurable business result in the first month, with Nairon doing the build and your team helping us understand the real workflow.",
	},
	{
		question: "What do we pay in the first month?",
		answer:
			"For early pilot clients, the first month can be free except the Mac Mini/hardware cost and AI tokens. The exact contract can vary by client, but we make the costs clear before anything starts.",
	},
	{
		question: "We have spoken to AI companies before. Why is Nairon different?",
		answer:
			"Most AI companies stop at demos or one-off automations. We build an AI employee around a real job inside your business, deploy it into the way your team already works, and keep improving it after launch so it becomes useful in day-to-day operations.",
	},
	{
		question: "What does working with you actually look like?",
		answer:
			"We start by picking one workflow, one success metric, and the exact tools the AI employee needs. Then we build the first version, put it into the real workflow, test it under pressure, and keep refining it until it becomes dependable.",
	},
	{
		question: "Can this work with the tools our team already uses?",
		answer:
			"Usually yes. In most cases, we build around your current tools and workflows rather than asking your team to change everything. The goal is to make the AI employee useful inside your business as it exists today.",
	},
	{
		question: "How do you make sure this is safe and reliable?",
		answer:
			"We do not give AI open-ended access and hope for the best. We set clear boundaries around what it can do, keep humans involved for sensitive decisions, monitor what happens, and run the system on dedicated infrastructure so it stays stable and accountable.",
	},
	{
		question: "Is your team in-house?",
		answer:
			"Yes. Our team is in-house. As we grow, we hire from a broader network of AI engineers we already know to be talented and strong communicators, but the work stays under our team, standards, and accountability.",
	},
	{
		question: "How is pricing handled, including AI usage costs?",
		answer:
			"After the pilot, we agree the next contract based on the value created and the level of support you need. Some clients continue with Nairon as a hands-on AI build partner. Others may move to a lighter platform plan once Hive is ready. AI usage costs stay transparent and are billed separately when usage grows.",
	},
	{
		question: "Is WhatsApp or Telegram the final product?",
		answer:
			"No. For early clients, WhatsApp or Telegram can be the fastest way to start using the AI employee while Hive rolls out. Hive is the long-term workspace where your team, AI employees, workflows, knowledge, and activity live together.",
	},
	{
		question: "What happens to our team after the AI employee is live?",
		answer:
			"Your team does not get pushed out. Their role becomes higher leverage. Instead of doing every repetitive step themselves, they guide the system, review important decisions, and step in when human judgment is needed.",
	},
	{
		question: "How is this different from a normal automation?",
		answer:
			"A normal automation follows a fixed script. An AI employee works more like a role inside the business. It can handle context, deal with variation, and ask for help when something needs a human decision.",
	},
	{
		question: "Where does an AI employee fit inside a business?",
		answer:
			"It should sit inside a specific function where there is clear repeatable work to own. We do not position it like some all-knowing system at the top. We place it into a real lane with clear goals, limits, and human oversight.",
	},
	{
		question: "Can this still work if we handle sensitive data or have compliance requirements?",
		answer:
			"Yes, if the workflow is designed properly. We work around the real constraint instead of ignoring it, which means tighter permissions, human approvals where needed, and a setup that respects the boundaries your business already has to operate within.",
	},
];

export function AIFaqSection() {
	return (
		<div id="faq" className="scroll-mt-24 md:scroll-mt-28">
			<GridSection columns="1fr" border>
				<GridCell className="px-6 pt-8 pb-4 md:px-12 md:pt-14 md:pb-6">
					<div className="mb-4 flex items-center gap-3 md:mb-6">
						<div className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-xs font-medium uppercase tracking-[0.16em] text-[#5C584F]">
							FAQ
						</span>
					</div>
					<h2 className="text-3xl font-normal tracking-[-0.48px] text-[#1A1916] md:text-[48px] md:leading-[57.6px]">
						Top Questions Before{" "}
						<span className="font-serif italic text-[#C9A96E] text-[1.1em]">You Deploy</span>
					</h2>
				</GridCell>

				<GridCell className="px-6 pt-4 pb-10 md:px-12 md:pt-6 md:pb-14">
					<Accordion type="single" collapsible>
						<AccordionItem
							value="faq-all"
							className="rounded-[28px] border border-[#0C0C0C]/8 bg-[#0C0C0C]/[0.03] px-5 md:px-6"
						>
							<AccordionTrigger className="cursor-pointer py-5 text-left text-base font-medium text-[#1A1916] transition-none hover:no-underline md:py-6 md:text-[18px]">
								Frequently Asked Questions
							</AccordionTrigger>
							<AccordionContent className="pb-5 md:pb-6">
								<Accordion type="single" collapsible className="space-y-3">
									{FAQ_ITEMS.map((item, index) => (
										<AccordionItem
											key={item.question}
											value={`faq-${index}`}
											className="rounded-[20px] border border-[#0C0C0C]/8 bg-white/60 px-4 md:px-5"
										>
											<AccordionTrigger className="cursor-pointer py-4 text-left text-sm font-normal text-[#1A1916] transition-none hover:no-underline md:py-5 md:text-base">
												{item.question}
											</AccordionTrigger>
											<AccordionContent className="pb-4 text-sm leading-relaxed text-[#5C584F] md:pb-5 md:text-base">
												{item.answer}
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</GridCell>
			</GridSection>
		</div>
	);
}
