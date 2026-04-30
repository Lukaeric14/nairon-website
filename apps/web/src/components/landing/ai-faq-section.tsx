import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GridCell, GridSection } from "./grid-system";

type FAQItem = {
	question: string;
	streamEmbedSrc: string;
};

const FAQ_ITEMS: FAQItem[] = [
	{
		question: "What does month 1 look like with Nairon?",
		streamEmbedSrc: "https://iframe.videodelivery.net/67a303a3e6b9f823e029a35e38e1b75a",
	},
	{
		question: "How does Nairon tackle security?",
		streamEmbedSrc: "https://iframe.videodelivery.net/502e5c688fe196cb853416a6737b994c",
	},
	{
		question: "How much does it cost to work with Nairon?",
		streamEmbedSrc: "https://iframe.videodelivery.net/831c2c3154357b8ef84b47369f9d4c07",
	},
	{
		question: "How do you create AI employees for companies?",
		streamEmbedSrc: "https://iframe.videodelivery.net/0a4b3985b998ea91d492db4833b0a7e2",
	},
	{
		question: "What's the investment structure for Nairon clients?",
		streamEmbedSrc: "https://iframe.videodelivery.net/3b63dbf13426df80f36f644dcee27632",
	},
	{
		question: "Why do I need to work with a company like Nairon?",
		streamEmbedSrc: "https://iframe.videodelivery.net/859ec3c300a985f40eb65a9b8483bcf0",
	},
	{
		question: "What do touchpoints look like with Nairon?",
		streamEmbedSrc: "https://iframe.videodelivery.net/6e3c270c8f0b4f655092e6aaa3890616",
	},
	{
		question: "How are costs allocated between us?",
		streamEmbedSrc: "https://iframe.videodelivery.net/cf92404d9def5c43085df531af676c30",
	},
	{
		question: "What do you need from me to get started?",
		streamEmbedSrc: "https://iframe.videodelivery.net/37c52b8c9cdfa97115c311f203331db1",
	},
	{
		question: "What makes you different from other automation agencies?",
		streamEmbedSrc: "https://iframe.videodelivery.net/c30804c9a9c097d64b03f5052ed2db31",
	},
	{
		question: "What can AI employees do for my business?",
		streamEmbedSrc: "https://iframe.videodelivery.net/5a9d27bf76be1a4402b82a82730b9b99",
	},
	{
		question: "What size businesses does your team work with?",
		streamEmbedSrc: "https://iframe.videodelivery.net/f3391bf010e8589416350798d5dfe9b4",
	},
];

function FAQVideoPlayer({ item }: { item: FAQItem }) {
	return (
		<div
			className="mx-auto rounded-[30px] border border-white/8 bg-[#0C0C0C] p-2 shadow-[0_24px_70px_rgba(12,12,12,0.18)] ring-1 ring-[#0C0C0C]/8"
			style={{
				width: "min(100%, calc(min(620px, 68vh) * 9 / 16))",
			}}
		>
			<iframe
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="block aspect-[9/16] w-full overflow-hidden rounded-[24px] border-0 bg-[#0C0C0C]"
				src={item.streamEmbedSrc}
				title={item.question}
			/>
		</div>
	);
}

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

				<GridCell className="px-4 pt-4 pb-10 sm:px-6 md:px-12 md:pt-6 md:pb-14">
					<div className="mx-auto w-full max-w-3xl rounded-[24px] border border-[#0C0C0C]/8 bg-[#0C0C0C]/[0.03] p-3 sm:p-4 md:rounded-[28px] md:p-5">
						<h3 className="px-2 pt-2 pb-4 text-lg font-medium text-[#1A1916] sm:px-3 md:px-4 md:pt-3 md:pb-5 md:text-[22px]">
							Frequently Asked Questions
						</h3>
						<Accordion type="single" collapsible className="space-y-3">
							{FAQ_ITEMS.map((item, index) => (
								<AccordionItem
									key={item.question}
									value={`faq-${index}`}
									className="rounded-[18px] border border-[#0C0C0C]/8 bg-white/70 px-4 shadow-sm shadow-black/[0.02] md:rounded-[20px] md:px-5"
								>
									<AccordionTrigger className="min-h-16 cursor-pointer gap-4 py-4 text-left text-sm font-normal text-[#1A1916] transition-none hover:no-underline md:py-5 md:text-base [&>svg]:shrink-0">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="pb-4 md:pb-5">
										<FAQVideoPlayer item={item} />
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
