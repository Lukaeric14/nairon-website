"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DelicateAsciiDotsProps {
	backgroundColor?: string;
	textColor?: string;
	gridSize?: number;
	removeWaveLine?: boolean;
	animationSpeed?: number;
	className?: string;
	playOnHover?: boolean;
	burstDurationMs?: number;
}

interface Wave {
	x: number;
	y: number;
	frequency: number;
	amplitude: number;
	phase: number;
	speed: number;
}

interface GridCell {
	char: string;
	opacity: number;
}

const CHARS =
	"⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿⡁⡂⡃⡄⡅⡆⡇⡉⡊⡋⡌⡍⡎⡏⡑⡒⡓⡔⡕⡖⡗⡙⡚⡛⡜⡝⡞⡟⡡⡢⡣⡤⡥⡦⡧⡩⡪⡫⡬⡭⡮⡯⡱⡲⡳⡴⡵⡶⡷⡹⡺⡻⡼⡽⡾⡿⢁⢂⢃⢄⢅⢆⢇⢉⢊⢋⢌⢍⢎⢏⢑⢒⢓⢔⢕⢖⢗⢙⢚⢛⢜⢝⢞⢟⢡⢢⢣⢤⢥⢦⢧⢩⢪⢫⢬⢭⢮⢯⢱⢲⢳⢴⢵⢶⢷⢹⢺⢻⢼⢽⢾⢿";

