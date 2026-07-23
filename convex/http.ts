import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { healthCheck } from "./healthCheck";
import { internal } from "./_generated/api";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth, { cors: true });

http.route({
	path: "/health",
	method: "GET",
	handler: healthCheck,
});

// DEPRECATED: legacy Flux/observability waitlist endpoint.
// Kept active for compatibility, but new Hive waitlist work should not use it.
http.route({
	path: "/waitlist",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const body = await request.json();
		const { email, source } = body as { email: string; source?: string };

		if (!email) {
			return new Response(JSON.stringify({ success: false, message: "Email is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			});
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(JSON.stringify({ success: false, message: "Invalid email address" }), {
				status: 400,
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			});
		}

		try {
			const result = await ctx.runMutation(internal.waitlist.storeWaitlistEntry, {
				email: email.toLowerCase(),
				source: source || "cto-observability",
			});

			if (!result.success && result.reason === "already_exists") {
				return new Response(JSON.stringify({ success: true, message: "You're already on the waitlist!" }), {
					status: 200,
					headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
				});
			}

			// Send confirmation email via Resend component
			await ctx.scheduler.runAfter(0, internal.email.sendWaitlistConfirmation, {
				email: email.toLowerCase(),
			});

			return new Response(JSON.stringify({ success: true, message: "You're on the waitlist!" }), {
				status: 200,
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			});
		} catch (error) {
			console.error("Waitlist error:", error);
			return new Response(JSON.stringify({ success: false, message: "Something went wrong" }), {
				status: 500,
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			});
		}
	}),
});

// CORS preflight for waitlist
http.route({
	path: "/waitlist",
	method: "OPTIONS",
	handler: httpAction(async () => {
		return new Response(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		});
	}),
});

export default http;
