import { useState, useEffect, useRef } from "react";
import { GridSection, GridCell } from "../grid-system";

const POSTS = [
	{
		title: "Why AI-Native Engineers Ship 3x Faster",
		url: "#",
		domain: "naironai.com",
		points: 342,
		comments: 89,
		author: "lukaeric",
		time: "3 hours ago",
	},
	{
		title: "Benchmarking Developer Productivity in the Age of Copilots",
		url: "#",
		domain: "naironai.com",
		points: 287,
		comments: 124,
		author: "obaid",
		time: "5 hours ago",
	},
	{
		title: "Context Windows Are the New RAM",
		url: "#",
		domain: "naironai.com",
		points: 256,
		comments: 67,
		author: "lukaeric",
		time: "8 hours ago",
	},
	{
		title: "How We Built Flux: Measuring What Actually Matters",
		url: "#",
		domain: "naironai.com",
		points: 198,
		comments: 43,
		author: "obaid",
		time: "1 day ago",
	},
	{
		title: "What Senior Engineers Get Wrong About AI Tools",
		url: "#",
		domain: "naironai.com",
		points: 175,
		comments: 91,
		author: "lukaeric",
		time: "1 day ago",
	},
	{
		title: "The Recruiting Playbook Nobody Talks About",
		url: "#",
		domain: "naironai.com",
		points: 163,
		comments: 56,
		author: "lukaeric",
		time: "2 days ago",
	},
	{
		title: "From Bootcamp to Agency: Lessons in Pivoting Fast",
		url: "#",
		domain: "naironai.com",
		points: 141,
		comments: 38,
		author: "lukaeric",
		time: "3 days ago",
	},
	{
		title: "Agent-First Architecture: Designing Systems for AI Teammates",
		url: "#",
		domain: "naironai.com",
		points: 128,
		comments: 72,
		author: "obaid",
		time: "4 days ago",
	},
];

function PostRow({
	post,
	rank,
	isVisible,
}: {
	post: (typeof POSTS)[number];
	rank: number;
	isVisible: boolean;
}) {
	return (
		<div
			className="flex items-baseline gap-3 px-6 md:px-8 py-2.5 transition-all duration-400 ease-out hover:bg-[#0C0C0C]/[0.02] group"
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(8px)",
				transitionDelay: `${rank * 50}ms`,
			}}
		>
			{/* Rank */}
			<span className="text-[#5C584F]/30 text-sm tabular-nums w-5 text-right shrink-0">
				{rank}.
			</span>

			{/* Upvote arrow */}
			<button
				type="button"
				className="text-[#5C584F]/30 hover:text-[#C9A96E] transition-colors shrink-0 mt-0.5"
				aria-label="Upvote"
			>
				<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
					<path d="M5 0L10 7H0z" />
				</svg>
			</button>

			{/* Content */}
			<div className="min-w-0">
				<div className="flex items-baseline gap-2 flex-wrap">
					<a
						href={post.url}
						className="text-[#1A1916] text-[14px] font-medium leading-snug group-hover:text-[#C9A96E] transition-colors"
					>
						{post.title}
					</a>
					<span className="text-[#5C584F]/30 text-[11px] shrink-0">
						({post.domain})
					</span>
				</div>
				<div className="flex items-center gap-1.5 mt-0.5 text-[#5C584F]/40 text-[11px]">
					<span>{post.points} points</span>
					<span>by {post.author}</span>
					<span>{post.time}</span>
					<span className="mx-0.5">|</span>
					<a href={post.url} className="hover:text-[#1A1916] transition-colors">
						{post.comments} comments
					</a>
				</div>
			</div>
		</div>
	);
}

export function UniverseBlog() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref}>
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-12 py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							Blog
						</span>
					</div>
					<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl mb-3">
						Essays &{" "}
						<span className="font-serif italic text-[#C9A96E]">
							insights
						</span>
					</h2>
					<p className="text-[#5C584F] text-base max-w-xl">
						Long-form thinking on AI-native engineering, recruiting,
						and building with agents — from the Nairon team.
					</p>
				</GridCell>
			</GridSection>

			{/* HN-style post list */}
			<GridSection columns="1fr" border>
				<GridCell className="py-3">
					{POSTS.map((post, i) => (
						<PostRow
							key={post.title}
							post={post}
							rank={i + 1}
							isVisible={isVisible}
						/>
					))}

					{/* More link */}
					<div className="px-8 py-4 flex items-center gap-3">
						<span className="text-[#5C584F]/30 text-sm w-5 text-right">
							&nbsp;
						</span>
						<span className="w-[10px]" />
						<a
							href="#"
							className="text-[#C9A96E] text-[13px] font-medium hover:text-[#D4B87A] transition-colors"
						>
							More &rarr;
						</a>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
