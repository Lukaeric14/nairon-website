import { createFileRoute } from "@tanstack/react-router";
import {
	deleteCareerApplicationData,
	listCareerApplicationsData,
	updateCareerApplicationStatusData,
} from "@/server/careers";

function json(data: unknown, init?: ResponseInit) {
	return Response.json(data, init);
}

function errorJson(error: unknown) {
	const message =
		error instanceof Error ? error.message : "Could not load applications.";
	return json({ applications: [], error: message }, { status: 401 });
}

export const Route = createFileRoute("/api/career-applications")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const data = await request.json();
					const result = await listCareerApplicationsData(data);
					return json(result);
				} catch (error) {
					return errorJson(error);
				}
			},
			PATCH: async ({ request }) => {
				try {
					const data = await request.json();
					const result = await updateCareerApplicationStatusData(data);
					return json(result);
				} catch (error) {
					return errorJson(error);
				}
			},
			DELETE: async ({ request }) => {
				try {
					const data = await request.json();
					const result = await deleteCareerApplicationData(data);
					return json(result);
				} catch (error) {
					return errorJson(error);
				}
			},
		},
	},
});
