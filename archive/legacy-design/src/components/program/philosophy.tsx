import {
	Section,
	SectionTag,
	colors,
} from "@/components/landing/primitives";

function PhilosophyParagraph({
	bold,
	rest,
}: { bold: string; rest: string }) {
	return (
		<h4 className={`${colors.text} text-lg`} style={{ lineHeight: "1.4" }}>
			<strong className="font-bold">{bold}</strong>{" "}
			<span className="font-normal">{rest}</span>
		</h4>
	);
}

export function ProgramPhilosophy({
	data,
}: {
	data: {
		quote: string;
		author: string;
		role: string;
		signature: string;
		paragraphs: { bold: string; rest: string }[];
	};
}) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
			<div className="flex flex-row justify-center">
				<div className="w-full max-w-[660px] flex flex-col gap-8">
					{/* Tag */}
					<SectionTag label="Why We Built This" />

					{/* Quote */}
					<div>
						<span className="text-3xl text-green-400 leading-none block mb-3">
							&ldquo;
						</span>
						<p
							className={`text-lg md:text-xl leading-relaxed font-medium ${colors.text}`}
						>
							{data.quote}
						</p>

						{/* Attribution */}
						<div className="mt-8 flex flex-col gap-1">
							<div>
								<p className={colors.text}>
									<strong className="font-bold">
										{data.author}
									</strong>
								</p>
								<p className={`${colors.text} text-base`}>
									{data.role}
								</p>
							</div>
							<img
								src={data.signature}
								alt={`${data.author} signature`}
								className="h-[75px] w-[108px] object-contain"
								loading="lazy"
							/>
						</div>
					</div>

					{/* Divider */}
					<div className="w-16 h-px bg-[#0C0C0C]/8" />

					{/* Paragraphs */}
					<div className="flex flex-col gap-6">
						{data.paragraphs.map((p) => (
							<PhilosophyParagraph
								key={p.bold.slice(0, 30)}
								bold={p.bold}
								rest={p.rest}
							/>
						))}
					</div>
				</div>
			</div>
			</div>
		</Section>
	);
}
