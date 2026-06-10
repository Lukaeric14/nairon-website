// Posts form submissions to Hive's inbound webhook (a Slack-compatible ingest
// endpoint). Every public form on the site fires through this so leads land in
// Hive. Override the destination with the HIVE_WEBHOOK_URL env var; the fallback
// is the shared Nairon → Hive endpoint so submissions flow without extra config.

const HIVE_WEBHOOK_URL =
	process.env.HIVE_WEBHOOK_URL ??
	"https://giddy-clam-171.convex.site/webhooks/jZY3-ZnJLfXfNobmiOEIEq4hKi2wzf5bpF9wLsfsysI";

/**
 * Fire-and-forget notification of a form submission to Hive. Never throws —
 * a webhook failure must never break the underlying form submission.
 */
export async function notifyHive(input: {
	/** Human label for the form, e.g. "Contact" or "Career application". */
	form: string;
	/** Ordered field label → value map. Empty/blank values are dropped. */
	fields: Record<string, string | undefined | null>;
}): Promise<void> {
	if (!HIVE_WEBHOOK_URL) return;

	const entries = Object.entries(input.fields).filter(
		([, value]) => value != null && String(value).trim() !== "",
	) as [string, string][];

	// Slack-style mrkdwn summary for the `text` field, plus structured data.
	const text = [
		`*New ${input.form} submission*`,
		...entries.map(([label, value]) => `*${label}:* ${value}`),
	].join("\n");

	const body = {
		text,
		form: input.form,
		source: "naironai.com",
		fields: Object.fromEntries(entries),
		submittedAt: new Date().toISOString(),
	};

	try {
		const response = await fetch(HIVE_WEBHOOK_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			console.error("Hive webhook failed:", response.status);
		}
	} catch (error) {
		console.error("Hive webhook error:", error);
	}
}
