import { useState, useEffect, useRef } from "react";
import { GridSection, GridCell } from "../grid-system";

/* ─── Trending topics — short, punchy, scannable ───────────── */

const TRENDING = [
	{ title: "OpenAI Open Code vs Claude Code", posts: "3.1k posts" },
	{ title: "Browser-use alternatives", posts: "1.8k posts" },
	{ title: "Cursor background agents", posts: "1.2k posts" },
];

/* ─── Tweet data ───────────────────────────────────────────── */

const TWEETS = [
	{
		name: "Andrej Karpathy",
		handle: "@karpathy",
		avatar: "/avatars/avatar-1.jpg",
		verified: true,
		time: "2h",
		text: "Devin 2.0 just dropped and the benchmarks are wild.\n\nOn SWE-bench it's now solving 71% of real GitHub issues autonomously. For context, Claude Code is at 72%.\n\nThe gap between human-in-the-loop and fully autonomous is closing fast.",
		likes: "3.4k",
		retweets: "891",
		replies: "247",
		views: "142k",
	},
	{
		name: "swyx",
		handle: "@swyx",
		avatar: "/avatars/avatar-2.jpg",
		verified: true,
		time: "4h",
		text: "Claude Code now runs background agents.\n\nThis means you can kick off a task, close your laptop, and it keeps working. CI integration is coming next.\n\nWe're entering the era of async AI engineering. Your agent works while you sleep.",
		likes: "1.2k",
		retweets: "342",
		replies: "89",
		views: "67k",
	},
	{
		name: "Theo",
		handle: "@theo",
		avatar: "/avatars/avatar-3.jpg",
		verified: true,
		time: "8h",
		text: "Hot take: I replaced 80% of my test writing with AI last month.\n\nNot generated slop. Actually good tests. The trick is using Cursor to analyze your code paths first, then generate tests that cover real edge cases.\n\nThread on the exact workflow below.",
		likes: "2.1k",
		retweets: "567",
		replies: "134",
		views: "89k",
	},
];

/* ─── X / Twitter icon ─────────────────────────────────────── */

function XIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={className}
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

/* ─── Verified badge ───────────────────────────────────────── */

function VerifiedBadge() {
	return (
		<svg
			viewBox="0 0 22 22"
			className="w-4 h-4 text-[#1D9BF0]"
			fill="currentColor"
			aria-label="Verified"
		>
			<path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.706 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
		</svg>
	);
}

/* ─── Tweet card component ─────────────────────────────────── */

function TweetCard({
	tweet,
	index,
	isVisible,
}: {
	tweet: (typeof TWEETS)[number];
	index: number;
	isVisible: boolean;
}) {
	return (
		<div
			className="relative bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/[0.06] rounded-xl p-5 transition-all duration-500 ease-out hover:border-[#0C0C0C]/[0.1]"
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(16px)",
				transitionDelay: `${index * 150}ms`,
			}}
		>
			{/* Tweet header */}
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<img
						src={tweet.avatar}
						alt=""
						width={40}
						height={40}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<div className="flex items-center gap-1.5">
							<span className="text-[#1A1916] text-sm font-bold">
								{tweet.name}
							</span>
							{tweet.verified && <VerifiedBadge />}
						</div>
						<span className="text-[#5C584F]/60 text-[13px]">
							{tweet.handle} &middot; {tweet.time}
						</span>
					</div>
				</div>
				<XIcon className="w-4 h-4 text-[#5C584F]/40" />
			</div>

			{/* Tweet body */}
			<p className="text-[#1A1916]/90 text-[14px] leading-[1.55] whitespace-pre-line mb-4">
				{tweet.text}
			</p>

			{/* Tweet engagement bar */}
			<div className="flex items-center gap-6 text-[#5C584F]/40 pt-3 border-t border-[#0C0C0C]/[0.04]">
				{/* Replies */}
				<div className="flex items-center gap-1.5 group cursor-pointer">
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						className="group-hover:text-[#1D9BF0] transition-colors"
					>
						<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
					</svg>
					<span className="text-xs tabular-nums group-hover:text-[#1D9BF0] transition-colors">
						{tweet.replies}
					</span>
				</div>

				{/* Retweets */}
				<div className="flex items-center gap-1.5 group cursor-pointer">
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						className="group-hover:text-[#00BA7C] transition-colors"
					>
						<path d="M17 1l4 4-4 4" />
						<path d="M3 11V9a4 4 0 014-4h14" />
						<path d="M7 23l-4-4 4-4" />
						<path d="M21 13v2a4 4 0 01-4 4H3" />
					</svg>
					<span className="text-xs tabular-nums group-hover:text-[#00BA7C] transition-colors">
						{tweet.retweets}
					</span>
				</div>

				{/* Likes */}
				<div className="flex items-center gap-1.5 group cursor-pointer">
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						className="group-hover:text-[#F91880] transition-colors"
					>
						<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
					</svg>
					<span className="text-xs tabular-nums group-hover:text-[#F91880] transition-colors">
						{tweet.likes}
					</span>
				</div>

				{/* Views */}
				<div className="flex items-center gap-1.5 ml-auto">
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
					<span className="text-xs tabular-nums">
						{tweet.views}
					</span>
				</div>
			</div>
		</div>
	);
}

