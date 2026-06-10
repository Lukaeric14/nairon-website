import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const storeNewsletterSubscriber = internalMutation({
	args: {
		email: v.string(),
		source: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);

		const existing = await ctx.db
			.query("newsletterSubscribers")
			.withIndex("by_email", (q) => q.eq("email", email))
			.first();

		if (existing) {
			return { success: false, reason: "already_exists" as const, id: existing._id };
		}

		const id = await ctx.db.insert("newsletterSubscribers", {
			email,
			source: args.source,
			createdAt: Date.now(),
		});

		return { success: true, id };
	},
});

export const subscribeToNewsletter = action({
	args: {
		email: v.string(),
		source: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);

		if (!email) {
			throw new Error("Missing email");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email address");
		}

		const result = await ctx.runMutation(
			internal.newsletter.storeNewsletterSubscriber,
			{ email, source: args.source },
		);

		if (!result.success && result.reason === "already_exists") {
			return { success: true, alreadyExists: true };
		}

		return { success: true, alreadyExists: false };
	},
});
