export type WritingFinding = {
	id: string;
	type: "filler" | "jargon" | "rhythm" | "structure" | "cliche";
	label: string;
	excerpt: string;
	note: string;
	suggestion: string;
};

const fillerPatterns = [
	/\bit is important to (?:note|remember) that\b/gi,
	/\bin today'?s (?:fast-paced|ever-changing) world\b/gi,
	/\bat the end of the day\b/gi,
	/\bin order to\b/gi,
	/\bit goes without saying\b/gi,
	/\bthe fact of the matter is\b/gi,
];

const jargonPatterns = [
	/\bleverage\b/gi,
	/\butili[sz]e\b/gi,
	/\bsynerg(?:y|ize)\b/gi,
	/\bparadigm shift\b/gi,
	/\bgame[- ]changer\b/gi,
	/\bholistic(?:ally)?\b/gi,
	/\brobust\b/gi,
	/\bseamless(?:ly)?\b/gi,
	/\bdelve(?:s|d)?\b/gi,
	/\blandscape\b/gi,
];

const clichePatterns = [
	/\bnot just .{1,80}, but .{1,80}\b/gi,
	/\bfrom .{1,60} to .{1,60}\b/gi,
	/\bthe future of\b/gi,
	/\bunlock(?:ing|s|ed)? (?:the )?(?:power|potential)\b/gi,
	/\bstands as a testament\b/gi,
];

function sentenceList(text: string) {
	return text
		.replace(/\n+/g, " ")
		.split(/(?<=[.!?])\s+/)
		.map((sentence) => sentence.trim())
		.filter(Boolean);
}

function excerptAround(text: string, index: number, length: number) {
	const start = Math.max(0, index - 45);
	const end = Math.min(text.length, index + length + 75);
	return `${start ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

function patternFindings(
	text: string,
	patterns: RegExp[],
	type: WritingFinding["type"],
	label: string,
	note: string,
	suggestion: string,
) {
	const findings: WritingFinding[] = [];
	for (const pattern of patterns) {
		pattern.lastIndex = 0;
		for (const match of text.matchAll(pattern)) {
			if (match.index === undefined) continue;
			findings.push({
				id: `${type}-${match.index}-${match[0]}`,
				type,
				label,
				excerpt: excerptAround(text, match.index, match[0].length),
				note,
				suggestion,
			});
		}
	}
	return findings;
}

export function analyzeWriting(text: string) {
	const findings = [
		...patternFindings(
			text,
			fillerPatterns,
			"filler",
			"Empty setup",
			"This delays the point without giving the reader information.",
			"Delete it, then start with the specific claim.",
		),
		...patternFindings(
			text,
			jargonPatterns,
			"jargon",
			"Abstract wording",
			"This word is broad enough to hide what actually happened.",
			"Name the concrete action, object, or outcome.",
		),
		...patternFindings(
			text,
			clichePatterns,
			"cliche",
			"Familiar AI-shaped phrase",
			"This construction is common in generic generated prose. That does not prove who wrote it.",
			"Say the underlying point directly in your own words.",
		),
	];

	const sentences = sentenceList(text);
	for (const [index, sentence] of sentences.entries()) {
		const words = sentence.split(/\s+/).filter(Boolean).length;
		if (words > 34) {
			findings.push({
				id: `rhythm-${index}`,
				type: "rhythm",
				label: `${words}-word sentence`,
				excerpt: sentence.slice(0, 220),
				note: "The reader has to hold several ideas in working memory at once.",
				suggestion: "Put the main claim first. Move the next idea into its own sentence.",
			});
		}
	}

	const paragraphs = text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
	for (const [index, paragraph] of paragraphs.entries()) {
		const words = paragraph.trim().split(/\s+/).filter(Boolean).length;
		if (words > 150) {
			findings.push({
				id: `structure-${index}`,
				type: "structure",
				label: `${words}-word paragraph`,
				excerpt: paragraph.trim().slice(0, 220),
				note: "This block is hard to scan and makes it easy to lose the thread.",
				suggestion: "Split where the idea, example, or consequence changes.",
			});
		}
	}

	const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
	const sentenceLengths = sentences.map((sentence) => sentence.split(/\s+/).filter(Boolean).length);
	const averageSentenceLength = sentenceLengths.length
		? Math.round(sentenceLengths.reduce((sum, length) => sum + length, 0) / sentenceLengths.length)
		: 0;
	return {
		findings: findings.slice(0, 30),
		wordCount,
		averageSentenceLength,
		sentenceLengths,
		readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
	};
}
