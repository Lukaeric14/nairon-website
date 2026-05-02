import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";

interface HiveWaitlistData {
	firstName: string;
	email: string;
}

export const submitHiveWaitlist = createServerFn({ method: "POST" })
	.inputValidator((data: HiveWaitlistData) => data)
	.handler(async ({ data }) => {
		const firstName = data.firstName.trim();
		const email = data.email.trim().toLowerCase();

		if (!firstName || !email) {
			throw new Error("Missing required fields");
		}

		const convexUrl =
			process.env.CONVEX_URL ??
			process.env.VITE_CONVEX_URL ??
			import.meta.env.VITE_CONVEX_URL;

		if (!convexUrl) {
			throw new Error("Convex URL is not configured");
		}

		const convex = new ConvexHttpClient(convexUrl);
		const result = await convex.action(api.hiveWaitlist.joinHiveWaitlist, {
			firstName,
			email,
		});

		const webhookUrl = process.env.SLACK_WEBHOOK_URL;

		if (webhookUrl) {
			const slackMessage = {
				blocks: [
					{
						type: "header",
						text: {
							type: "plain_text",
							text: "New Hive Waitlist Signup",
							emoji: true,
						},
					},
					{
						type: "section",
						fields: [
							{ type: "mrkdwn", text: `*First name:*\n${firstName}` },
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
					console.error("Hive waitlist Slack webhook failed:", response.status);
				}
			} catch (slackError) {
				console.error("Hive waitlist Slack webhook error:", slackError);
			}
		} else {
			console.warn("SLACK_WEBHOOK_URL not configured");
		}

		return result;
	});
