import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function getAdminToken() {
	return (globalThis as { process?: { env?: Record<string, string | undefined> } })
		.process?.env?.CAREERS_ADMIN_TOKEN;
}

function assertAdmin(adminToken: string) {
	const configuredToken = getAdminToken();

	if (!configuredToken) {
		throw new Error("CAREERS_ADMIN_TOKEN is not configured");
	}

	if (adminToken !== configuredToken) {
		throw new Error("Invalid admin token");
	}
}

export const submitApplication = mutation({
	args: {
		roleId: v.string(),
		roleTitle: v.string(),
		name: v.string(),
		email: v.string(),
		portfolioUrl: v.string(),
		source: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const roleId = args.roleId.trim();
		const roleTitle = args.roleTitle.trim();
		const name = args.name.trim();
		const email = normalizeEmail(args.email);
		const portfolioUrl = args.portfolioUrl.trim();

		if (!roleId || !roleTitle || !name || !email || !portfolioUrl) {
			throw new Error("Missing required fields");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email address");
		}

		try {
			const url = new URL(portfolioUrl);
			if (!["http:", "https:"].includes(url.protocol)) {
				throw new Error("Invalid portfolio URL");
			}
		} catch {
			throw new Error("Invalid portfolio URL");
		}

		const existing = await ctx.db
			.query("careerApplications")
			.withIndex("by_email_role", (q) =>
				q.eq("email", email).eq("roleId", roleId),
			)
			.first();

		const now = Date.now();

		if (existing) {
			await ctx.db.patch(existing._id, {
				roleTitle,
				name,
				portfolioUrl,
				source: args.source,
				updatedAt: now,
			});

			return { success: true, alreadyExists: true, id: existing._id };
		}

		const id = await ctx.db.insert("careerApplications", {
			roleId,
			roleTitle,
			name,
			email,
			portfolioUrl,
			source: args.source,
			createdAt: now,
			updatedAt: now,
		});

		return { success: true, alreadyExists: false, id };
	},
});

export const listApplications = query({
	args: {
		adminToken: v.string(),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminToken);

		const limit = Math.min(Math.max(args.limit ?? 200, 1), 500);

		return await ctx.db
			.query("careerApplications")
			.withIndex("by_created_at")
			.order("desc")
			.take(limit);
	},
});
