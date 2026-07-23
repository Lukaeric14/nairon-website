import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

export const authComponent: ReturnType<typeof createClient<DataModel>> =
	createClient<DataModel>(components.betterAuth);

export function createAuth(
	ctx: GenericCtx<DataModel>,
): ReturnType<typeof betterAuth> {
	const siteUrl = process.env.SITE_URL ?? "http://localhost:3001";
	const allowUnverifiedEmail =
		process.env.WRITING_STUDIO_ALLOW_UNVERIFIED_EMAIL === "true";

	return betterAuth({
		baseURL: process.env.CONVEX_SITE_URL,
		trustedOrigins: [siteUrl],
		database: authComponent.adapter(ctx),
		emailVerification: {
			autoSignInAfterVerification: true,
			sendOnSignIn: !allowUnverifiedEmail,
			sendOnSignUp: !allowUnverifiedEmail,
			sendVerificationEmail: async ({ user, url }) => {
				if (allowUnverifiedEmail) return;
				const apiKey = process.env.RESEND_API_KEY;
				if (!apiKey) throw new Error("Admin email verification is not configured.");
				const response = await fetch("https://api.resend.com/emails", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${apiKey}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						from: "Nairon <hello@naironai.com>",
						to: [user.email],
						subject: "Verify your Nairon Writing Studio email",
						text: `Verify your email to open the Nairon Writing Studio:\n\n${url}\n\nIf you did not request this, you can ignore this message.`,
					}),
				});
				if (!response.ok) throw new Error("Admin email verification could not be sent.");
			},
		},
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: !allowUnverifiedEmail,
		},
		plugins: [
			crossDomain({ siteUrl }),
			convex({ authConfig, jwksRotateOnTokenGenerationError: true }),
		],
	});
}

export const { getAuthUser } = authComponent.clientApi();
