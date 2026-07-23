import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { getWritingAccess, requireWritingAdmin } from "./writingAuth";

const MAX_ARTICLE_LENGTH = 250_000;
const MAX_REFERENCE_LENGTH = 120_000;
const LOCK_DURATION_MS = 90_000;
const VERSION_INTERVAL_MS = 60_000;

function ensureLength(value: string, max: number, label: string) {
	if (value.length > max) throw new Error(`${label} is too large to save.`);
}

function slugify(value: string) {
	const slug = value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
	return slug || "untitled-article";
}

export const listArticles = query({
	args: { includeTrash: v.optional(v.boolean()) },
	handler: async (ctx, args) => {
		if (!(await getWritingAccess(ctx))) return [];
		const articles = await ctx.db.query("signalArticles").collect();
		return articles
			.filter((article) => args.includeTrash || article.status !== "trashed")
			.sort((a, b) => b.updatedAt - a.updatedAt);
	},
});

export const getArticle = query({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		if (!(await getWritingAccess(ctx))) return null;
		const article = await ctx.db.get(args.articleId);
		if (!article) return null;
		const [references, versions, lock, latestRevision] = await Promise.all([
			ctx.db
				.query("signalArticleReferences")
				.withIndex("by_article_updated", (q) => q.eq("articleId", args.articleId))
				.order("desc")
				.collect(),
			ctx.db
				.query("signalArticleVersions")
				.withIndex("by_article_saved", (q) => q.eq("articleId", args.articleId))
				.order("desc")
				.take(20),
			ctx.db
				.query("signalArticleLocks")
				.withIndex("by_article", (q) => q.eq("articleId", args.articleId))
				.unique(),
			ctx.db
				.query("signalArticleRevisions")
				.withIndex("by_article_revision", (q) => q.eq("articleId", args.articleId))
				.order("desc")
				.first(),
		]);
		return {
			article,
			references,
			versions,
			lock,
			liveRevision: latestRevision && !latestRevision.unpublishedAt ? latestRevision : null,
		};
	},
});

export const createArticle = mutation({
	args: { title: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		const title = args.title?.trim() || "Untitled idea";
		let slug = slugify(title);
		let suffix = 2;
		while (
			await ctx.db
				.query("signalArticles")
				.withIndex("by_slug", (q) => q.eq("slug", slug))
				.first()
		) {
			slug = `${slugify(title)}-${suffix}`;
			suffix += 1;
		}

		const now = Date.now();
		return await ctx.db.insert("signalArticles", {
			title,
			slug,
			deepRead: "",
			brief: "",
			briefStale: false,
			status: "draft",
			authorName: access.user.name || access.email.split("@")[0],
			authorEmail: access.email,
			authorAuthId: String(access.user._id),
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const acquireLock = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This Draft no longer exists.");
		const now = Date.now();
		const existing = await ctx.db
			.query("signalArticleLocks")
			.withIndex("by_article", (q) => q.eq("articleId", args.articleId))
			.unique();

		if (
			existing &&
			existing.expiresAt > now &&
			existing.authUserId !== String(access.user._id)
		) {
			return {
				acquired: false as const,
				editorName: existing.editorName,
				expiresAt: existing.expiresAt,
			};
		}

		const lock = {
			authUserId: String(access.user._id),
			editorEmail: access.email,
			editorName: access.user.name || access.email,
			expiresAt: now + LOCK_DURATION_MS,
			updatedAt: now,
		};
		if (existing) await ctx.db.patch(existing._id, lock);
		else await ctx.db.insert("signalArticleLocks", { articleId: args.articleId, ...lock });
		return { acquired: true as const, expiresAt: lock.expiresAt };
	},
});

export const releaseLock = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		const access = await getWritingAccess(ctx);
		if (!access) return;
		const lock = await ctx.db
			.query("signalArticleLocks")
			.withIndex("by_article", (q) => q.eq("articleId", args.articleId))
			.unique();
		if (lock?.authUserId === String(access.user._id)) await ctx.db.delete(lock._id);
	},
});

