import { createServerFn } from "@tanstack/react-start";
import { notifyHive } from "./hive-notify";

interface HireFormData {
	name: string;
	company: string;
	email: string;
	useCase: string;
	teamSize: string;
}

export const submitHireForm = createServerFn({ method: "POST" })
	.inputValidator((data: HireFormData) => data)
	.handler(async ({ data }) => {
		const { name, company, email, useCase, teamSize } = data;

		if (!name || !company || !email || !useCase) {
			throw new Error("Missing required fields");
		}

		const webhookUrl = process.env.SLACK_WEBHOOK_URL;

		if (webhookUrl) {
			const slackMessage = {
				blocks: [
					{
						type: "header",
						text: {
							type: "plain_text",
							text: "New AI Employee Discovery Inquiry",
							emoji: true,
						},
					},
					{
						type: "section",
						fields: [
							{ type: "mrkdwn", text: `*Name:*\n${name}` },
							{ type: "mrkdwn", text: `*Company:*\n${company}` },
							{ type: "mrkdwn", text: `*Email:*\n${email}` },
							{ type: "mrkdwn", text: `*Use Case:*\n${useCase}` },
							{ type: "mrkdwn", text: `*Team Size:*\n${teamSize || "Not provided"}` },
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
					console.error("Slack webhook failed:", response.status);
				}
			} catch (slackError) {
				console.error("Slack webhook error:", slackError);
			}
		} else {
			console.warn("SLACK_WEBHOOK_URL not configured");
		}

		await notifyHive({
			form: "AI Employee inquiry",
			fields: {
				Name: name,
				Company: company,
				Email: email,
				"Use case": useCase,
				"Team size": teamSize,
			},
		});

		return { success: true };
	});
