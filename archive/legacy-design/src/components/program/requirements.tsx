import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	BulletPoint,
	colors,
} from "@/components/landing/primitives";

export function Requirements({
	data,
}: {
	data: {
		heading: string;
		dimHeading?: string;
		items: string[];
		subtext: string;
	};
}) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
				<SectionTag label="Who Should Apply" />
				<SectionHeading className="text-2xl md:text-4xl">
					{data.heading}{" "}
					{data.dimHeading && <DimText>{data.dimHeading}</DimText>}
				</SectionHeading>

				<div className="mt-8 max-w-3xl space-y-4">
					{data.items.map((item) => (
						<BulletPoint key={item} color="green">
							{item}
						</BulletPoint>
					))}
				</div>

				<p
					className={`mt-8 text-lg font-medium italic ${colors.text}`}
				>
					{data.subtext}
				</p>
			</div>
		</Section>
	);
}
