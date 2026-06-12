// Handles applications submitted from /careers/<slug> role pages. Like every
// other public form on the site, submissions fire the Slack webhook and the
// shared Hive webhook (see hive-notify.ts).

import { createServerFn } from "@tanstack/react-start";
import { notifyHive } from "./hive-notify";

interface JobApplicationData {
	roleTitle: string;
	name: string;
	email: string;
	phone: string;
	portfolioUrl: string;
	tracesUrl: string;
	aiStack: string;
	projects: string;
	note: string;
}

function requireUrl(value: string, label: string) {
	try {
		const url = new URL(value);
		if (!["http:", "https:"].includes(url.protocol)) {
			throw new Error();
		}
	} catch {
		throw new Error(`${label} must be a valid link (https://...)`);
	}
}

function normalize(data: JobApplicationData) {
	const normalized = {
		roleTitle: data.roleTitle.trim(),
		name: data.name.trim(),
		email: data.email.trim().toLowerCase(),
		phone: data.phone.trim(),
		portfolioUrl: data.portfolioUrl.trim(),
		tracesUrl: data.tracesUrl.trim(),
		aiStack: data.aiStack.trim(),
		projects: data.projects.trim(),
		note: data.note.trim(),
	};

	for (const [key, value] of Object.entries(normalized)) {
		if (!value) throw new Error(`Missing required field: ${key}`);
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(normalized.email)) {
		throw new Error("Invalid email address");
	}

	requireUrl(normalized.portfolioUrl, "Portfolio link");
	requireUrl(normalized.tracesUrl, "traces.com session link");

	return normalized;
}

async function notifySlack(application: ReturnType<typeof normalize>) {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;
	if (!webhookUrl) {
		console.warn("SLACK_WEBHOOK_URL not configured");
		return;
	}

	const slackMessage = {
		blocks: [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: `New Application: ${application.roleTitle}`,
					emoji: true,
				},
			},
			{
				type: "section",
				fields: [
					{ type: "mrkdwn", text: `*Name:*\n${application.name}` },
					{ type: "mrkdwn", text: `*Email:*\n${application.email}` },
					{ type: "mrkdwn", text: `*Phone:*\n${application.phone}` },
					{ type: "mrkdwn", text: `*Portfolio:*\n${application.portfolioUrl}` },
					{ type: "mrkdwn", text: `*Traces session:*\n${application.tracesUrl}` },
				],
			},
			{
				type: "section",
				text: { type: "mrkdwn", text: `*AI stack:*\n${application.aiStack}` },
			},
			{
				type: "section",
				text: { type: "mrkdwn", text: `*Projects:*\n${application.projects}` },
			},
			{
				type: "section",
				text: { type: "mrkdwn", text: `*Why this role:*\n${application.note}` },
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
			console.error("Job application Slack webhook failed:", response.status);
		}
	} catch (error) {
		console.error("Job application Slack webhook error:", error);
	}
}

export const submitJobApplication = createServerFn({ method: "POST" })
	.inputValidator((data: JobApplicationData) => data)
	.handler(async ({ data }) => {
		const application = normalize(data);

		await notifySlack(application);

		await notifyHive({
			form: "Job application",
			fields: {
				Role: application.roleTitle,
				Name: application.name,
				Email: application.email,
				Phone: application.phone,
				Portfolio: application.portfolioUrl,
				"Traces session": application.tracesUrl,
				"AI stack": application.aiStack,
				Projects: application.projects,
				"Why this role": application.note,
			},
		});

		return { success: true };
	});
