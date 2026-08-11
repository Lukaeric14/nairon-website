import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DigitalTextProps {
	text: string;
	className?: string;
	duration?: number;
}

export function DigitalText({
	text,
	className,
	duration = 400,
}: DigitalTextProps) {
	const [displayText, setDisplayText] = useState(text);
	const [isVisible, setIsVisible] = useState(true);
	const previousText = useRef(text);

	useEffect(() => {
		if (text === previousText.current) return;

		// Fade out
		setIsVisible(false);

		// Switch text at halfway point and fade in
		const timeout = setTimeout(() => {
			setDisplayText(text);
			setIsVisible(true);
			previousText.current = text;
		}, duration / 2);

		return () => clearTimeout(timeout);
	}, [text, duration]);

	return (
		<span
			className={cn(
				className,
				"transition-opacity",
				isVisible ? "opacity-100" : "opacity-0"
			)}
			style={{ transitionDuration: `${duration / 2}ms` }}
		>
			{displayText}
		</span>
	);
}
