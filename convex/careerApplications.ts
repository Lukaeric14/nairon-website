import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const CAREERS_ADMIN_EMAILS = new Set(["obaid@naironai.com", "luka@naironai.com"]);
const applicationStatus = v.union(
	v.literal("new"),
	v.literal("strong"),
	v.literal("maybe"),
	v.literal("rejected"),
);

function getAdminToken() {
	return (globalThis as { process?: { env?: Record<string, string | undefined> } })
		.process?.env?.CAREERS_ADMIN_TOKEN;
}

function assertAdmin(adminEmail: string, adminToken: string) {
	const configuredToken = getAdminToken();
	const normalizedAdminEmail = normalizeEmail(adminEmail);

	if (!configuredToken) {
		throw new Error("CAREERS_ADMIN_TOKEN is not configured");
	}

	if (adminToken !== configuredToken) {
		throw new Error("Invalid admin token");
	}

	if (!CAREERS_ADMIN_EMAILS.has(normalizedAdminEmail)) {
		throw new Error("This email is not authorized for careers admin");
	}
}

export const submitApplication = mutation({
	args: {
		roleId: v.string(),
		roleTitle: v.string(),
		name: v.string(),
		email: v.string(),
		portfolioUrl: v.string(),
		toolingWorkflow: v.string(),
		source: v.optional(v.string()),
		applicationFieldsJson: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const roleId = args.roleId.trim();
		const roleTitle = args.roleTitle.trim();
		const name = args.name.trim();
		const email = normalizeEmail(args.email);
		const portfolioUrl = args.portfolioUrl.trim();
		const toolingWorkflow = args.toolingWorkflow.trim();

		if (
			!roleId ||
			!roleTitle ||
			!name ||
			!email ||
			!portfolioUrl ||
			!toolingWorkflow
		) {
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
				toolingWorkflow,
				source: args.source,
				applicationFieldsJson: args.applicationFieldsJson,
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
			toolingWorkflow,
			source: args.source,
			applicationFieldsJson: args.applicationFieldsJson,
			status: "new",
			createdAt: now,
			updatedAt: now,
		});

		return { success: true, alreadyExists: false, id };
	},
});

export const listApplications = query({
	args: {
		adminEmail: v.string(),
		adminToken: v.string(),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminEmail, args.adminToken);

		const limit = Math.min(Math.max(args.limit ?? 200, 1), 500);

		return await ctx.db
			.query("careerApplications")
			.withIndex("by_created_at")
			.order("desc")
			.take(limit);
	},
});

export const updateApplicationStatus = mutation({
	args: {
		adminEmail: v.string(),
		adminToken: v.string(),
		id: v.id("careerApplications"),
		status: applicationStatus,
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminEmail, args.adminToken);

		const existing = await ctx.db.get(args.id);
		if (!existing) {
			throw new Error("Application not found");
		}

		const now = Date.now();
		await ctx.db.patch(args.id, {
			status: args.status,
			statusUpdatedAt: now,
			statusUpdatedBy: normalizeEmail(args.adminEmail),
			updatedAt: now,
		});

		return { success: true, id: args.id, status: args.status };
	},
});

export const deleteApplication = mutation({
	args: {
		adminEmail: v.string(),
		adminToken: v.string(),
		id: v.id("careerApplications"),
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminEmail, args.adminToken);

		const existing = await ctx.db.get(args.id);
		if (!existing) {
			throw new Error("Application not found");
		}

		await ctx.db.delete(args.id);

		return { success: true, id: args.id };
	},
});
