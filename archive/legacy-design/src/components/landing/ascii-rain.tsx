import { useEffect, useState } from "react";

const COLS = 80;
const ROWS = 48;
// Chars from light → dark. The denser the source pixel, the further right we pick.
const RAMP = " .·:-=+*#%@";
// Chars that shimmer in place of the densest cells.
const SHIMMER = "01{}<>[]()/\\|+*#";

/**
 * Draw a stylized human-profile silhouette facing right and return a
 * COLS*ROWS density array in [0, 1].
 */
function buildDensityMap(): Float32Array {
	const scale = 4; // oversample for smoother edges
	const w = COLS * scale;
	const h = ROWS * scale;
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) return new Float32Array(COLS * ROWS);

	ctx.fillStyle = "#000";
	ctx.translate(w / 2, h / 2);

	// Head (skull)
	ctx.beginPath();
	ctx.ellipse(-w * 0.04, -h * 0.08, w * 0.18, h * 0.24, 0, 0, Math.PI * 2);
	ctx.fill();

	// Jaw/chin — slight forward extension
	ctx.beginPath();
	ctx.ellipse(w * 0.0, h * 0.08, w * 0.14, h * 0.18, 0, 0, Math.PI * 2);
	ctx.fill();

	// Nose bump
	ctx.beginPath();
	ctx.ellipse(w * 0.12, -h * 0.02, w * 0.04, h * 0.05, 0, 0, Math.PI * 2);
	ctx.fill();

	// Neck
	ctx.fillRect(-w * 0.06, h * 0.22, w * 0.16, h * 0.25);

	// Shoulders
	ctx.beginPath();
	ctx.ellipse(0, h * 0.48, w * 0.34, h * 0.16, 0, 0, Math.PI * 2);
	ctx.fill();

	// Cut out eye socket for detail
	ctx.globalCompositeOperation = "destination-out";
	ctx.beginPath();
	ctx.ellipse(w * 0.07, -h * 0.08, w * 0.018, h * 0.015, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.globalCompositeOperation = "source-over";

	ctx.setTransform(1, 0, 0, 1, 0, 0);

	const img = ctx.getImageData(0, 0, w, h).data;
	const out = new Float32Array(COLS * ROWS);
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			let sum = 0;
			let count = 0;
			for (let dy = 0; dy < scale; dy++) {
				for (let dx = 0; dx < scale; dx++) {
					const px = (c * scale + dx + (r * scale + dy) * w) * 4;
					sum += img[px + 3] / 255; // alpha = filled
					count++;
				}
			}
			out[r * COLS + c] = sum / count;
		}
	}
	return out;
}

export function AsciiRain() {
	const [frame, setFrame] = useState<string>("");

	useEffect(() => {
		const density = buildDensityMap();
		let tick = 0;

		const render = () => {
			tick++;
			const lines: string[] = [];
			for (let r = 0; r < ROWS; r++) {
				let line = "";
				for (let c = 0; c < COLS; c++) {
					const d = density[r * COLS + c];
					if (d < 0.08) {
						line += " ";
						continue;
					}
					// Map density to ramp character for a clean silhouette baseline.
					const idx = Math.min(
						RAMP.length - 1,
						Math.floor(d * (RAMP.length - 0.001)),
					);
					// Top ~20% of density cells shimmer — swap to a random glyph
					// occasionally so the portrait feels alive without being noisy.
					if (d > 0.75 && Math.random() < 0.18) {
						line += SHIMMER[(Math.random() * SHIMMER.length) | 0];
					} else {
						line += RAMP[idx];
					}
				}
				lines.push(line);
			}
			setFrame(lines.join("\n"));
		};

		render();
		const id = window.setInterval(render, 220);
		return () => window.clearInterval(id);
	}, []);

	return (
		<pre
			aria-hidden
			className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center overflow-hidden font-mono text-[9px] leading-[10px] text-[#1A1916] md:text-[11px] md:leading-[12px] whitespace-pre select-none"
		>
			{frame}
		</pre>
	);
}
