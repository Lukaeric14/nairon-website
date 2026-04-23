import { useEffect, useRef, useCallback } from "react";

/* ─── Star field canvas — interactive universe ─────────────── */

const STAR_COUNT = 1200;
const MOUSE_RADIUS = 200;
const FADE_IN_DURATION = 120; // frames to fade in (~2 seconds at 60fps)

interface Star {
	x: number;
	y: number;
	z: number; // depth (0 = far, 1 = near)
	baseX: number;
	baseY: number;
	size: number;
	twinkleSpeed: number;
	twinkleOffset: number;
	driftAngle: number;
	driftSpeed: number;
	driftRadius: number;
	wavePhase: number; // offset for global wave motion
	pulsePhase: number; // offset for slow size pulsing
}

function StarCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stars = useRef<Star[]>([]);
	const mouse = useRef({ x: -9999, y: -9999 });
	const animRef = useRef<number>(0);
	const time = useRef(0);
	const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

	const initStars = useCallback((width: number, height: number) => {
		const arr: Star[] = [];
		for (let i = 0; i < STAR_COUNT; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const z = Math.random();
			arr.push({
				x,
				y,
				z,
				baseX: x,
				baseY: y,
				size: z * 1.5 + 0.2,
				twinkleSpeed: Math.random() * 0.015 + 0.003,
				twinkleOffset: Math.random() * Math.PI * 2,
				driftAngle: Math.random() * Math.PI * 2,
				driftSpeed: Math.random() * 0.004 + 0.001,
				driftRadius: Math.random() * 12 + 3,
				wavePhase: Math.random() * Math.PI * 2,
				pulsePhase: Math.random() * Math.PI * 2,
			});
		}
		stars.current = arr;
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let w = 0;
		let h = 0;

		const resize = () => {
			const rect = canvas.parentElement?.getBoundingClientRect();
			if (!rect) return;
			w = rect.width;
			h = rect.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			initStars(w, h);
		};

		resize();
		window.addEventListener("resize", resize);

		const handleMouse = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		};

		const handleLeave = () => {
			mouse.current = { x: -9999, y: -9999 };
		};

		canvas.addEventListener("mousemove", handleMouse);
		canvas.addEventListener("mouseleave", handleLeave);

		const animate = () => {
			time.current += 1;
			ctx.clearRect(0, 0, w, h);

			const t = time.current;
			const mx = mouse.current.x;
			const my = mouse.current.y;
			const mouseActive = mx > -9000;

			// Smooth fade-in over first ~2 seconds
			const fadeIn = Math.min(t / FADE_IN_DURATION, 1);
			const fadeEased = fadeIn * fadeIn * (3 - 2 * fadeIn); // smoothstep

			// Nebula glow around cursor
			if (mouseActive) {
				const nebGrad = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 1.8);
				nebGrad.addColorStop(0, "rgba(201, 169, 110, 0.06)");
				nebGrad.addColorStop(0.4, "rgba(201, 169, 110, 0.03)");
				nebGrad.addColorStop(0.7, "rgba(140, 120, 80, 0.01)");
				nebGrad.addColorStop(1, "transparent");
				ctx.fillStyle = nebGrad;
				ctx.fillRect(0, 0, w, h);
			}

			// Slow global flow — a gentle current that all stars follow
			const globalFlowX = Math.sin(t * 0.0008) * 0.15;
			const globalFlowY = Math.cos(t * 0.0006) * 0.1;

			for (const s of stars.current) {
				// Twinkle
				const twinkle =
					0.35 +
					0.65 *
						((Math.sin(t * s.twinkleSpeed + s.twinkleOffset) +
							1) /
							2);

				// Gentle orbital drift — stars slowly orbit their base position
				const driftPhase = t * s.driftSpeed + s.driftAngle;
				const driftX = Math.cos(driftPhase) * s.driftRadius * s.z;
				const driftY = Math.sin(driftPhase) * s.driftRadius * s.z;

				// Slow wave motion — creates a gentle flowing/breathing effect
				const waveX = Math.sin(t * 0.002 + s.wavePhase + s.baseY * 0.003) * 3 * s.z;
				const waveY = Math.cos(t * 0.0015 + s.wavePhase + s.baseX * 0.002) * 2 * s.z;

				// Mouse gravitational pull — closer stars react more
				let drawX = s.x + driftX + waveX + globalFlowX;
				let drawY = s.y + driftY + waveY + globalFlowY;

				if (mouseActive) {
					const dx = s.x - mx;
					const dy = s.y - my;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < MOUSE_RADIUS * 2) {
						const strength = (1 - dist / (MOUSE_RADIUS * 2)) * s.z;
						// Pull toward cursor (gravity)
						drawX = s.x - dx * strength * 0.3;
						drawY = s.y - dy * strength * 0.3;
					}
				}

				// Base opacity — much softer, farther stars are dimmer
				const baseOpacity = (0.06 + s.z * 0.32) * fadeEased;
				let opacity = baseOpacity * twinkle;

				// Brighter near cursor
				if (mouseActive) {
					const dxD = drawX - mx;
					const dyD = drawY - my;
					const distD = Math.sqrt(dxD * dxD + dyD * dyD);
					if (distD < MOUSE_RADIUS * 1.5) {
						const glow = 1 - distD / (MOUSE_RADIUS * 1.5);
						opacity = Math.min(opacity + glow * 0.5, 1);
					}
				}

				// Subtle size pulsing
				const pulse = 1 + Math.sin(t * 0.008 + s.pulsePhase) * 0.12;
				const drawSize = s.size * pulse;

				ctx.beginPath();
				ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);

				// Color: mix of gold for near stars, white-blue for far stars
				if (s.z > 0.7) {
					ctx.fillStyle = `rgba(201, 169, 110, ${opacity})`;
				} else if (s.z > 0.4) {
					ctx.fillStyle = `rgba(220, 210, 190, ${opacity})`;
				} else {
					ctx.fillStyle = `rgba(180, 200, 220, ${opacity * 0.7})`;
				}
				ctx.fill();

				// Glow halo for bright near stars
				if (s.z > 0.85 && opacity > 0.5) {
					ctx.beginPath();
					ctx.arc(drawX, drawY, drawSize * 3, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(201, 169, 110, ${opacity * 0.08})`;
					ctx.fill();
				}
			}

			// Connection lines near cursor (constellation effect)
			if (mouseActive) {
				const nearStars: Star[] = [];
				for (const s of stars.current) {
					if (s.z < 0.5) continue; // only connect bright near stars
					const dx = s.x - mx;
					const dy = s.y - my;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < MOUSE_RADIUS * 1.8) {
						nearStars.push(s);
					}
				}

				for (let i = 0; i < nearStars.length; i++) {
					const a = nearStars[i];
					for (let j = i + 1; j < nearStars.length; j++) {
						const b = nearStars[j];
						const dxAB = a.x - b.x;
						const dyAB = a.y - b.y;
						const distAB = Math.sqrt(dxAB * dxAB + dyAB * dyAB);

						if (distAB < 100) {
							const lineOpacity = (1 - distAB / 100) * 0.12;
							ctx.beginPath();
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.strokeStyle = `rgba(201, 169, 110, ${lineOpacity})`;
							ctx.lineWidth = 0.5;
							ctx.stroke();
						}
					}
				}
			}

			animRef.current = requestAnimationFrame(animate);
		};

		animRef.current = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animRef.current);
			window.removeEventListener("resize", resize);
			canvas.removeEventListener("mousemove", handleMouse);
			canvas.removeEventListener("mouseleave", handleLeave);
		};
	}, [dpr, initStars]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full cursor-crosshair"
		/>
	);
}

/* ─── Hero section ─────────────────────────────────────────── */

export function UniverseHero() {
	return (
		<div className="relative min-h-[65vh] flex flex-col justify-center items-center text-center px-8 md:px-12 py-16 md:py-20 overflow-hidden">
			{/* Star field background */}
			<StarCanvas />

			{/* Subtle radial vignette */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(12,12,12,0.6) 70%, #0C0C0C 100%)",
				}}
			/>

			{/* Content */}
			<div className="relative z-10 pointer-events-none">
				{/* Badge */}
				<div className="flex items-center justify-center gap-2.5 mb-10">
					<span className="pointer-events-auto text-[#C9A96E] text-xs font-semibold tracking-wider uppercase bg-[#C9A96E]/10 border border-[#C9A96E]/20 px-3 py-1 rounded-full">
						For Engineers
					</span>
				</div>

				{/* Headline */}
				<h1 className="text-5xl md:text-[88px] md:leading-[92px] font-normal tracking-[-3px] text-[#1A1916] max-w-5xl">
					The Nairon
					<br />
					<span className="font-serif italic text-[#C9A96E]">
						Universe
					</span>
				</h1>

				{/* Subtitle */}
				<p className="mt-7 text-lg md:text-xl text-[#5C584F] max-w-xl mx-auto leading-relaxed">
					A daily feed, curated tool directory, and community for
					engineers building with AI. Powered by data from thousands
					of Flux assessments.
				</p>

				{/* CTAs */}
				<div className="flex flex-wrap justify-center gap-4 mt-10 pointer-events-auto">
					<span className="inline-flex items-center gap-2 bg-[#0C0C0C]/[0.06] text-[#5C584F] font-semibold text-base px-7 py-3.5 rounded-full cursor-not-allowed opacity-70">
						Coming Soon
					</span>
				</div>

				{/* Stats bar */}
				<div className="flex items-center justify-center gap-8 md:gap-12 mt-14 text-[#5C584F]/50 text-sm">
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
						<span>Updated daily</span>
					</div>
					<span>2,400+ engineers</span>
					<span>150+ AI tools tracked</span>
				</div>
			</div>
		</div>
	);
}
