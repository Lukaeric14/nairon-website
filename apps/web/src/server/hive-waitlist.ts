import { createServerFn } from "@tanstack/react-start";

interface HiveWaitlistData {
	name: string;
	company: string;
	email: string;
	role: string;
	source: string;
}

export const submitHiveWaitlist = createServerFn({ method: "POST" })
	.inputValidator((data: HiveWaitlistData) => data)
	.handler(async ({ data }) => {
		const { name, company, email, role, source } = data;

		if (!name || !company || !email) {
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
							text: "New Hive Waitlist Signup",
							emoji: true,
						},
					},
					{
						type: "section",
						fields: [
							{ type: "mrkdwn", text: `*Name:*\n${name}` },
							{ type: "mrkdwn", text: `*Company:*\n${company}` },
							{ type: "mrkdwn", text: `*Email:*\n${email}` },
							{ type: "mrkdwn", text: `*Role:*\n${role || "Not provided"}` },
							{ type: "mrkdwn", text: `*Source:*\n${source || "Not provided"}` },
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

		return { success: true };
	});
