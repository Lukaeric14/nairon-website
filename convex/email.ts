import { Resend } from "@convex-dev/resend";
import { components, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const resend = new Resend(components.resend, {
  // Convex doesn't set NODE_ENV — use RESEND_TEST_MODE env var to opt in
  testMode: process.env.RESEND_TEST_MODE === "true",
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const sendWaitlistConfirmation = internalAction({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    // DEPRECATED: legacy Flux/observability waitlist confirmation.
    // Kept for compatibility with the historical /waitlist endpoint.
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0C0C0C; color: #E8E4DE; padding: 40px 20px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto;">
    <h1 style="font-size: 28px; font-weight: normal; margin-bottom: 32px;">
      You're on the <span style="color: #C9A96E; font-style: italic;">Observability</span> waitlist
    </h1>

    <p style="font-size: 16px; line-height: 1.7; color: #A39E96; margin-bottom: 32px;">
      We're building the developer productivity platform for the AI era—think DORA metrics, but for AI-native engineering. Measure how your teams are actually adopting agentic workflows, where friction lives in your SDLC, and which patterns produce the highest quality output.
    </p>

    <p style="font-size: 16px; line-height: 1.7; color: #A39E96; margin-bottom: 32px;">
      Org-level visibility into AI-Nativeness: team benchmarks, workflow quality scores, and actionable recommendations—not just dashboards, but the full tooling layer to improve how your engineering org collaborates with AI.
    </p>

    <p style="font-size: 16px; line-height: 1.7; color: #A39E96; margin-bottom: 32px;">
      Nairon is now focused on AI employees, Hive, and client automation work.
    </p>

    <p style="font-size: 16px; line-height: 1.7; color: #A39E96; margin-bottom: 32px;">
      We'll reach out when we're ready to onboard early users.
    </p>

    <p style="font-size: 14px; color: #666; margin-top: 48px;">
      — The Nairon team
    </p>
  </div>
</body>
</html>
		`;

    await resend.sendEmail(
      ctx,
      "Nairon <hello@naironai.com>",
      email,
      "You're on the Observability waitlist",
      emailHtml,
    );
  },
});

export const sendHiveWaitlistConfirmation = internalAction({
  args: {
    firstName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { firstName, email }) => {
    const escapedFirstName = escapeHtml(firstName);
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F5ED; color: #171612; padding: 40px 20px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(23, 22, 18, 0.1); padding: 32px;">
    <p style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #A77A15; margin: 0 0 20px;">
      Hive waitlist
    </p>

    <h1 style="font-size: 28px; line-height: 1.2; font-weight: 600; margin: 0 0 24px; color: #171612;">
      You're on the Hive waitlist, ${escapedFirstName}.
    </h1>

    <p style="font-size: 16px; line-height: 1.7; color: #5F5A50; margin: 0 0 20px;">
      Thanks for joining. Hive is the workspace we're building for teams to work with AI employees, workflows, and permissioned company context in one place.
    </p>

    <p style="font-size: 16px; line-height: 1.7; color: #5F5A50; margin: 0 0 20px;">
      We'll email you when we're ready to open access.
    </p>

    <p style="font-size: 14px; color: #8B806F; margin: 36px 0 0;">
      — The Nairon team
    </p>
  </div>
</body>
</html>
		`;

    await resend.sendEmail(
      ctx,
      "Nairon <hello@naironai.com>",
      email,
      "You're on the Hive waitlist",
      emailHtml,
    );

    await ctx.runMutation(internal.hiveWaitlist.markConfirmationEmailSent, {
      email,
    });
  },
});
