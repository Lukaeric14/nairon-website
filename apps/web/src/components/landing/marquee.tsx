export function Marquee() {
	return (
		<section className="py-2.5 bg-white overflow-hidden">
			<div className="animate-marquee flex whitespace-nowrap">
				{[1, 2, 3].map((i) => (
					<span
						key={i}
						className="text-display-xl font-display font-semibold text-landing-text whitespace-pre tracking-tight-3xl"
						style={{ lineHeight: "1.7" }}
					>
						Innovation. Obsession. Discipline. Intelligence. Passion.{" "}
					</span>
				))}
			</div>
		</section>
	);
}
