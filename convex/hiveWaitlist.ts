import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const storeHiveWaitlistEntry = internalMutation({
	args: {
		firstName: v.string(),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);
		const firstName = args.firstName.trim();

		const existing = await ctx.db
			.query("hiveWaitlist")
			.withIndex("by_email", (q) => q.eq("email", email))
			.first();

		if (existing) {
			return { success: false, reason: "already_exists" as const, id: existing._id };
		}

		const entryId = await ctx.db.insert("hiveWaitlist", {
			firstName,
			email,
			confirmationEmailSent: false,
			confirmationEmailError: undefined,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});

		return { success: true, id: entryId };
	},
});

export const markConfirmationEmailSent = internalMutation({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);
		const existing = await ctx.db
			.query("hiveWaitlist")
			.withIndex("by_email", (q) => q.eq("email", email))
			.first();

		if (!existing) return;

		await ctx.db.patch(existing._id, {
			confirmationEmailSent: true,
			confirmationEmailError: undefined,
			updatedAt: Date.now(),
		});
	},
});

export const markConfirmationEmailFailed = internalMutation({
	args: {
		email: v.string(),
		error: v.string(),
	},
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);
		const existing = await ctx.db
			.query("hiveWaitlist")
			.withIndex("by_email", (q) => q.eq("email", email))
			.first();

		if (!existing) return;

		await ctx.db.patch(existing._id, {
			confirmationEmailSent: false,
			confirmationEmailError: args.error,
			updatedAt: Date.now(),
		});
	},
});

export const joinHiveWaitlist = action({
	args: {
		firstName: v.string(),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const firstName = args.firstName.trim();
		const email = normalizeEmail(args.email);

		if (!firstName || !email) {
			throw new Error("Missing required fields");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email address");
		}

		const result = await ctx.runMutation(
			internal.hiveWaitlist.storeHiveWaitlistEntry,
			{
				firstName,
				email,
			},
		);

		if (!result.success && result.reason === "already_exists") {
			return { success: true, alreadyExists: true };
		}

		await ctx.scheduler.runAfter(0, internal.email.sendHiveWaitlistConfirmation, {
			firstName,
			email,
		});

		return { success: true, alreadyExists: false };
	},
});
