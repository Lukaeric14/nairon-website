import { createFileRoute } from "@tanstack/react-router";
import { submitJobApplicationData } from "@/server/job-application";

function json(data: unknown, init?: ResponseInit) {
	return Response.json(data, init);
}

function errorJson(error: unknown) {
	const message =
		error instanceof Error ? error.message : "Could not submit application.";
	return json({ success: false, error: message }, { status: 400 });
}

export const Route = createFileRoute("/api/job-application")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const data = await request.json();
					const result = await submitJobApplicationData(data);
					return json({ success: true, result });
				} catch (error) {
					return errorJson(error);
				}
			},
		},
	},
});
