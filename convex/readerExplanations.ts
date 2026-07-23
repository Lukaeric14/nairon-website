import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

export const getCached = internalQuery({
	args: { cacheKey: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("signalReaderExplanations")
			.withIndex("by_cache_key", (q) => q.eq("cacheKey", args.cacheKey))
			.first();
	},
});

export const useAllowance = internalMutation({
	args: { visitorId: v.string() },
	handler: async (ctx, args) => {
		const now = Date.now();
		const current = await ctx.db
			.query("signalReaderRateLimits")
			.withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
			.unique();
		if (!current) {
			await ctx.db.insert("signalReaderRateLimits", {
				visitorId: args.visitorId,
				windowStartedAt: now,
				count: 1,
			});
			return;
		}
		if (now - current.windowStartedAt >= WINDOW_MS) {
			await ctx.db.patch(current._id, { windowStartedAt: now, count: 1 });
			return;
		}
		if (current.count >= MAX_REQUESTS_PER_WINDOW) {
			throw new Error("You have reached the explanation limit. Try again in a few minutes.");
		}
		await ctx.db.patch(current._id, { count: current.count + 1 });
	},
});

export const storeCached = internalMutation({
	args: {
		cacheKey: v.string(),
		slug: v.string(),
		style: v.union(v.literal("simple"), v.literal("example"), v.literal("deeper")),
		answer: v.string(),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("signalReaderExplanations")
			.withIndex("by_cache_key", (q) => q.eq("cacheKey", args.cacheKey))
			.first();
		if (existing) return existing._id;
		return await ctx.db.insert("signalReaderExplanations", { ...args, createdAt: Date.now() });
	},
});
