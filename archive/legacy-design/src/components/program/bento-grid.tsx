import {
	MapPin,
	Cpu,
	Users,
	Handshake,
	TrendingUp,
	MessageSquare,
	Code2,
	Briefcase,
	Rocket,
	Globe,
} from "lucide-react";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	GlassCard,
	CardTitle,
	BodyText,
	colors,
} from "@/components/landing/primitives";
import { PARTNERS } from "@/data/landing";
import type { BentoCardData } from "@/data/programs";

const iconMap: Record<string, React.ElementType> = {
	MapPin,
	Cpu,
	Users,
	Handshake,
	TrendingUp,
	MessageSquare,
	Code2,
	Briefcase,
	Rocket,
	Globe,
};

function ChartVisual() {
	return (
		<div className="mt-6 rounded-xl overflow-hidden bg-[#0C0C0C]/[0.02] p-4 min-h-[140px] relative">
			{/* Grid background */}
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(12, 12, 12, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(12, 12, 12, 0.5) 1px, transparent 1px)",
					backgroundSize: "20px 20px",
				}}
			/>
			{/* Chart line */}
			<svg
				viewBox="0 0 300 100"
				className="w-full h-full relative z-10"
				preserveAspectRatio="none"
			>
				<defs>
					<linearGradient
						id="chartGradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor="#22c55e" />
						<stop offset="100%" stopColor="#4ade80" />
					</linearGradient>
					<linearGradient
						id="chartFill"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%"
					>
						<stop
							offset="0%"
							stopColor="#22c55e"
							stopOpacity="0.15"
						/>
						<stop
							offset="100%"
							stopColor="#22c55e"
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>
				<path
					d="M0 80 Q50 75, 80 60 Q120 40, 160 45 Q200 50, 230 30 Q260 15, 300 10"
					fill="none"
					stroke="url(#chartGradient)"
					strokeWidth="2.5"
				/>
				<path
					d="M0 80 Q50 75, 80 60 Q120 40, 160 45 Q200 50, 230 30 Q260 15, 300 10 L300 100 L0 100 Z"
					fill="url(#chartFill)"
				/>
				{/* Glow dot at peak */}
				<circle cx="300" cy="10" r="4" fill="#4ade80" />
				<circle
					cx="300"
					cy="10"
					r="8"
					fill="#4ade80"
					opacity="0.3"
				/>
			</svg>
		</div>
	);
}

function AvatarsVisual() {
	const avatars = [
		"/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		"/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		"/assets/framer/VkXk2rDNGzBySnbTZ9H4v4dMdE.jpeg",
	];
	return (
		<div className="mt-6 flex items-center gap-1">
			{avatars.map((src, i) => (
				<img
					key={i}
					src={src}
					alt=""
					className="w-10 h-10 rounded-full border-2 border-black -ml-2 first:ml-0 object-cover"
					loading="lazy"
				/>
			))}
			<span className="text-[#1A1916]/40 text-sm ml-2">+5 more</span>
		</div>
	);
}

function LogosVisual() {
	return (
		<div className="mt-6 grid grid-cols-3 gap-3">
			{PARTNERS.slice(0, 3).map((partner) => (
				<div
					key={partner.name}
					className="bg-[#0C0C0C]/[0.02] rounded-lg p-2 flex items-center justify-center"
				>
					<img
						src={partner.logo}
						alt={partner.name}
						className="h-6 w-auto opacity-40 grayscale"
						loading="lazy"
					/>
				</div>
			))}
		</div>
	);
}

function CommunityVisual() {
	return (
		<div className="mt-6 flex flex-col gap-2">
			{[
				{ text: "Just shipped the RAG system", align: "self-start" },
				{ text: "Nice! How's latency?", align: "self-end" },
				{ text: "Sub 200ms", align: "self-start" },
			].map((msg) => (
				<div
					key={msg.text}
					className={`glass-card rounded-xl px-3 py-2 max-w-[70%] ${msg.align}`}
				>
					<span className="text-xs text-[#1A1916]/60">{msg.text}</span>
				</div>
			))}
		</div>
	);
}

function CodeVisual() {
	return (
		<div className="mt-6 rounded-xl overflow-hidden bg-[#0C0C0C]/[0.02] p-4 min-h-[140px] font-mono text-xs text-[#1A1916]/30 space-y-1">
			<div>
				<span className="text-green-400/50">const</span> agent ={" "}
				<span className="text-green-400/50">await</span>{" "}
				createAgent({"{"})
			</div>
			<div className="pl-4">
				model: <span className="text-amber-400/50">"claude-4"</span>,
			</div>
			<div className="pl-4">
				tools: [search, code, deploy],
			</div>
			<div>{"}"});</div>
			<div className="mt-2">
				<span className="text-green-400/50">const</span> result ={" "}
				<span className="text-green-400/50">await</span>{" "}
				agent.run(task);
			</div>
		</div>
	);
}

function DefaultVisual() {
	return (
		<div className="mt-6 rounded-xl bg-[#0C0C0C]/[0.02] min-h-[80px]" />
	);
}

function getVisual(visualType: BentoCardData["visualType"]) {
	switch (visualType) {
		case "chart":
			return <ChartVisual />;
		case "avatars":
			return <AvatarsVisual />;
		case "logos":
			return <LogosVisual />;
		case "community":
			return <CommunityVisual />;
		case "code":
			return <CodeVisual />;
		default:
			return <DefaultVisual />;
	}
}

function VisualCard({ card }: { card: BentoCardData }) {
	const Icon = iconMap[card.icon] || MapPin;
	return (
		<GlassCard
			className={`p-6 md:p-8 ${card.size === "large" ? "lg:p-10 md:col-span-2" : ""}`}
		>
			<Icon className="w-6 h-6 text-[#1A1916]/70 mb-4" />
			<CardTitle>{card.title}</CardTitle>
			<BodyText className="mt-2">{card.description}</BodyText>
			{card.footnote && (
				<p className="text-xs text-[#1A1916]/40 italic mt-3">
					{card.footnote}
				</p>
			)}
			{getVisual(card.visualType)}
		</GlassCard>
	);
}

export function BentoGrid({ cards }: { cards: BentoCardData[] }) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
				<SectionTag label="What You Get" />
				<SectionHeading className="mb-10 text-2xl md:text-4xl">
					Everything You Need <DimText>to Succeed</DimText>
				</SectionHeading>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((card) => (
						<VisualCard key={card.title} card={card} />
					))}
				</div>
			</div>
		</Section>
	);
}
