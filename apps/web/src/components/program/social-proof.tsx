import { useState, useEffect, useRef, useCallback } from "react";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	GlassCard,
	BodyText,
	colors,
} from "@/components/landing/primitives";
import { useViewMode } from "@/contexts/view-mode-context";
import { PARTNERS } from "@/data/landing";
import type { TestimonialData } from "@/data/programs";

function LogoMarquee() {
	const logos = [...PARTNERS, ...PARTNERS, ...PARTNERS];
	return (
		<div className="mt-8">
			<p className="text-sm text-[#1A1916]/40 mb-4">Partnered with</p>
			<div className="overflow-hidden">
				<div className="flex gap-12 animate-marquee">
					{logos.map((partner, i) => (
						<img
							key={`${partner.name}-${i}`}
							src={partner.logo}
							alt={partner.name}
							className="h-8 w-auto opacity-40 grayscale hover:opacity-70 transition-opacity shrink-0"
							loading="lazy"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function TestimonialCard({
	testimonial,
}: { testimonial: TestimonialData }) {
	return (
		<div>
			{/* Quote mark */}
			<span className="text-3xl text-green-400 leading-none block mb-3">
				&ldquo;
			</span>

			{/* Quote */}
			<p
				className={`text-lg md:text-xl leading-relaxed font-medium ${colors.text}`}
			>
				{testimonial.quote}
			</p>

			{/* Divider */}
			<div className="w-16 h-px bg-[#0C0C0C]/8 my-6" />

			{/* Attribution */}
			<div className="flex items-center gap-4">
				<img
					src={testimonial.image}
					alt={testimonial.name}
					className="w-12 h-12 rounded-full object-cover border-2 border-[#0C0C0C]/12"
					loading="lazy"
				/>
				<div>
					<p className={`text-base font-bold ${colors.text}`}>
						{testimonial.name}
					</p>
					<p className="text-sm text-[#1A1916]/40">
						{testimonial.role}
						{testimonial.company &&
							` at ${testimonial.company}`}
					</p>
				</div>
			</div>

			{/* Case study */}
			{testimonial.caseStudy && (
				<BodyText className="mt-6">{testimonial.caseStudy}</BodyText>
			)}
		</div>
	);
}

export function SocialProof({
	data,
}: {
	data: {
		engineer: TestimonialData;
		hiringManager: TestimonialData;
	};
}) {
	const { isEngineer, viewMode } = useViewMode();
	const [displayedTestimonial, setDisplayedTestimonial] =
		useState<TestimonialData>(data.engineer);
	const [isAnimating, setIsAnimating] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const prevModeRef = useRef(viewMode);

	const animateTransition = useCallback(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = container.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		const pixels: Array<{
			x: number;
			y: number;
			size: number;
			color: string;
			delay: number;
		}> = [];

		const spacing = 8;
		const pixelColors = [
			"rgba(34, 197, 94, 0.4)",
			"rgba(22, 163, 74, 0.3)",
			"rgba(74, 222, 128, 0.25)",
		];

		const cx = rect.width / 2;
		const cy = rect.height / 2;

		for (let x = 0; x < canvas.width; x += spacing) {
			for (let y = 0; y < canvas.height; y += spacing) {
				const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
				pixels.push({
					x,
					y,
					size: Math.random() > 0.5 ? 3 : 2,
					color: pixelColors[
						Math.floor(Math.random() * pixelColors.length)
					],
					delay: distance * 0.6,
				});
			}
		}

		let startTime: number | null = null;
		let animationId: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			let activePixels = 0;

			for (const pixel of pixels) {
				const adjustedTime = elapsed - pixel.delay;
				const duration = 600;

				if (adjustedTime > 0 && adjustedTime < duration) {
					activePixels++;
					const progress = adjustedTime / duration;
					let opacity: number;
					if (progress < 0.2) {
						opacity = progress / 0.2;
					} else if (progress < 0.5) {
						opacity = 1;
					} else {
						opacity = 1 - (progress - 0.5) / 0.5;
					}

					ctx.fillStyle = pixel.color;
					ctx.globalAlpha = opacity * 0.8;
					ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
				}
			}

			ctx.globalAlpha = 1;

			if (elapsed < 1500 || activePixels > 0) {
				animationId = requestAnimationFrame(animate);
			}
		};

		animationId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationId);
	}, []);

	useEffect(() => {
		if (prevModeRef.current === viewMode) return;
		prevModeRef.current = viewMode;

		setIsAnimating(true);
		const cleanup = animateTransition();

		// Swap content at midpoint
		const swapTimer = setTimeout(() => {
			setDisplayedTestimonial(
				isEngineer ? data.engineer : data.hiringManager,
			);
		}, 400);

		// End animation
		const endTimer = setTimeout(() => {
			setIsAnimating(false);
		}, 800);

		return () => {
			cleanup?.();
			clearTimeout(swapTimer);
			clearTimeout(endTimer);
		};
	}, [viewMode, isEngineer, data, animateTransition]);

	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
				<SectionTag label="Trusted By" />
				<SectionHeading className="text-2xl md:text-4xl">
					Real Engineers. <DimText>Real Results.</DimText>
				</SectionHeading>

				<div ref={containerRef} className="relative mt-8">
					{/* Pixel transition canvas */}
					<canvas
						ref={canvasRef}
						className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
						style={{
							opacity: isAnimating ? 1 : 0,
							transition: "opacity 0.2s ease-out",
						}}
					/>

					<GlassCard className="p-6 md:p-8">
						<TestimonialCard testimonial={displayedTestimonial} />
					</GlassCard>
				</div>

				<LogoMarquee />
			</div>
		</Section>
	);
}