export const updateDraft = mutation({
	args: {
		articleId: v.id("signalArticles"),
		title: v.string(),
		slug: v.string(),
		deepRead: v.string(),
		brief: v.string(),
		briefApproved: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This Draft no longer exists.");
		if (article.status === "trashed") throw new Error("Restore this Draft before editing it.");

		ensureLength(args.title, 180, "Title");
		ensureLength(args.deepRead, MAX_ARTICLE_LENGTH, "Deep Read");
		ensureLength(args.brief, MAX_ARTICLE_LENGTH, "Brief");
		const now = Date.now();
		const lock = await ctx.db
			.query("signalArticleLocks")
			.withIndex("by_article", (q) => q.eq("articleId", args.articleId))
			.unique();
		if (
			lock &&
			lock.expiresAt > now &&
			lock.authUserId !== String(access.user._id)
		) {
			throw new Error(`${lock.editorName} is editing this Draft.`);
		}

		const slug = slugify(args.slug || args.title);
		const [slugOwner, latestRevision] = await Promise.all([
			ctx.db
				.query("signalArticles")
				.withIndex("by_slug", (q) => q.eq("slug", slug))
				.first(),
			ctx.db
				.query("signalArticleRevisions")
				.withIndex("by_article_revision", (q) => q.eq("articleId", article._id))
				.order("desc")
				.first(),
		]);
		if (slugOwner && slugOwner._id !== article._id) {
			throw new Error("Another article already uses this URL slug.");
		}
		if (latestRevision && slug !== latestRevision.slug) {
			throw new Error("A published article keeps the same stable URL.");
		}

		const latestVersion = await ctx.db
			.query("signalArticleVersions")
			.withIndex("by_article_saved", (q) => q.eq("articleId", args.articleId))
			.order("desc")
			.first();
		if (!latestVersion || now - latestVersion.savedAt >= VERSION_INTERVAL_MS) {
			await ctx.db.insert("signalArticleVersions", {
				articleId: article._id,
				title: article.title,
				slug: article.slug,
				deepRead: article.deepRead,
				brief: article.brief,
				savedBy: access.email,
				savedAt: now,
				source: "autosave",
			});
		}

		const deepChanged = args.deepRead !== article.deepRead;
		const draftChanged =
			args.title.trim() !== article.title ||
			slug !== article.slug ||
			deepChanged ||
			args.brief !== article.brief;
		await ctx.db.patch(article._id, {
			title: args.title.trim() || "Untitled idea",
			slug,
			deepRead: args.deepRead,
			brief: args.brief,
			briefStale: args.briefApproved
				? false
				: article.briefStale || (deepChanged && Boolean(article.brief)),
			status: article.status === "published" && draftChanged ? "draft" : article.status,
			updatedAt: now,
		});
		return { savedAt: now };
	},
});

export const approveBrief = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This Draft no longer exists.");
		if (!article.brief.trim()) throw new Error("Write the Brief before approving it.");
		await ctx.db.patch(article._id, { briefStale: false, updatedAt: Date.now() });
	},
});

export const restoreVersion = mutation({
	args: { articleId: v.id("signalArticles"), versionId: v.id("signalArticleVersions") },
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		const [article, version] = await Promise.all([
			ctx.db.get(args.articleId),
			ctx.db.get(args.versionId),
		]);
		if (!article || !version || version.articleId !== article._id) {
			throw new Error("That saved version is no longer available.");
		}
		const now = Date.now();
		const latestRevision = await ctx.db
			.query("signalArticleRevisions")
			.withIndex("by_article_revision", (q) => q.eq("articleId", article._id))
			.order("desc")
			.first();
		await ctx.db.insert("signalArticleVersions", {
			articleId: article._id,
			title: article.title,
			slug: article.slug,
			deepRead: article.deepRead,
			brief: article.brief,
			savedBy: access.email,
			savedAt: now,
			source: "restore",
		});
		await ctx.db.patch(article._id, {
			title: version.title,
			slug: latestRevision?.slug ?? version.slug,
			deepRead: version.deepRead,
			brief: version.brief,
			briefStale: Boolean(version.brief),
			status: article.status === "published" ? "draft" : article.status,
			updatedAt: now,
		});
	},
});

