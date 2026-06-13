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
