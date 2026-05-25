import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

interface CareerApplicationData {
	roleId: string;
	roleTitle: string;
	name: string;
	email: string;
	portfolioUrl: string;
	toolingWorkflow: string;
	source?: string;
}

interface AdminApplicationsRequest {
	adminToken: string;
}

const api = anyApi as {
	careerApplications: {
		submitApplication: any;
		listApplications: any;
	};
};

function getConvexUrl() {
	const convexUrl =
		process.env.CONVEX_URL ??
		process.env.VITE_CONVEX_URL ??
		import.meta.env.VITE_CONVEX_URL;

	if (!convexUrl) {
		throw new Error("Convex URL is not configured");
	}

	return convexUrl;
}

function normalizeApplication(data: CareerApplicationData) {
	const normalized = {
		roleId: data.roleId.trim(),
		roleTitle: data.roleTitle.trim(),
		name: data.name.trim(),
		email: data.email.trim().toLowerCase(),
		portfolioUrl: data.portfolioUrl.trim(),
		toolingWorkflow: data.toolingWorkflow.trim(),
		source: data.source?.trim() || "careers-page",
	};

	if (
		!normalized.roleId ||
		!normalized.roleTitle ||
		!normalized.name ||
		!normalized.email ||
		!normalized.portfolioUrl ||
		!normalized.toolingWorkflow
	) {
		throw new Error("Missing required fields");
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(normalized.email)) {
		throw new Error("Invalid email address");
	}

	try {
		const url = new URL(normalized.portfolioUrl);
		if (!["http:", "https:"].includes(url.protocol)) {
			throw new Error("Invalid portfolio URL");
		}
	} catch {
		throw new Error("Invalid portfolio URL");
	}

	return normalized;
}

async function notifySlack(application: CareerApplicationData, alreadyExists: boolean) {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;
	if (!webhookUrl) return;

	const slackMessage = {
		blocks: [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: alreadyExists
						? "Updated Career Application"
						: "New Career Application",
					emoji: true,
				},
			},
			{
				type: "section",
				fields: [
					{ type: "mrkdwn", text: `*Role:*\n${application.roleTitle}` },
					{ type: "mrkdwn", text: `*Name:*\n${application.name}` },
					{ type: "mrkdwn", text: `*Email:*\n${application.email}` },
					{
						type: "mrkdwn",
						text: `*Portfolio:*\n${application.portfolioUrl}`,
					},
					{
						type: "mrkdwn",
						text: `*AI workflow:*\n${application.toolingWorkflow}`,
					},
				],
			},
			{
				type: "context",
				elements: [
					{
						type: "mrkdwn",
						text: `Submitted at ${new Date().toISOString()}`,
					},
				],
			},
		],
	};

	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(slackMessage),
		});

		if (!response.ok) {
			console.error("Career application Slack webhook failed:", response.status);
		}
	} catch (error) {
		console.error("Career application Slack webhook error:", error);
	}
}

export const submitCareerApplication = createServerFn({ method: "POST" })
	.inputValidator((data: CareerApplicationData) => data)
	.handler(async ({ data }) => {
		const application = normalizeApplication(data);
		const convex = new ConvexHttpClient(getConvexUrl());
		const result = await convex.mutation(
			api.careerApplications.submitApplication,
			application,
		);

		await notifySlack(application, result.alreadyExists);

		return result;
	});

export const listCareerApplications = createServerFn({ method: "POST" })
	.inputValidator((data: AdminApplicationsRequest) => data)
	.handler(async ({ data }) => {
		const adminToken = data.adminToken.trim();
		const configuredToken = process.env.CAREERS_ADMIN_TOKEN;

		if (!configuredToken) {
			throw new Error("CAREERS_ADMIN_TOKEN is not configured");
		}

		if (!adminToken || adminToken !== configuredToken) {
			throw new Error("Invalid admin token");
		}

		const convex = new ConvexHttpClient(getConvexUrl());
		const applications = await convex.query(
			api.careerApplications.listApplications,
			{
				adminToken,
				limit: 200,
			},
		);

		return { applications };
	});
