import { v } from "convex/values";
import { authComponent } from "./auth";
import {
	internalQuery,
	mutation,
	query,
	type MutationCtx,
	type QueryCtx,
} from "./_generated/server";

type WritingContext = QueryCtx | MutationCtx;

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

function ownerEmails() {
	return new Set(
		(process.env.WRITING_STUDIO_OWNER_EMAILS ?? "obaid@naironai.com")
			.split(",")
			.map(normalizeEmail)
			.filter(Boolean),
	);
}

async function findStoredAccess(ctx: WritingContext, email: string) {
	return await ctx.db
		.query("writingAdmins")
		.withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
		.unique();
}

export async function getWritingAccess(ctx: WritingContext) {
	let user;
	try {
		user = await authComponent.getAuthUser(ctx as never);
	} catch {
		return null;
	}
	if (!user?.email) return null;

	const email = normalizeEmail(user.email);
	if (ownerEmails().has(email)) {
		return { user, email, role: "owner" as const };
	}

	const access = await findStoredAccess(ctx, email);
	if (!access) return null;
	return { user, email, role: access.role };
}

export async function requireWritingAdmin(ctx: WritingContext) {
	const access = await getWritingAccess(ctx);
	if (!access) throw new Error("Sign in with an authorized Writing Studio account.");
	return access;
}

export const getMyAccess = query({
	args: {},
	handler: async (ctx) => {
		const access = await getWritingAccess(ctx);
		if (!access) return null;
		return { email: access.email, name: access.user.name, role: access.role };
	},
});

export const authorizeIdentity = internalQuery({
	args: { email: v.string(), authUserId: v.string() },
	handler: async (ctx, args) => {
		const email = normalizeEmail(args.email);
		if (ownerEmails().has(email)) return { email, role: "owner" as const };

		const byAuthUser = await ctx.db
			.query("writingAdmins")
			.withIndex("by_auth_user", (q) => q.eq("authUserId", args.authUserId))
			.unique();
		const access =
			byAuthUser ??
			(await ctx.db
				.query("writingAdmins")
				.withIndex("by_email", (q) => q.eq("email", email))
				.unique());
		return access ? { email, role: access.role } : null;
	},
});

export const listAdmins = query({
	args: {},
	handler: async (ctx) => {
		const access = await getWritingAccess(ctx);
		if (!access) return [];
		if (access.role !== "owner") throw new Error("Only an owner can manage admins.");
		return await ctx.db.query("writingAdmins").collect();
	},
});

export const grantAdmin = mutation({
	args: {
		email: v.string(),
		role: v.union(v.literal("owner"), v.literal("admin")),
	},
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		if (access.role !== "owner") throw new Error("Only an owner can manage admins.");

		const email = normalizeEmail(args.email);
		if (!email.includes("@")) throw new Error("Enter a valid email address.");
		const existing = await findStoredAccess(ctx, email);
		const now = Date.now();
		if (existing) {
			await ctx.db.patch(existing._id, {
				role: args.role,
				grantedBy: access.email,
				updatedAt: now,
			});
			return existing._id;
		}

		return await ctx.db.insert("writingAdmins", {
			email,
			role: args.role,
			grantedBy: access.email,
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const revokeAdmin = mutation({
	args: { adminId: v.id("writingAdmins") },
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		if (access.role !== "owner") throw new Error("Only an owner can manage admins.");
		await ctx.db.delete(args.adminId);
	},
});