/* ─── Main feed component ──────────────────────────────────── */

export function UniverseFeed() {
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
		<div ref={ref} id="feed">
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-12 py-10">
					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
								<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
									Daily Feed
								</span>
							</div>
							<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl mb-3">
								The pulse of{" "}
								<span className="font-serif italic text-[#C9A96E]">
									AI-native
								</span>{" "}
								engineering
							</h2>
							<p className="text-[#5C584F] text-base max-w-xl">
								Curated daily from the engineers, researchers, and
								builders shaping how software gets made. Every item
								links to the tools that matter.
							</p>
						</div>
						<div className="hidden md:flex items-center gap-2 text-[#5C584F] text-sm">
							<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							Live — refreshed every hour
						</div>
					</div>
				</GridCell>
			</GridSection>

			{/* Two-column: Trending left (narrow), Tweets right (wide) */}
			<GridSection columns="30fr 70fr" border>
				{/* Left: Trending — styled sidebar */}
				<GridCell borderRight className="py-6">
					<div className="px-6 mb-5">
						<h3 className="text-[#1A1916] text-sm font-semibold">
							Trending Now
						</h3>
					</div>

					{TRENDING.map((item, i) => (
						<div
							key={item.title}
							className="group cursor-pointer px-6 py-4 transition-all duration-500 ease-out hover:bg-[#0C0C0C]/[0.03]"
							style={{
								opacity: isVisible ? 1 : 0,
								transform: isVisible
									? "translateX(0)"
									: "translateX(-12px)",
								transitionDelay: `${i * 120}ms`,
								borderBottom:
									i < TRENDING.length - 1
										? "1px solid rgba(12, 12, 12, 0.04)"
										: "none",
							}}
						>
							<span className="text-[#5C584F]/30 text-[11px] block mb-1">
								Trending in AI Engineering
							</span>
							<h4 className="text-[#1A1916] text-[15px] font-bold leading-snug group-hover:text-[#C9A96E] transition-colors">
								{item.title}
							</h4>
							<span className="text-[#5C584F]/40 text-[12px] mt-0.5 block">
								{item.posts}
							</span>
						</div>
					))}

					<div className="px-6 pt-4">
						<span className="text-[#C9A96E] text-[13px] cursor-pointer hover:text-[#D4B87A] transition-colors">
							Show more
						</span>
					</div>
				</GridCell>

				{/* Right: Tweet cards */}
				<GridCell className="px-6 py-6 relative overflow-hidden">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<XIcon className="w-4 h-4 text-[#5C584F]/60" />
							<h3 className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
								From the timeline
							</h3>
						</div>
						<span className="text-[#5C584F]/40 text-xs">
							Sourced from X
						</span>
					</div>

					<div className="space-y-4">
						{TWEETS.map((tweet, i) => (
							<TweetCard
								key={tweet.handle}
								tweet={tweet}
								index={i}
								isVisible={isVisible}
							/>
						))}
					</div>

					{/* Fade-out at bottom */}
					<div
						className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
						style={{
							background:
								"linear-gradient(to top, #0C0C0C, transparent)",
						}}
					/>

					{/* View more */}
					<div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-5">
						<span className="text-[#C9A96E] text-sm font-medium cursor-pointer hover:text-[#D4B87A] transition-colors">
							View full feed &rarr;
						</span>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