export const addReference = mutation({
	args: {
		articleId: v.id("signalArticles"),
		kind: v.union(v.literal("text"), v.literal("url"), v.literal("document")),
		title: v.string(),
		content: v.string(),
		sourceUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		if (!(await ctx.db.get(args.articleId))) throw new Error("This Draft no longer exists.");
		ensureLength(args.title, 180, "Reference title");
		ensureLength(args.content, MAX_REFERENCE_LENGTH, "Reference");
		if (args.sourceUrl) {
			const url = new URL(args.sourceUrl);
			if (!["http:", "https:"].includes(url.protocol)) throw new Error("Use an HTTP or HTTPS URL.");
		}
		const now = Date.now();
		return await ctx.db.insert("signalArticleReferences", {
			articleId: args.articleId,
			kind: args.kind,
			title: args.title.trim() || "Untitled reference",
			content: args.content,
			sourceUrl: args.sourceUrl,
			createdBy: access.email,
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const deleteReference = mutation({
	args: { referenceId: v.id("signalArticleReferences") },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		await ctx.db.delete(args.referenceId);
	},
});

export const markReady = mutation({
	args: { articleId: v.id("signalArticles"), ready: v.boolean() },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This Draft no longer exists.");
		if (article.status === "trashed") throw new Error("Restore this Draft before changing its status.");
		if (args.ready && (!article.deepRead.trim() || !article.brief.trim())) {
			throw new Error("Add both a Deep Read and a Brief before marking this Ready.");
		}
		if (args.ready && article.briefStale) {
			throw new Error("Review the Brief after the latest Deep Read changes.");
		}
		await ctx.db.patch(article._id, {
			status: args.ready ? "ready" : "draft",
			updatedAt: Date.now(),
		});
	},
});

export const publish = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		const access = await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This Draft no longer exists.");
		if (article.status !== "ready") throw new Error("Mark this Draft Ready before publishing.");
		if (!article.deepRead.trim() || !article.brief.trim()) {
			throw new Error("Add both a Deep Read and a Brief before publishing.");
		}
		if (article.briefStale) throw new Error("Review the Brief after the latest Deep Read changes.");

		const latest = await ctx.db
			.query("signalArticleRevisions")
			.withIndex("by_article_revision", (q) => q.eq("articleId", article._id))
			.order("desc")
			.first();
		const now = Date.now();
		if (latest && !latest.unpublishedAt) {
			await ctx.db.patch(latest._id, { unpublishedAt: now });
		}
		const revisionId = await ctx.db.insert("signalArticleRevisions", {
			articleId: article._id,
			revision: (latest?.revision ?? 0) + 1,
			title: article.title,
			slug: article.slug,
			deepRead: article.deepRead,
			brief: article.brief,
			authorName: article.authorName,
			authorEmail: article.authorEmail,
			publishedBy: access.email,
			publishedAt: now,
		});
		await ctx.db.patch(article._id, {
			status: "published",
			publishedAt: now,
			updatedAt: now,
		});
		return revisionId;
	},
});

export const unpublish = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article) throw new Error("This article no longer exists.");
		const latest = await ctx.db
			.query("signalArticleRevisions")
			.withIndex("by_article_revision", (q) => q.eq("articleId", article._id))
			.order("desc")
			.first();
		const now = Date.now();
		if (latest && !latest.unpublishedAt) await ctx.db.patch(latest._id, { unpublishedAt: now });
		await ctx.db.patch(article._id, { status: "draft", updatedAt: now });
	},
});

export const trashArticle = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article || article.status === "trashed") return;
		await ctx.db.patch(article._id, {
			statusBeforeTrash: article.status,
			status: "trashed",
			trashedAt: Date.now(),
			updatedAt: Date.now(),
		});
	},
});

export const restoreArticle = mutation({
	args: { articleId: v.id("signalArticles") },
	handler: async (ctx, args) => {
		await requireWritingAdmin(ctx);
		const article = await ctx.db.get(args.articleId);
		if (!article || article.status !== "trashed") return;
		await ctx.db.patch(article._id, {
			status: article.statusBeforeTrash ?? "draft",
			statusBeforeTrash: undefined,
			trashedAt: undefined,
			updatedAt: Date.now(),
		});
	},
});

export const getPublishedBySlug = query({
	args: { slug: v.string() },
	handler: async (ctx, args) => {
		const revision = await ctx.db
			.query("signalArticleRevisions")
			.withIndex("by_slug_published", (q) => q.eq("slug", args.slug))
			.order("desc")
			.first();
		return revision && !revision.unpublishedAt ? revision : null;
	},
});

export const listPublished = query({
	args: {},
	handler: async (ctx) => {
		const revisions = await ctx.db.query("signalArticleRevisions").order("desc").collect();
		const latest = new Map<string, (typeof revisions)[number]>();
		for (const revision of revisions) {
			if (!latest.has(revision.slug)) latest.set(revision.slug, revision);
		}
		return [...latest.values()].filter((revision) => !revision.unpublishedAt);
	},
});

export const getPublishedForExplanation = internalQuery({
	args: { slug: v.string() },
	handler: async (ctx, args) => {
		const revision = await ctx.db
			.query("signalArticleRevisions")
			.withIndex("by_slug_published", (q) => q.eq("slug", args.slug))
			.order("desc")
			.first();
		return revision && !revision.unpublishedAt ? revision : null;
	},
});
