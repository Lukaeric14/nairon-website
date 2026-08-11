import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { MessageSquare, Wrench, CheckCircle2, Sparkles } from "lucide-react";
import { createTimeline, utils } from "animejs";
import type { Timeline, JSAnimation } from "animejs";

type CommandStep = {
	label: string;
	detail: string;
};

type DiagramNode = {
	id: string;
	x: number;
	y: number;
	label?: string;
	size?: "sm" | "md" | "lg";
	render?: "node" | "dot" | "anchor" | "database";
	labelSide?: "top" | "right" | "bottom" | "left";
	accent?: "success";
};

type DiagramConnection = {
	from: string;
	to: string;
	dashed?: boolean;
	route?: "orthogonal" | "direct" | "arc-cw" | "arc-ccw";
	label?: string;
	labelX?: number;
	labelY?: number;
};

type CommandItem = {
	number: string;
	title: string;
	description: string;
	command: string;
	icon: ComponentType<{ className?: string }>;
	color: string;
	scenarioTitle: string;
	scenarioSubtitle: string;
	scenarioSteps: CommandStep[];
	nodes: DiagramNode[];
	connections: DiagramConnection[];
};

const commands: CommandItem[] = [
	{
		number: "1",
		title: "Detect state",
		description: "Flux reads .flux first, so the agent knows whether to prime, resume, review, or start fresh.",
		command: "Read repo state before acting",
		icon: MessageSquare,
		color: "text-blue-400",
		scenarioTitle: "Deterministic workflow routing",
		scenarioSubtitle: "Flux treats .flux as the canonical workflow memory, then routes the agent based on what is already in motion.",
		scenarioSteps: [
			{ label: "Session", detail: "A new message or resumed session enters Flux" },
			{ label: "Read .flux", detail: "Flux checks prime state, active objective, and next action" },
			{ label: "Route", detail: "Prime first, resume work, resume scope, or start fresh" },
			{ label: "Re-anchor", detail: "The agent continues with the correct context instead of drifting" },
		],
		nodes: [
			{ id: "session", x: 78, y: 84, label: "Session", size: "sm" },
			{ id: "state", x: 210, y: 84, label: ".flux", size: "md" },
			{ id: "prime", x: 374, y: 40, label: "Prime", size: "sm" },
			{ id: "resume", x: 374, y: 128, label: "Resume", size: "md" },
			{ id: "fresh", x: 374, y: 196, label: "Fresh", size: "sm" },
			{ id: "aligned", x: 560, y: 84, label: "Aligned", size: "lg" },
		],
		connections: [
			{ from: "session", to: "state" },
			{ from: "state", to: "prime", route: "direct" },
			{ from: "state", to: "resume", route: "direct" },
			{ from: "state", to: "fresh", route: "direct" },
			{ from: "prime", to: "aligned", route: "direct" },
			{ from: "resume", to: "aligned", route: "direct" },
			{ from: "fresh", to: "aligned", route: "direct" },
		],
	},
	{
		number: "2",
		title: "Prime first",
		description: "Flux treats prime as the first real workflow step in a repository, not an optional extra.",
		command: "Prime before scope or code",
		icon: Wrench,
		color: "text-amber-400",
		scenarioTitle: "Prime-first onboarding",
		scenarioSubtitle: "After install and setup, Flux checks whether the repo has been primed. If not, prime runs before any other workflow route.",
		scenarioSteps: [
			{ label: "Install", detail: "Flux is added to the current agent environment" },
			{ label: "Setup", detail: "Flux prepares repo-local state and instructions" },
			{ label: "Prime check", detail: "Flux asks whether this repo has been primed yet" },
			{ label: "Prime", detail: "The audit runs before feature, bug, or refactor work begins" },
		],
		nodes: [
			{ id: "install", x: 72, y: 84, label: "Install", size: "sm" },
			{ id: "setup", x: 192, y: 84, label: "Setup", size: "md" },
			{ id: "check", x: 324, y: 84, label: "Prime?", size: "md" },
			{ id: "prime-run", x: 456, y: 84, label: "Prime", size: "md" },
			{ id: "ready", x: 576, y: 84, label: "Ready", size: "sm" },
			{ id: "already", x: 456, y: 168, label: "Already", size: "sm" },
		],
		connections: [
			{ from: "install", to: "setup" },
			{ from: "setup", to: "check" },
			{ from: "check", to: "prime-run", label: "no", labelX: 392, labelY: 68 },
			{ from: "prime-run", to: "ready" },
			{ from: "check", to: "already", label: "yes", labelX: 388, labelY: 136 },
			{ from: "already", to: "ready", route: "direct" },
		],
	},
	{
		number: "3",
		title: "Route by intent",
		description: "Developers talk naturally; Flux maps the message to the correct next move.",
		command: "Intent + state -> correct route",
		icon: CheckCircle2,
		color: "text-emerald-400",
		scenarioTitle: "Natural-language routing",
		scenarioSubtitle: "The user should be able to say what they want in plain English. Flux combines that request with repo state and chooses the right path.",
		scenarioSteps: [
			{ label: "Intent", detail: "The user says build, fix, refactor, or continue" },
			{ label: "Check state", detail: "Flux reads the active objective and workflow phase" },
			{ label: "Choose route", detail: "Flux sends the agent to scope, work, or review" },
			{ label: "Stay aligned", detail: "The session keeps the right context instead of drifting" },
		],
		nodes: [
			{ id: "intent", x: 74, y: 84, label: "Intent", size: "sm" },
			{ id: "state-check", x: 214, y: 84, label: "State", size: "md" },
			{ id: "scope", x: 394, y: 40, label: "Scope", size: "sm" },
			{ id: "work", x: 394, y: 128, label: "Work", size: "md" },
			{ id: "review", x: 394, y: 196, label: "Review", size: "sm" },
			{ id: "aligned-route", x: 572, y: 84, label: "Aligned", size: "lg" },
		],
		connections: [
			{ from: "intent", to: "state-check" },
			{ from: "state-check", to: "scope", route: "direct" },
			{ from: "state-check", to: "work", route: "direct" },
			{ from: "state-check", to: "review", route: "direct" },
			{ from: "scope", to: "aligned-route", route: "direct" },
			{ from: "work", to: "aligned-route", route: "direct" },
			{ from: "review", to: "aligned-route", route: "direct" },
		],
	},
	{
		number: "4",
		title: "Close the loop",
		description: "Flux keeps review, improvement, and reflection tied back to the same workflow state.",
		command: "Work -> review -> improve -> reflect",
		icon: Sparkles,
		color: "text-cyan-400",
		scenarioTitle: "Continuous agent loop",
		scenarioSubtitle: "Flux is not just a planner. It keeps the full build-review-improve cycle attached to the same objective over time.",
		scenarioSteps: [
			{ label: "Work", detail: "Implementation happens with the active objective loaded" },
			{ label: "Review", detail: "Checks and reviews validate what changed" },
			{ label: "Improve", detail: "Flux learns where the workflow can get stronger" },
			{ label: "Reflect", detail: "The next session starts with better state and context" },
		],
		nodes: [
			{ id: "work-loop", x: 94, y: 90, label: "Work", size: "md" },
			{ id: "review-loop", x: 254, y: 90, label: "Review", size: "md" },
			{ id: "improve-loop", x: 414, y: 90, label: "Improve", size: "md" },
			{ id: "memory", x: 414, y: 28, label: ".flux", render: "database" },
			{ id: "reflect-loop", x: 574, y: 90, label: "Reflect", size: "md" },
			{ id: "loop-back-1", x: 574, y: 168, render: "anchor" },
			{ id: "loop-back-2", x: 94, y: 168, render: "anchor" },
		],
		connections: [
			{ from: "work-loop", to: "review-loop" },
			{ from: "review-loop", to: "improve-loop" },
			{ from: "memory", to: "improve-loop", dashed: true, route: "direct" },
			{ from: "improve-loop", to: "reflect-loop" },
			{ from: "reflect-loop", to: "loop-back-1", route: "direct" },
			{ from: "loop-back-1", to: "loop-back-2", route: "direct" },
			{ from: "loop-back-2", to: "work-loop", route: "direct" },
		],
	},
];

