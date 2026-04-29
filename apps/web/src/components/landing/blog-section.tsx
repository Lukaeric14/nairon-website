import { GridSection, GridCell, CornerNotches } from "./grid-system";

interface BlogPost {
	title: string;
	subtitle?: string;
	category: string;
	date: string;
	author: { name: string; avatar: string };
	image: string;
}

const blogPosts: BlogPost[] = [
	{
		title: "Why AI-Native Engineers Ship 3x Faster",
		subtitle:
			"The data behind our boldest claim — and what it means for your next hire.",
		category: "Research",
		date: "Feb 18, 2026",
		author: {
			name: "Luka Eric",
			avatar: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		},
		image: "/backgrounds/pastoral-hills.webp",
	},
	{
		title: "Benchmarking Developer Productivity in the Age of Copilots",
		category: "Engineering",
		date: "Feb 10, 2026",
		author: {
			name: "Obaid Ur-R.",
			avatar: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		},
		image: "/backgrounds/hazy-landscape.webp",
	},
	{
		title: "The Recruiting Playbook Nobody Talks About",
		category: "Hiring",
		date: "Jan 29, 2026",
		author: {
			name: "Luka Eric",
			avatar: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		},
		image: "/backgrounds/rolling-hills.webp",
	},
	{
		title: "How We Built Flux: Measuring What Matters",
		category: "Product",
		date: "Jan 15, 2026",
		author: {
			name: "Obaid Ur-R.",
			avatar: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		},
		image: "/backgrounds/farmhouse-landscape.webp",
	},
	{
		title: "Context Windows Are the New RAM",
		category: "AI",
		date: "Jan 8, 2026",
		author: {
			name: "Luka Eric",
			avatar: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		},
		image: "/backgrounds/nature-scene-3.webp",
	},
	{
		title: "From Bootcamp to Agency: Lessons in Pivoting",
		category: "Company",
		date: "Dec 20, 2025",
		author: {
			name: "Luka Eric",
			avatar: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		},
		image: "/backgrounds/hero-bg-1.webp",
	},
	{
		title: "What Senior Engineers Get Wrong About AI Tools",
		category: "Opinion",
		date: "Dec 11, 2025",
		author: {
			name: "Obaid Ur-R.",
			avatar: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		},
		image: "/backgrounds/hero-bg-2.webp",
	},
];

/* ─── Image card with gradient overlay ────────────────────────── */
function PostImage({
	src,
	alt,
	className,
}: { src: string; alt: string; className?: string }) {
	return (
		<div className={`relative overflow-hidden ${className}`}>
			<img
				src={src}
				alt={alt}
				className="absolute inset-0 w-full h-full object-cover"
				loading="lazy"
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.4) 100%)",
				}}
			/>
		</div>
	);
}

/* ─── Left / center post card ─────────────────────────────────── */
function PostCard({ post, large }: { post: BlogPost; large?: boolean }) {
	return (
		<article className="relative flex flex-col gap-4 group">
			<PostImage
				src={post.image}
				alt={post.title}
				className={large ? "h-48 md:h-64" : "h-32 md:h-40"}
			/>
			<div className="flex items-center gap-2">
				<span className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.16em]">
					{post.category}
				</span>
				<span className="text-[#5C584F]/40 text-xs">·</span>
				<span className="text-[#5C584F] text-xs">{post.date}</span>
			</div>
			<h3
				className={`text-[#1A1916] font-normal leading-snug tracking-[-0.24px] ${
					large ? "text-xl md:text-2xl" : "text-sm md:text-base"
				}`}
			>
				{post.title}
			</h3>
			{post.subtitle && large && (
				<p className="text-[#5C584F] text-sm leading-relaxed">
					{post.subtitle}
				</p>
			)}
			<div className="flex items-center gap-3 mt-auto">
				<img
					src={post.author.avatar}
					alt={post.author.name}
					className="w-7 h-7 rounded-full object-cover object-top border border-[#0C0C0C]/[0.08]"
				/>
				<span className="text-[#5C584F] text-xs font-medium">
					{post.author.name}
				</span>
			</div>
		</article>
	);
}

/* ─── Compact list item (right column) ────────────────────────── */
function CompactPost({ post }: { post: BlogPost }) {
	return (
		<article className="relative flex gap-4 items-start group">
			<PostImage
				src={post.image}
				alt={post.title}
				className="w-16 h-16 md:w-20 md:h-20 shrink-0"
			/>
			<div className="flex flex-col gap-1.5 min-w-0 py-0.5">
				<span className="text-[#C9A96E] text-[10px] font-medium uppercase tracking-[0.16em]">
					{post.category}
				</span>
				<h4 className="text-[#1A1916] text-sm font-normal leading-snug line-clamp-2 tracking-[-0.12px]">
					{post.title}
				</h4>
				<div className="flex items-center gap-2 mt-auto">
					<img
						src={post.author.avatar}
						alt={post.author.name}
						className="w-5 h-5 rounded-full object-cover object-top border border-[#0C0C0C]/[0.06]"
					/>
					<span className="text-[#5C584F] text-xs">
						{post.author.name}
					</span>
				</div>
			</div>
		</article>
	);
}

/* ─── Blog Section ────────────────────────────────────────────── */
export function BlogSection() {
	const featured = blogPosts[0];
	const secondary = blogPosts.slice(1, 3);
	const recent = blogPosts.slice(3, 7);

	return (
		<div>
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-8 md:px-12 pt-12 pb-10">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							From the Blog
						</span>
					</div>
					<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl">
						Agent build{" "}
						<span className="font-serif italic text-[#C9A96E]">
							notes
						</span>
					</h2>
				</GridCell>
			</GridSection>

			{/* 3-column content grid */}
			<div
				className="relative grid grid-cols-1 md:grid-cols-[3fr_5fr_4fr]"
				style={{
					borderBottom: "var(--guide-width) solid var(--guide-color)",
				}}
			>
				{/* Left column — two secondary posts */}
				<GridCell borderRight className="p-8 md:p-10 flex flex-col">
					<CornerNotches size={10} />
					<div className="flex flex-col">
						<div className="pb-8" style={{ borderBottom: "var(--guide-width) solid var(--guide-color)" }}>
							<PostCard post={secondary[0]} />
						</div>
						<div className="pt-8">
							<PostCard post={secondary[1]} />
						</div>
					</div>
				</GridCell>

				{/* Center column — featured/hero post */}
				<GridCell borderRight className="p-8 md:p-10">
					<CornerNotches size={10} />
					<PostCard post={featured} large />
				</GridCell>

				{/* Right column — recent notes list */}
				<GridCell className="p-8 md:p-10">
					<CornerNotches size={10} />
					<div className="flex items-center gap-3 mb-8">
						<div className="w-1 h-1 rounded-full bg-[#C9A96E]/60" />
						<h3 className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							Recent Notes
						</h3>
					</div>
					<div className="flex flex-col gap-6">
						{recent.map((post, i) => (
							<div key={post.title}>
								<CompactPost post={post} />
								{i < recent.length - 1 && (
									<div
										className="mt-6"
										style={{
											borderBottom:
												"var(--guide-width) solid var(--guide-color)",
										}}
									/>
								)}
							</div>
						))}
					</div>
				</GridCell>
			</div>
		</div>
	);
}
