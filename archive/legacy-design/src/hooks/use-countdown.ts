import { useState, useEffect } from "react";

export interface CountdownValues {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function getTimeLeft(target: Date): CountdownValues {
	const diff = Math.max(0, target.getTime() - Date.now());
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

export function useCountdown(targetDate: Date): CountdownValues {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft(targetDate));
		}, 1000);
		return () => clearInterval(interval);
	}, [targetDate]);

	return timeLeft;
}
