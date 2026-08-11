import { useState, useEffect } from "react";

export function useRotatingText(words: string[], intervalMs = 3000): string {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((i) => (i + 1) % words.length);
		}, intervalMs);
		return () => clearInterval(interval);
	}, [words.length, intervalMs]);

	return words[index];
}
