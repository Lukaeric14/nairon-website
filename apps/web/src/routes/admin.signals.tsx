import { createFileRoute } from "@tanstack/react-router";
import { WritingStudio } from "@/components/signals-studio/writing-studio";

export const Route = createFileRoute("/admin/signals")({
	component: WritingStudio,
	head: () => ({
		meta: [
			{ title: "Writing Studio — Nairon" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
});
