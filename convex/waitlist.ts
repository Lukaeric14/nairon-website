import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

// DEPRECATED: legacy Flux/observability waitlist actions.
// Kept for compatibility with historical /waitlist submissions and existing data.

// Check if email already exists
export const checkEmail = query({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("fluxWaitlist")
			.withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
			.first();
		return { exists: !!existing };
	},
});

// Store waitlist entry (internal only)
export const storeWaitlistEntry = internalMutation({
	args: {
		email: v.string(),
		source: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// Check for duplicate
		const existing = await ctx.db
			.query("fluxWaitlist")
			.withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
			.first();

		if (existing) {
			return { success: false, reason: "already_exists", id: existing._id };
		}

		const entryId = await ctx.db.insert("fluxWaitlist", {
			email: args.email.toLowerCase(),
			source: args.source,
			createdAt: Date.now(),
		});
		return { success: true, id: entryId };
	},
});

// Join waitlist and send Slack notification
export const joinWaitlist = action({
	args: {
		email: v.string(),
		source: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { email, source } = args;

		// Store in database
		const result = await ctx.runMutation(internal.waitlist.storeWaitlistEntry, {
			email,
			source,
		});

		if (!result.success && result.reason === "already_exists") {
			return { success: true, message: "You're already on the waitlist!" };
		}

		// Send Slack notification
		const webhookUrl =
			(globalThis as { process?: { env?: Record<string, string | undefined> } }).process
				?.env?.SLACK_WEBHOOK_URL;

		if (webhookUrl) {
			const slackMessage = {
				blocks: [
					{
						type: "header",
						text: {
							type: "plain_text",
							text: "Deprecated Flux/Observability Waitlist Signup",
							emoji: true,
						},
					},
					{
						type: "section",
						fields: [
							{
								type: "mrkdwn",
								text: `*Email:*\n${email}`,
							},
							{
								type: "mrkdwn",
								text: `*Source:*\n${source || "unknown"}`,
							},
						],
					},
					{
						type: "context",
						elements: [
							{
								type: "mrkdwn",
								text: `Signed up at ${new Date().toISOString()}`,
							},
						],
					},
				],
			};

			try {
				await fetch(webhookUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(slackMessage),
				});
			} catch (error) {
				console.error("Slack webhook error:", error);
			}
		}

		return { success: true, message: "You're on the waitlist!" };
	},
});
