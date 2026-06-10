import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";
import { notifyHive } from "./hive-notify";

interface NewsletterData {
	email: string;
	source?: string;
}

export const subscribeNewsletter = createServerFn({ method: "POST" })
	.inputValidator((data: NewsletterData) => data)
	.handler(async ({ data }) => {
		const email = data.email.trim().toLowerCase();

		if (!email) {
			throw new Error("Missing email");
		}

		const convexUrl =
			process.env.CONVEX_URL ??
			process.env.VITE_CONVEX_URL ??
			import.meta.env.VITE_CONVEX_URL;

		if (!convexUrl) {
			throw new Error("Convex URL is not configured");
		}

		const convex = new ConvexHttpClient(convexUrl);
		const result = await convex.action(api.newsletter.subscribeToNewsletter, {
			email,
			source: data.source,
		});

		await notifyHive({
			form: "Newsletter",
			fields: { Email: email, Source: data.source },
		});

		const webhookUrl = process.env.SLACK_WEBHOOK_URL;

		if (webhookUrl) {
			const slackMessage = {
				blocks: [
					{
						type: "header",
						text: {
							type: "plain_text",
							text: "New Signals Newsletter Subscriber",
							emoji: true,
						},
					},
					{
						type: "section",
						fields: [
							{ type: "mrkdwn", text: `*Email:*\n${email}` },
							{
								type: "mrkdwn",
								text: `*Status:*\n${result.alreadyExists ? "Already existed" : "New signup"}`,
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
					console.error("Newsletter Slack webhook failed:", response.status);
				}
			} catch (slackError) {
				console.error("Newsletter Slack webhook error:", slackError);
			}
		}

		return result;
	});
