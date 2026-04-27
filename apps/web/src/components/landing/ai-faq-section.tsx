import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
	VideoPlayer,
	VideoPlayerContent,
	VideoPlayerControlBar,
	VideoPlayerMuteButton,
	VideoPlayerPlayButton,
	VideoPlayerTimeDisplay,
	VideoPlayerTimeRange,
} from "@/components/kibo-ui/video-player";
import { GridCell, GridSection } from "./grid-system";

const FAQ_ITEMS = [
	{
		question: "What does month 1 look like with Nairon?",
		videoSrc: "/faq-videos/faq-1-mahan.mp4",
	},
	{
		question: "How does Nairon tackle security?",
		videoSrc: "/faq-videos/faq-1-obaid.mp4",
	},
	{
		question: "How much does it cost to work with Nairon?",
		videoSrc: "/faq-videos/faq-2-mahan.mp4",
	},
	{
		question: "How do you create AI employees for companies?",
		videoSrc: "/faq-videos/faq-2-obaid.mp4",
	},
	{
		question: "What's the investment structure for Nairon clients?",
		videoSrc: "/faq-videos/faq-3-mahan.mp4",
	},
	{
		question: "Why do I need to work with a company like Nairon?",
		videoSrc: "/faq-videos/faq-3-obaid.mp4",
	},
	{
		question: "What do touchpoints look like with Nairon?",
		videoSrc: "/faq-videos/faq-4-mahan.mp4",
	},
	{
		question: "How are costs allocated between us?",
		videoSrc: "/faq-videos/faq-4-obaid.mp4",
	},
	{
		question: "What do you need from me to get started?",
		videoSrc: "/faq-videos/faq-5-mahan.mp4",
	},
	{
		question: "What makes you different from other automation agencies?",
		videoSrc: "/faq-videos/faq-6-mahan.mp4",
	},
	{
		question: "What can AI employees do for my business?",
		videoSrc: "/faq-videos/faq-7-mahan.mp4",
	},
	{
		question: "What size businesses does your team work with?",
		videoSrc: "/faq-videos/faq-8-mahan.mp4",
	},
];

function FAQVideoPlayer({ src }: { src: string }) {
	return (
		<div
			className="mx-auto rounded-[30px] border border-white/8 bg-[#0C0C0C] p-2 shadow-[0_24px_70px_rgba(12,12,12,0.18)] ring-1 ring-[#0C0C0C]/8"
			style={{
				width: "min(100%, calc(min(620px, 68vh) * 9 / 16))",
			}}
		>
			<VideoPlayer className="relative block aspect-[9/16] overflow-hidden rounded-[24px] bg-[#0C0C0C] text-white">
				<VideoPlayerContent
					className="h-full w-full object-cover"
					playsInline
					preload="metadata"
					slot="media"
					src={src}
				/>
				<VideoPlayerControlBar className="absolute inset-x-0 bottom-0 z-10 h-12 border-t border-white/10 bg-gradient-to-t from-black/90 to-black/35 text-white backdrop-blur-sm">
					<VideoPlayerPlayButton className="p-2.5" />
					<VideoPlayerTimeRange className="p-2" />
					<VideoPlayerTimeDisplay className="min-w-[76px] p-2 text-xs" showDuration />
					<VideoPlayerMuteButton className="p-2.5" />
				</VideoPlayerControlBar>
			</VideoPlayer>
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
										<FAQVideoPlayer src={item.videoSrc} />
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
