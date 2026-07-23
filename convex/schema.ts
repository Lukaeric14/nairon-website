import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	// Better-Auth tables
	users: defineTable({
		name: v.string(),
		email: v.string(),
		emailVerified: v.boolean(),
		image: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_email", ["email"]),

	sessions: defineTable({
		userId: v.id("users"),
		token: v.string(),
		expiresAt: v.number(),
		ipAddress: v.optional(v.string()),
		userAgent: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_token", ["token"])
		.index("by_userId", ["userId"]),

	accounts: defineTable({
		userId: v.id("users"),
		accountId: v.string(),
		providerId: v.string(),
		accessToken: v.optional(v.string()),
		refreshToken: v.optional(v.string()),
		accessTokenExpiresAt: v.optional(v.number()),
		refreshTokenExpiresAt: v.optional(v.number()),
		scope: v.optional(v.string()),
		idToken: v.optional(v.string()),
		password: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_userId", ["userId"])
		.index("by_providerId_accountId", ["providerId", "accountId"]),

	verifications: defineTable({
		identifier: v.string(),
		value: v.string(),
		expiresAt: v.number(),
		createdAt: v.optional(v.number()),
		updatedAt: v.optional(v.number()),
	}).index("by_identifier", ["identifier"]),

	// Signals Writing Studio authorization. Better Auth owns identities;
	// this table owns the small set of people allowed into the Studio.
	writingAdmins: defineTable({
		email: v.string(),
		authUserId: v.optional(v.string()),
		role: v.union(v.literal("owner"), v.literal("admin")),
		grantedBy: v.string(),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_email", ["email"])
		.index("by_auth_user", ["authUserId"]),

	signalArticles: defineTable({
		title: v.string(),
		slug: v.string(),
		deepRead: v.string(),
		brief: v.string(),
		briefStale: v.boolean(),
		status: v.union(
			v.literal("draft"),
			v.literal("ready"),
			v.literal("published"),
			v.literal("trashed"),
		),
		statusBeforeTrash: v.optional(
			v.union(v.literal("draft"), v.literal("ready"), v.literal("published")),
		),
		authorName: v.string(),
		authorEmail: v.string(),
		authorAuthId: v.string(),
		createdAt: v.number(),
		updatedAt: v.number(),
		publishedAt: v.optional(v.number()),
		trashedAt: v.optional(v.number()),
	})
		.index("by_slug", ["slug"])
		.index("by_status_updated", ["status", "updatedAt"]),

	signalArticleReferences: defineTable({
		articleId: v.id("signalArticles"),
		kind: v.union(v.literal("text"), v.literal("url"), v.literal("document")),
		title: v.string(),
		content: v.string(),
		sourceUrl: v.optional(v.string()),
		createdBy: v.string(),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_article_updated", ["articleId", "updatedAt"]),

	signalArticleVersions: defineTable({
		articleId: v.id("signalArticles"),
		title: v.string(),
		slug: v.string(),
		deepRead: v.string(),
		brief: v.string(),
		savedBy: v.string(),
		savedAt: v.number(),
		source: v.union(v.literal("autosave"), v.literal("restore")),
	}).index("by_article_saved", ["articleId", "savedAt"]),

	signalArticleRevisions: defineTable({
		articleId: v.id("signalArticles"),
		revision: v.number(),
		title: v.string(),
		slug: v.string(),
		deepRead: v.string(),
		brief: v.string(),
		authorName: v.string(),
		authorEmail: v.string(),
		publishedBy: v.string(),
		publishedAt: v.number(),
		unpublishedAt: v.optional(v.number()),
	})
		.index("by_article_revision", ["articleId", "revision"])
		.index("by_slug_published", ["slug", "publishedAt"]),

	signalArticleLocks: defineTable({
		articleId: v.id("signalArticles"),
		authUserId: v.string(),
		editorEmail: v.string(),
		editorName: v.string(),
		expiresAt: v.number(),
		updatedAt: v.number(),
	}).index("by_article", ["articleId"]),

	signalReaderExplanations: defineTable({
		cacheKey: v.string(),
		slug: v.string(),
		style: v.union(v.literal("simple"), v.literal("example"), v.literal("deeper")),
		answer: v.string(),
		createdAt: v.number(),
	}).index("by_cache_key", ["cacheKey"]),

	signalReaderRateLimits: defineTable({
		visitorId: v.string(),
		windowStartedAt: v.number(),
		count: v.number(),
	}).index("by_visitor", ["visitorId"]),

	// Example table
	tasks: defineTable({
		text: v.string(),
		isCompleted: v.boolean(),
		userId: v.optional(v.id("users")),
		createdAt: v.number(),
	}),

	// Contact form submissions
	contactSubmissions: defineTable({
		firstName: v.string(),
		lastName: v.string(),
		email: v.string(),
		phone: v.string(),
		message: v.string(),
		createdAt: v.number(),
	}).index("by_email", ["email"]),

	// Hive platform waitlist
	hiveWaitlist: defineTable({
		firstName: v.string(),
		email: v.string(),
		confirmationEmailSent: v.optional(v.boolean()),
		confirmationEmailError: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	}).index("by_email", ["email"]),

	// Signals newsletter subscribers
	newsletterSubscribers: defineTable({
		email: v.string(),
		source: v.optional(v.string()), // e.g., "Landing newsletter"
		createdAt: v.number(),
	}).index("by_email", ["email"]),

	// Career role applications
	careerApplications: defineTable({
		roleId: v.string(),
		roleTitle: v.string(),
		name: v.string(),
		email: v.string(),
		portfolioUrl: v.string(),
		toolingWorkflow: v.optional(v.string()),
		source: v.optional(v.string()),
		applicationFieldsJson: v.optional(v.string()),
		status: v.optional(
			v.union(
				v.literal("new"),
				v.literal("strong"),
				v.literal("maybe"),
				v.literal("rejected"),
			),
		),
		statusUpdatedAt: v.optional(v.number()),
		statusUpdatedBy: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_email_role", ["email", "roleId"])
		.index("by_created_at", ["createdAt"]),

	// Property PDF generation jobs
	pdfJobs: defineTable({
		zillowUrl: v.string(),
		status: v.union(
			v.literal("pending"),
			v.literal("scraping"),
			v.literal("classifying"),
			v.literal("enhancing"),
			v.literal("generating"),
			v.literal("completed"),
			v.literal("failed"),
		),
		// Listing data stored as JSON string (too complex for Convex schema)
		listingJson: v.optional(v.string()),
		error: v.optional(v.string()),
		// Image processing progress
		totalImages: v.optional(v.number()),
		processedImages: v.optional(v.number()),
		// Optional email for async delivery
		notifyEmail: v.optional(v.string()),
		emailSent: v.optional(v.boolean()),
		createdAt: v.number(),
		completedAt: v.optional(v.number()),
	}).index("by_url", ["zillowUrl"]),

	// DEPRECATED: legacy Flux/observability waitlist. Kept for existing data.
	fluxWaitlist: defineTable({
		email: v.string(),
		source: v.optional(v.string()), // e.g., "cto-observability", "landing-page"
		createdAt: v.number(),
	}).index("by_email", ["email"]),
});