export function DelicateAsciiDots({
	backgroundColor = "#FFF8FB",
	textColor = "217, 54, 127",
	gridSize = 56,
	removeWaveLine = true,
	animationSpeed = 0.75,
	className,
	playOnHover = false,
	burstDurationMs = 980,
}: DelicateAsciiDotsProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const mouseRef = useRef({ x: 0, y: 0, isDown: false });
	const wavesRef = useRef<Wave[]>([]);
	const timeRef = useRef(0);
	const animationFrameId = useRef<number | null>(null);
	const burstTimeoutRef = useRef<number | null>(null);
	const clickWaves = useRef<
		Array<{ x: number; y: number; time: number; intensity: number }>
	>([]);
	const dimensionsRef = useRef({ width: 0, height: 0 });
	const isAnimatingRef = useRef(!playOnHover);

	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const { width, height } = container.getBoundingClientRect();
		dimensionsRef.current = { width, height };

		const dpr = window.devicePixelRatio || 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext("2d");
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}, []);

	const handleMouseMove = useCallback((event: MouseEvent) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		mouseRef.current = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
			isDown: mouseRef.current.isDown,
		};
	}, []);

	const addClickWave = useCallback(
		(x: number, y: number, intensity = 2) => {
			const { width, height } = dimensionsRef.current;
			if (!width || !height) return;

			clickWaves.current.push({
				x: x / (width / gridSize),
				y: y / (height / gridSize),
				time: Date.now(),
				intensity,
			});

			const now = Date.now();
			clickWaves.current = clickWaves.current.filter(
				(wave) => now - wave.time < 4000,
			);
		},
		[gridSize],
	);

	const handleMouseDown = useCallback(
		(event: MouseEvent) => {
			mouseRef.current.isDown = true;
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			addClickWave(event.clientX - rect.left, event.clientY - rect.top);
		},
		[addClickWave],
	);

	const handleMouseUp = useCallback(() => {
		mouseRef.current.isDown = false;
	}, []);

	const getClickWaveInfluence = useCallback(
		(x: number, y: number, currentTime: number) => {
			let totalInfluence = 0;

			for (const wave of clickWaves.current) {
				const age = currentTime - wave.time;
				const maxAge = 4000;
				if (age >= maxAge) continue;

				const dx = x - wave.x;
				const dy = y - wave.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const waveRadius = (age / maxAge) * gridSize * 0.8;
				const waveWidth = gridSize * 0.15;

				if (Math.abs(distance - waveRadius) < waveWidth) {
					const waveStrength = (1 - age / maxAge) * wave.intensity;
					const proximityToWave =
						1 - Math.abs(distance - waveRadius) / waveWidth;
					totalInfluence +=
						waveStrength *
						proximityToWave *
						Math.sin((distance - waveRadius) * 0.5);
				}
			}

			return totalInfluence;
		},
		[gridSize],
	);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const currentTime = Date.now();
		if (isAnimatingRef.current) timeRef.current += animationSpeed * 0.016;

		const { width, height } = dimensionsRef.current;
		if (width === 0 || height === 0) return;

		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, width, height);

		const newGrid: (GridCell | null)[][] = Array.from({ length: gridSize }, () =>
			Array.from({ length: gridSize }, () => null),
		);

		const cellWidth = width / gridSize;
		const cellHeight = height / gridSize;
		const mouseGridX = mouseRef.current.x / cellWidth;
		const mouseGridY = mouseRef.current.y / cellHeight;
		const mouseWave: Wave = {
			x: mouseGridX,
			y: mouseGridY,
			frequency: 0.3,
			amplitude: 1,
			phase: timeRef.current * 2,
			speed: 1,
		};

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				let totalWave = 0;

				for (const wave of wavesRef.current.concat([mouseWave])) {
					const dx = x - wave.x;
					const dy = y - wave.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const falloff = 1 / (1 + dist * 0.1);
					totalWave +=
						Math.sin(
							dist * wave.frequency - timeRef.current * wave.speed + wave.phase,
						) *
						wave.amplitude *
						falloff;
				}

				totalWave += getClickWaveInfluence(x, y, currentTime);

				const mouseDistance = Math.sqrt(
					(x - mouseGridX) ** 2 + (y - mouseGridY) ** 2,
				);
				if (mouseDistance < gridSize * 0.3) {
					totalWave +=
						(1 - mouseDistance / (gridSize * 0.3)) *
						0.8 *
						Math.sin(timeRef.current * 3);
				}

				const normalizedWave = (totalWave + 2) / 4;
				if (Math.abs(totalWave) > 0.12) {
					const charIndex = Math.min(
						CHARS.length - 1,
						Math.max(0, Math.floor(normalizedWave * (CHARS.length - 1))),
					);
					newGrid[y][x] = {
						char: CHARS[charIndex] || CHARS[0],
						opacity: Math.min(0.96, Math.max(0.5, 0.48 + normalizedWave * 0.54)),
					};
				}
			}
		}

		const fontSize = Math.min(cellWidth, cellHeight) * 0.94;
		ctx.font = `${fontSize}px monospace`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const cell = newGrid[y][x];
				if (!cell) continue;

				ctx.fillStyle = `rgba(${textColor}, ${cell.opacity})`;
				ctx.fillText(
					cell.char,
					x * cellWidth + cellWidth / 2,
					y * cellHeight + cellHeight / 2,
				);
			}
		}

		if (!removeWaveLine) {
			for (const wave of clickWaves.current) {
				const age = currentTime - wave.time;
				const maxAge = 4000;
				if (age >= maxAge) continue;

				const progress = age / maxAge;
				const radius = progress * Math.min(width, height) * 0.5;
				const alpha = (1 - progress) * 0.3 * wave.intensity;

				ctx.beginPath();
				ctx.strokeStyle = `rgba(${textColor}, ${alpha})`;
				ctx.lineWidth = 1;
				ctx.arc(wave.x * cellWidth, wave.y * cellHeight, radius, 0, 2 * Math.PI);
				ctx.stroke();
			}
		}
	}, [
		animationSpeed,
		backgroundColor,
		getClickWaveInfluence,
		gridSize,
		removeWaveLine,
		textColor,
	]);

	const animate = useCallback(() => {
		draw();

		if (isAnimatingRef.current) {
			animationFrameId.current = requestAnimationFrame(animate);
		} else {
			animationFrameId.current = null;
		}
	}, [draw]);

	const startBurst = useCallback(() => {
		if (!playOnHover) return;

		isAnimatingRef.current = true;
		const { width, height } = dimensionsRef.current;
		addClickWave(width / 2, height / 2, 1.35);

		if (!animationFrameId.current) {
			animationFrameId.current = requestAnimationFrame(animate);
		}

		if (burstTimeoutRef.current) window.clearTimeout(burstTimeoutRef.current);
		burstTimeoutRef.current = window.setTimeout(() => {
			isAnimatingRef.current = false;
		}, burstDurationMs);
	}, [addClickWave, animate, burstDurationMs, playOnHover]);

	useEffect(() => {
		const waves: Wave[] = [];
		for (let i = 0; i < 4; i++) {
			waves.push({
				x: gridSize * (0.25 + Math.random() * 0.5),
				y: gridSize * (0.25 + Math.random() * 0.5),
				frequency: 0.2 + Math.random() * 0.3,
				amplitude: 0.5 + Math.random() * 0.5,
				phase: Math.random() * Math.PI * 2,
				speed: 0.5 + Math.random() * 0.5,
			});
		}

		wavesRef.current = waves;
		resizeCanvas();
		draw();

		const canvas = canvasRef.current;
		if (!canvas) return;

		window.addEventListener("resize", resizeCanvas);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mouseup", handleMouseUp);
		canvas.addEventListener("mouseenter", startBurst);

		if (!playOnHover) {
			animationFrameId.current = requestAnimationFrame(animate);
		}

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mouseup", handleMouseUp);
			canvas.removeEventListener("mouseenter", startBurst);

			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
				animationFrameId.current = null;
			}

			if (burstTimeoutRef.current) {
				window.clearTimeout(burstTimeoutRef.current);
				burstTimeoutRef.current = null;
			}

			timeRef.current = 0;
			clickWaves.current = [];
			wavesRef.current = [];
		};
	}, [
		animate,
		draw,
		gridSize,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		playOnHover,
		resizeCanvas,
		startBurst,
	]);

	return (
		<div
			ref={containerRef}
			className={cn("absolute inset-0 overflow-hidden", className)}
			style={{ backgroundColor }}
		>
			<canvas ref={canvasRef} className="block h-full w-full" />
		</div>
	);
}

export default DelicateAsciiDots;
