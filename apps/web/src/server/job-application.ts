// Handles applications submitted from /careers/<slug> role pages. Fields are
// declared per role in careers-data.ts and arrive as label/type/value rows.
// Like every other public form on the site, submissions fire the Slack webhook
// and the shared Hive webhook (see hive-notify.ts).

import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";
import { notifyHive } from "./hive-notify";

interface SubmittedField {
	key?: string;
	label: string;
	type: string;
	value: string;
}

interface JobApplicationData {
	roleTitle: string;
	roleSlug?: string;
	fields: SubmittedField[];
}

const MAX_FIELDS = 20;
const MAX_VALUE_LENGTH = 5000;

const api = anyApi as {
	careerApplications: {
		submitApplication: any;
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

function normalizeUrl(value: string) {
	const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
		? value
		: `https://${value}`;

	try {
		const url = new URL(withProtocol);
		if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
			throw new Error();
		}
		return url.toString();
	} catch {
		return null;
	}
}

function normalize(data: JobApplicationData) {
	const roleTitle = data.roleTitle.trim();
	if (!roleTitle) throw new Error("Missing role");

	if (!Array.isArray(data.fields) || data.fields.length === 0) {
		throw new Error("Missing fields");
	}
	if (data.fields.length > MAX_FIELDS) {
		throw new Error("Too many fields");
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const fields = data.fields.map((field) => {
		const key = field.key?.trim();
		const label = field.label.trim();
		let value = field.value.trim();

		if (!label || !value) {
			throw new Error(`Missing required field: ${label || "unknown"}`);
		}
		if (value.length > MAX_VALUE_LENGTH) {
			throw new Error(`${label} is too long`);
		}
		if (field.type === "email" && !emailRegex.test(value.toLowerCase())) {
			throw new Error("Invalid email address");
		}
		if (field.type === "url") {
			const normalizedUrl = normalizeUrl(value);
			if (!normalizedUrl) throw new Error(`${label} must be a valid link`);
			value = normalizedUrl;
		}

		return { key, label, type: field.type, value };
	});

	return { roleTitle, roleSlug: data.roleSlug?.trim() || roleTitle, fields };
}

function findField(application: ReturnType<typeof normalize>, keys: string[]) {
	const normalizedKeys = keys.map((key) => key.toLowerCase());
	return application.fields.find((field) => {
		const key = field.key?.toLowerCase();
		const label = field.label.toLowerCase();
		return (
			(key && normalizedKeys.includes(key)) ||
			normalizedKeys.some((candidate) => label.includes(candidate))
		);
	});
}

function toCareerApplication(application: ReturnType<typeof normalize>) {
	const name = findField(application, ["name", "full name"])?.value ?? "";
	const email = findField(application, ["email"])?.value.toLowerCase() ?? "";
	const portfolioUrl =
		findField(application, ["portfolio", "github", "website", "reel"])?.value ??
		findField(application, ["traces"])?.value ??
		"";
	const toolingWorkflow =
		findField(application, ["aistack", "ai stack", "tooling", "workflow"])
			?.value ??
		application.fields
			.filter((field) => field.type === "textarea")
			.map((field) => `${field.label}\n${field.value}`)
			.join("\n\n");

	return {
		roleId: application.roleSlug,
		roleTitle: application.roleTitle,
		name,
		email,
		portfolioUrl,
		toolingWorkflow,
		source: "job-role-page",
		applicationFieldsJson: JSON.stringify(application.fields),
	};
}

async function notifySlack(application: ReturnType<typeof normalize>) {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;
	if (!webhookUrl) {
		console.warn("SLACK_WEBHOOK_URL not configured");
		return;
	}

	// Short answers go into one two-column section; long answers get their own.
	const shortFields = application.fields.filter((f) => f.type !== "textarea");
	const longFields = application.fields.filter((f) => f.type === "textarea");

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
				fields: shortFields.slice(0, 10).map((field) => ({
					type: "mrkdwn",
					text: `*${field.label}:*\n${field.value}`,
				})),
			},
			...longFields.map((field) => ({
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*${field.label}:*\n${field.value}`,
				},
			})),
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
		const convex = new ConvexHttpClient(getConvexUrl());
		const result = await convex.mutation(
			api.careerApplications.submitApplication,
			toCareerApplication(application),
		);

		await notifySlack(application);

		await notifyHive({
			form: "Job application",
			fields: {
				Role: application.roleTitle,
				...Object.fromEntries(
					application.fields.map((field) => [field.label, field.value]),
				),
			},
		});

		return result;
	});
