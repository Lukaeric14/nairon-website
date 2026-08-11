import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Prominent traveling-wave dot field behind the hero. Points sit on a
 * full-screen grid (clip space); a combination of sine waves sweeps across
 * them, driving brightness, point size, and a small vertical displacement so
 * the rows undulate like a wave surface. A gentle center mask keeps the
 * headline legible without killing the motion. GPU-only, client-mounted.
 */
export function HeroDots({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = ref.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
		camera.position.z = 1;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		const canvas = renderer.domElement;
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.display = "block";
		container.appendChild(canvas);

		// Full-screen grid of points in clip space [-1,1]².
		const GX = 116;
		const GY = 66;
		const count = GX * GY;
		const positions = new Float32Array(count * 3);
		let i = 0;
		for (let gy = 0; gy < GY; gy++) {
			for (let gx = 0; gx < GX; gx++) {
				positions[i * 3] = (gx / (GX - 1)) * 2 - 1;
				positions[i * 3 + 1] = (gy / (GY - 1)) * 2 - 1;
				positions[i * 3 + 2] = 0;
				i++;
			}
		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

		const uniforms = {
			uTime: { value: 0 },
			uColor: { value: new THREE.Color("#1378E6") },
			uColorBright: { value: new THREE.Color("#4A9CFF") },
			uSize: { value: Math.min(window.devicePixelRatio, 2) * 2.0 },
		};

		const mat = new THREE.ShaderMaterial({
			uniforms,
			transparent: true,
			depthWrite: false,
			vertexShader: `
				uniform float uTime;
				uniform float uSize;
				varying float vB;
				varying float vMask;
				void main(){
					float nx = position.x;
					float ny = position.y;
					// slow, gentle traveling wave
					float w = sin(nx * 2.4 - uTime * 0.45 + ny * 1.2)
							+ 0.5 * sin(ny * 3.0 - uTime * 0.3 + nx * 1.4);
					float crest = clamp(w * 0.5 + 0.5, 0.0, 1.0);
					vB = crest;
					// barely-there row undulation
					float disp = 0.015 * sin(nx * 2.4 - uTime * 0.45);
					// keep the center (headline) calmer
					float dist = length(vec2(nx, ny * 1.1));
					vMask = mix(0.25, 0.85, smoothstep(0.12, 0.8, dist));
					gl_PointSize = uSize * (0.75 + crest * 0.4);
					gl_Position = vec4(nx, ny + disp, 0.0, 1.0);
				}`,
			fragmentShader: `
				uniform vec3 uColor;
				uniform vec3 uColorBright;
				varying float vB;
				varying float vMask;
				void main(){
					vec2 c = gl_PointCoord - 0.5;
					float d = dot(c, c);
					if (d > 0.25) discard;
					float soft = smoothstep(0.25, 0.0, d);
					vec3 col = mix(uColor, uColorBright, vB);
					float a = soft * vMask * (0.09 + vB * 0.26);
					gl_FragColor = vec4(col, a);
				}`,
		});

		const points = new THREE.Points(geo, mat);
		scene.add(points);

		const clock = new THREE.Clock();
		let raf = 0;
		const render = () => {
			uniforms.uTime.value = clock.getElapsedTime();
			renderer.render(scene, camera);
			raf = requestAnimationFrame(render);
		};

		const resize = () => {
			renderer.setSize(container.clientWidth, container.clientHeight, false);
		};
		resize();
		render();

		const ro = new ResizeObserver(resize);
		ro.observe(container);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			geo.dispose();
			mat.dispose();
			renderer.dispose();
			canvas.remove();
		};
	}, []);

	return <div ref={ref} className={className} aria-hidden />;
}