type Animation = Timeline | JSAnimation;

// Circuit-style path calculation (right angles)
function calculatePath(from: DiagramNode, to: DiagramNode, _nodeMap: Map<string, DiagramNode>): string {
	const fromSize = from.render === "anchor" ? 0 : from.render === "dot" ? 7 : from.render === "database" ? 28 : from.size === "lg" ? 34 : from.size === "sm" ? 18 : 25;
	const toSize = to.render === "anchor" ? 0 : to.render === "dot" ? 7 : to.render === "database" ? 28 : to.size === "lg" ? 34 : to.size === "sm" ? 18 : 25;

	const dx = to.x - from.x;
	const dy = to.y - from.y;

	let startX = from.x;
	let startY = from.y;
	let endX = to.x;
	let endY = to.y;

	// Create circuit-like paths with right angles
	if (Math.abs(dx) > Math.abs(dy)) {
		startX = from.x + (dx > 0 ? fromSize : -fromSize);
		endX = to.x + (dx > 0 ? -toSize : toSize);
		const midX = from.x + dx / 2;
		return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
	} else {
		startY = from.y + (dy > 0 ? fromSize : -fromSize);
		endY = to.y + (dy > 0 ? -toSize : toSize);
		const midY = from.y + dy / 2;
		return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`;
	}
}

function calculateDirectPath(from: DiagramNode, to: DiagramNode): string {
	const fromSize = from.render === "anchor" ? 0 : from.render === "dot" ? 7 : from.render === "database" ? 28 : from.size === "lg" ? 34 : from.size === "sm" ? 18 : 25;
	const toSize = to.render === "anchor" ? 0 : to.render === "dot" ? 7 : to.render === "database" ? 28 : to.size === "lg" ? 34 : to.size === "sm" ? 18 : 25;

	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const distance = Math.hypot(dx, dy) || 1;

	const ux = dx / distance;
	const uy = dy / distance;

	const startX = from.x + ux * fromSize;
	const startY = from.y + uy * fromSize;
	const endX = to.x - ux * toSize;
	const endY = to.y - uy * toSize;

	return `M ${startX} ${startY} L ${endX} ${endY}`;
}

// Curved arc path for circular loops
function calculateArcPath(from: DiagramNode, to: DiagramNode, clockwise: boolean): string {
	const fromSize = from.render === "anchor" ? 0 : from.render === "dot" ? 7 : from.render === "database" ? 28 : from.size === "lg" ? 34 : from.size === "sm" ? 18 : 25;
	const toSize = to.render === "anchor" ? 0 : to.render === "dot" ? 7 : to.render === "database" ? 28 : to.size === "lg" ? 34 : to.size === "sm" ? 18 : 25;

	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const distance = Math.hypot(dx, dy) || 1;

	const ux = dx / distance;
	const uy = dy / distance;

	const startX = from.x + ux * fromSize;
	const startY = from.y + uy * fromSize;
	const endX = to.x - ux * toSize;
	const endY = to.y - uy * toSize;

	// Arc radius based on distance
	const radius = distance * 0.6;
	const sweep = clockwise ? 1 : 0;

	return `M ${startX} ${startY} A ${radius} ${radius} 0 0 ${sweep} ${endX} ${endY}`;
}

function CircuitDiagram({ item }: { item: CommandItem }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const animationsRef = useRef<Animation[]>([]);
	const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

	const nodeMap = useMemo(() => new Map(item.nodes.map((n) => [n.id, n])), [item.nodes]);

	// Calculate paths
	const pathEntries = useMemo(() => {
		return item.connections.map((conn) => {
			const from = nodeMap.get(conn.from);
			const to = nodeMap.get(conn.to);
			if (!from || !to) {
				return { d: "", dashed: Boolean(conn.dashed), label: conn.label, labelX: conn.labelX, labelY: conn.labelY };
			}
			let d: string;
			if (conn.route === "direct") {
				d = calculateDirectPath(from, to);
			} else if (conn.route === "arc-cw") {
				d = calculateArcPath(from, to, true);
			} else if (conn.route === "arc-ccw") {
				d = calculateArcPath(from, to, false);
			} else {
				d = calculatePath(from, to, nodeMap);
			}
			return {
				d,
				dashed: Boolean(conn.dashed),
				label: conn.label,
				labelX: conn.labelX,
				labelY: conn.labelY,
			};
		});
	}, [item.connections, nodeMap]);

	useEffect(() => {
		if (!rootRef.current) return;
		const root = rootRef.current;

		const nodes = root.querySelectorAll<SVGGElement>(".circuit-node");
		const nodeShells = root.querySelectorAll<SVGElement>(".circuit-node-shell");
		const nodeLabels = root.querySelectorAll<SVGTextElement>(".circuit-node-label");
		const traces = root.querySelectorAll<SVGPathElement>(".circuit-trace");
		const pulses = root.querySelectorAll<SVGPathElement>(".circuit-pulse");
		const rows = root.querySelectorAll<HTMLDivElement>(".flow-row");

		// Initial states - traces visible from start, only pulses animate
		utils.set(nodes, { opacity: 1, scale: 1 });
		utils.set(nodeShells, { strokeOpacity: 0.35, fillOpacity: 0.08 });
		utils.set(nodeLabels, { opacity: 0.72 });
		utils.set(traces, { strokeDashoffset: 0 }); // Traces visible immediately
		utils.set(pulses, { strokeDashoffset: 500, opacity: 0.2 });
		utils.set(rows, { opacity: 0.4 });

		setActiveNodeIndex(-1);

		const tl = createTimeline({
			defaults: { ease: "inOutSine" },
			loop: true,
		});

		const stepSchedule = {
			Scope: [0, 1800, 3600, 5400],
			Work: [0, 1600, 2000, 7800],  // Implement, Verify, Diagnose (3 loops), Commit
			Review: [0, 900, 1400, 9000],  // Submit, Adversarial, Consensus (loops), Ship
			Improve: [0, 1200, 2400],  // Analyze, Match, Install (then loops)
		} as const;

		const schedule = stepSchedule[item.title as keyof typeof stepSchedule] ?? [0, 900, 1800, 2700];

		const animatePulseSequence = (
			indices: number[],
			start: number,
			spacing: number,
			duration: number,
			reverse = false,
		) => {
			indices.forEach((idx, order) => {
				const pulse = pulses[idx];
				if (!pulse) return;
				tl.add(
					pulse,
					{
						opacity: [0.15, 0.95, 0.2],
						strokeDashoffset: reverse ? [-500, 500] : [500, -500],
						duration,
						ease: "linear",
					},
					start + order * spacing,
				);
			});
		};

		schedule.forEach((at, i) => {
			tl.add(root, {
				duration: 50,
				onBegin: () => setActiveNodeIndex(i),
			}, at);
		});

		// Traces are visible from start - no drawing animation needed

		if (item.title !== "Scope") {
			// Baseline pulse animation
			pulses.forEach((pulse, i) => {
				tl.add(pulse, {
					opacity: [0.2, 0.9, 0.25],
					strokeDashoffset: [500, -500],
					duration: item.title === "Work" ? 1350 : 1500,
					ease: "linear",
				}, 400 + i * 170);
			});
		}

		// Static-node emphasis: only shell/label intensity changes
		nodeShells.forEach((shell, i) => {
			tl.add(shell, {
				strokeOpacity: [0.35, 0.78, 0.35],
				fillOpacity: [0.08, 0.18, 0.08],
				duration: 700,
				ease: "inOutQuad",
			}, 250 + i * 200);
		});

		nodeLabels.forEach((label, i) => {
			tl.add(label, {
				opacity: [0.72, 1, 0.72],
				duration: 650,
			}, 300 + i * 200);
		});

		// Command-specific choreography (nodes remain static)
		if (item.title === "Scope") {
			animatePulseSequence([0, 2], 700, 440, 1700);
			animatePulseSequence([1, 3], 2500, 440, 1650);
			animatePulseSequence([4], 4200, 1, 1800);
			animatePulseSequence([5, 7], 6100, 440, 1700);
			animatePulseSequence([6, 8], 7900, 440, 1650);
		}

		if (item.title === "Work") {
			// Start: task → impl → verify
			animatePulseSequence([0, 1], 420, 360, 1100);
			// Fail loop runs 3 times before passing
			animatePulseSequence([4, 5, 6, 7], 2000, 280, 900);  // Loop 1
			animatePulseSequence([4, 5, 6, 7], 3800, 280, 900);  // Loop 2
			animatePulseSequence([4, 5, 6, 7], 5600, 280, 900);  // Loop 3
			// Finally pass: verify → commit → done
			animatePulseSequence([2, 3], 7800, 400, 1100);
		}

		if (item.title === "Review") {
			// Fan out: Submit → 2 reviewers
			animatePulseSequence([0, 1], 200, 150, 800);
			// Through waypoints to consensus
			animatePulseSequence([2, 3, 4, 5], 1100, 100, 700);
			// First verdict: fail → fix → along bottom → back to submit
			animatePulseSequence([8, 9, 10], 2200, 250, 800);
			// Second review cycle
			animatePulseSequence([0, 1], 3700, 150, 800);
			animatePulseSequence([2, 3, 4, 5], 4600, 100, 700);
			animatePulseSequence([8, 9, 10], 5700, 250, 800);
			// Third review - SHIP
			animatePulseSequence([0, 1], 7200, 150, 800);
			animatePulseSequence([2, 3, 4, 5], 8100, 100, 700);
			animatePulseSequence([6], 9000, 1, 900);
		}

		if (item.title === "Improve") {
			// Connections: 0:analyze→match, 1:match→install, 2:db→match, 3:install→wp1, 4:wp1→wp2, 5:wp2→analyze
			// First cycle
			animatePulseSequence([0], 400, 1, 1400);           // Analyze → Match
			animatePulseSequence([2], 1200, 1, 1000);          // Database → Match (dotted)
			animatePulseSequence([1], 2400, 1, 1400);          // Match → Install
			// Loop back along bottom
			animatePulseSequence([3, 4, 5], 4000, 450, 1100);  // Install → loop → Analyze
			// Second cycle
			animatePulseSequence([0], 6500, 1, 1400);
			animatePulseSequence([2], 7300, 1, 1000);
			animatePulseSequence([1], 8500, 1, 1400);
			animatePulseSequence([3, 4, 5], 10100, 450, 1100);
			// Third cycle
			animatePulseSequence([0], 12600, 1, 1400);
			animatePulseSequence([2], 13400, 1, 1000);
			animatePulseSequence([1], 14600, 1, 1400);
			animatePulseSequence([3, 4, 5], 16200, 450, 1100);
		}

		// Animate rows
		rows.forEach((row, i) => {
			tl.add(row, {
				opacity: [0.4, 1],
				duration: 500,
			}, schedule[i] + 120);
		});

		animationsRef.current.push(tl);

		return () => {
			animationsRef.current.forEach((a) => a.pause());
			animationsRef.current = [];
		};
	}, [item]);

	const getNodeSize = (size?: "sm" | "md" | "lg") => {
		switch (size) {
			case "sm": return 36;
			case "lg": return 68;
			default: return 50;
		}
	};

	return (
		<div ref={rootRef} className="rounded-2xl border border-[#0C0C0C]/[0.08] bg-[rgba(12,12,12,0.6)] p-4 md:p-6">
			{/* Header */}
			<div className="mb-6">
				<h3 className="text-base font-medium text-[#1A1916]/90 md:text-lg">{item.scenarioTitle}</h3>
				<p className="mt-1 text-sm text-[#1A1916]/50">{item.scenarioSubtitle}</p>
			</div>

			{/* Circuit Board SVG */}
			<div className="relative overflow-hidden rounded-xl border border-[#0C0C0C]/[0.06] bg-[rgba(8,8,8,0.8)] p-4">
				<svg viewBox="0 0 660 230" className="w-full" style={{ overflow: "visible" }}>
					<defs>
						{/* Grid pattern */}
						<pattern id={`grid-${item.number}`} width="20" height="20" patternUnits="userSpaceOnUse">
							<circle cx="10" cy="10" r="0.5" fill="rgba(163,163,163,0.08)" />
						</pattern>

						{/* Glow filter */}
						<filter id={`glow-${item.number}`} x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="3" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{/* Grid background */}
					<rect width="660" height="230" fill={`url(#grid-${item.number})`} />

					{item.title === "Scope" ? (
						<>
							<text x="170" y="14" textAnchor="middle" className="fill-white/85 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
								PROBLEM
							</text>
							<text x="490" y="14" textAnchor="middle" className="fill-white/85 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
								SOLUTION
							</text>
							<text x="121" y="196" textAnchor="middle" className="fill-white/40 font-mono" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
								DIVERGE
							</text>
							<text x="219" y="196" textAnchor="middle" className="fill-white/40 font-mono" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
								CONVERGE
							</text>
							<text x="441" y="196" textAnchor="middle" className="fill-white/40 font-mono" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
								DIVERGE
							</text>
							<text x="539" y="196" textAnchor="middle" className="fill-white/40 font-mono" style={{ fontSize: "9px", letterSpacing: "0.12em" }}>
								CONVERGE
							</text>
						</>
					) : null}

					{/* Connection traces */}
					{pathEntries.map((entry, i) => (
						<g key={`trace-${i}`}>
							{/* Base trace */}
							<path
								className="circuit-trace"
								d={entry.d}
								fill="none"
								stroke="rgba(163,163,163,0.25)"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray={entry.dashed ? "8 8" : undefined}
							/>
							{/* Animated pulse */}
							<path
								className="circuit-pulse"
								d={entry.d}
								fill="none"
								stroke="rgba(220,220,220,0.75)"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray={entry.dashed ? "10 24" : "30 470"}
								strokeDashoffset="500"
								filter={`url(#glow-${item.number})`}
							/>
							{entry.label && typeof entry.labelX === "number" && typeof entry.labelY === "number" ? (
								<text
									x={entry.labelX}
									y={entry.labelY}
									textAnchor="middle"
									className="fill-white/45 font-mono"
									style={{ fontSize: "9px", letterSpacing: "0.08em" }}
								>
									{entry.label}
								</text>
							) : null}
						</g>
					))}

					{/* Nodes */}
					{item.nodes.map((node) => {
						if (node.render === "anchor") return null;

						if (node.render === "dot") {
							const labelColor = node.accent === "success" ? "rgba(34,197,94,0.95)" : "rgba(163,163,163,0.95)";
							const dotFill = node.accent === "success" ? "rgba(22,163,74,0.95)" : "rgba(248,250,252,0.95)";
							const x = node.labelSide === "right" ? node.x + 14 : node.x;
							const y = node.labelSide === "top" ? node.y - 10 : node.labelSide === "right" ? node.y + 8 : node.y + 24;
							const anchor = node.labelSide === "right" ? "start" : "middle";

							return (
								<g key={node.id} className="circuit-node">
									<circle
										className="circuit-node-shell"
										cx={node.x}
										cy={node.y}
										r={7}
										fill={dotFill}
										stroke={dotFill}
										strokeWidth="1"
									/>
									{node.label ? (
										<text
											className="circuit-node-label font-mono"
											x={x}
											y={y}
											textAnchor={anchor}
											style={{ fontSize: "10px", fill: labelColor }}
										>
											{node.label}
										</text>
									) : null}
								</g>
							);
						}

						// Database cylinder icon
						if (node.render === "database") {
							const w = 44;
							const h = 44;
							const ellipseRy = 7;

							return (
								<g key={node.id} className="circuit-node">
									{/* Cylinder body */}
									<path
										className="circuit-node-shell"
										d={`
											M ${node.x - w / 2} ${node.y - h / 2 + ellipseRy}
											L ${node.x - w / 2} ${node.y + h / 2 - ellipseRy}
											A ${w / 2} ${ellipseRy} 0 0 0 ${node.x + w / 2} ${node.y + h / 2 - ellipseRy}
											L ${node.x + w / 2} ${node.y - h / 2 + ellipseRy}
										`}
										fill="rgba(163,163,163,0.08)"
										stroke="rgba(163,163,163,0.35)"
										strokeWidth="1.5"
									/>
									{/* Top ellipse */}
									<ellipse
										className="circuit-node-shell"
										cx={node.x}
										cy={node.y - h / 2 + ellipseRy}
										rx={w / 2}
										ry={ellipseRy}
										fill="rgba(163,163,163,0.12)"
										stroke="rgba(163,163,163,0.35)"
										strokeWidth="1.5"
									/>
									{/* Label inside cylinder */}
									<text
										className="circuit-node-label fill-white/70 font-mono"
										x={node.x}
										y={node.y + 4}
										textAnchor="middle"
										style={{ fontSize: "9px" }}
									>
										{node.label ?? ""}
									</text>
								</g>
							);
						}

						const size = getNodeSize(node.size);
						const halfSize = size / 2;

						return (
							<g key={node.id} className="circuit-node">
								{/* Node background with pulse */}
								<rect
									className="circuit-node-shell"
									x={node.x - halfSize}
									y={node.y - halfSize}
									width={size}
									height={size}
									rx={8}
									fill="rgba(163,163,163,0.08)"
									stroke="rgba(163,163,163,0.35)"
									strokeWidth="1.5"
								/>

								{/* Inner highlight */}
								<rect
									x={node.x - halfSize + 2}
									y={node.y - halfSize + 2}
									width={size - 4}
									height={size - 4}
									rx={6}
									fill="none"
									stroke="rgba(12, 12, 12, 0.05)"
									strokeWidth="1"
								/>

								{/* Label */}
								<text
									className="circuit-node-label fill-white/70 font-mono"
									x={node.x}
									y={node.y + 4}
									textAnchor="middle"
									style={{ fontSize: node.size === "sm" ? "9px" : "10px" }}
								>
									{node.label ?? ""}
								</text>
							</g>
						);
					})}
				</svg>
			</div>

			{/* Step cards */}
			<div className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
				{item.scenarioSteps.map((step, i) => {
					const isActive = activeNodeIndex >= i;

					return (
						<div
							key={step.label}
							className={`flow-row rounded-lg border px-3 py-2.5 transition-all duration-300 ${
								isActive
									? "border-[#0C0C0C]/[0.12] bg-[#0C0C0C]/[0.04]"
									: "border-[#0C0C0C]/[0.06] bg-transparent"
							}`}
						>
							<div className="flex items-center gap-2">
								<span
									className={`flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] ${
										isActive ? "bg-[#0C0C0C]/10 text-[#1A1916]/80" : "bg-[#0C0C0C]/[0.04] text-[#1A1916]/40"
									}`}
								>
									{i + 1}
								</span>
								<p
									className={`font-mono text-[11px] ${
										isActive ? "text-[#1A1916]/80" : "text-[#1A1916]/40"
									}`}
								>
									{step.label}
								</p>
							</div>
							<p className="mt-1 pl-7 text-[11px] text-[#1A1916]/40">{step.detail}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function FluxWorkflow() {
	const [activeCommand, setActiveCommand] = useState(commands[0].command);

	const activeItem = useMemo(
		() => commands.find((item) => item.command === activeCommand) ?? commands[0],
		[activeCommand],
	);

	return (
		<section id="workflow" className="bg-white @container py-16 md:py-24 lg:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<div className="mx-auto mb-6 w-fit rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#C9A96E]">
						Deterministic SDLC Layer
					</div>
					<h2 className="text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] font-normal tracking-[-1px] text-[#1A1916]">
						Flux steers the agent with{" "}
						<span className="font-serif italic text-[#C9A96E]">flow</span>
					</h2>
					<p className="mt-4 text-lg text-[#5C584F]">
						You should not have to remember slash commands. Flux reads repo state, primes first, routes natural-language intent, and keeps the software loop aligned over time.
					</p>
				</div>

				{/* Workflow layer buttons */}
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
					{commands.map((item) => {
						const Icon = item.icon;
						const active = item.command === activeCommand;
						return (
							<button
								type="button"
								key={item.command}
								onClick={() => setActiveCommand(item.command)}
								className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
									active
										? "border-[#0C0C0C]/20 bg-[#0C0C0C]/[0.06]"
										: "border-[#0C0C0C]/[0.06] bg-[#0C0C0C]/[0.02] hover:border-[#0C0C0C]/[0.12] hover:bg-[#0C0C0C]/[0.04]"
								}`}
							>
								<div className="mb-3 flex items-center gap-2">
									<div
										className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
											active ? "border-[#0C0C0C]/20 bg-[#0C0C0C]/10" : "border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.04]"
										}`}
									>
										<Icon className={`h-3.5 w-3.5 ${active ? "text-[#1A1916]/80" : "text-[#1A1916]/50"}`} />
									</div>
									<span className="font-mono text-[11px] text-[#1A1916]/40">{item.number}.</span>
								</div>
								<p className={`text-sm font-medium ${active ? "text-[#1A1916]/90" : "text-[#1A1916]/70"}`}>
									{item.title}
								</p>
								<p className={`mt-2 text-[11px] leading-5 ${active ? "text-[#1A1916]/55" : "text-[#1A1916]/40"}`}>
									{item.command}
								</p>
							</button>
						);
					})}
				</div>

				{/* Diagram */}
				<div className="mt-6">
					<CircuitDiagram key={activeItem.command} item={activeItem} />
				</div>

				{/* Footer info */}
				<div className="mt-6 grid gap-3 md:grid-cols-[1.2fr_1fr]">
					<div className="rounded-xl border border-[#0C0C0C]/[0.06] bg-[#0C0C0C]/[0.02] p-4">
						<p className="text-sm text-[#1A1916]/50">{activeItem.description}</p>
					</div>
					<div className="rounded-xl border border-[#0C0C0C]/[0.06] bg-[#0C0C0C]/[0.02] p-4">
						<p className="font-mono text-[10px] uppercase tracking-wider text-[#1A1916]/40">Current behavior</p>
						<p className="mt-2 rounded border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.04] px-3 py-2 text-sm text-[#1A1916]/70">
							{activeItem.command}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
