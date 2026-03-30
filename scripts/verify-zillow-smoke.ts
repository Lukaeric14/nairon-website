import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const defaultUrl =
	"https://www.zillow.com/homedetails/200-Balmoral-Gardens-Ct-Lake-Saint-Louis-MO-63367/333821061_zpid/";
const targetUrl = process.argv[2] || defaultUrl;
const timeoutMs = 90_000;
const pollIntervalMs = 2_000;

function parseEnv(content: string): Record<string, string> {
	const values: Record<string, string> = {};

	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;

		const separatorIndex = line.indexOf("=");
		if (separatorIndex === -1) continue;

		const key = line.slice(0, separatorIndex).trim();
		const value = line
			.slice(separatorIndex + 1)
			.split(/\s+#/, 1)[0]
			.trim();

		if (key) values[key] = value;
	}

	return values;
}

async function getConvexUrl(): Promise<string> {
	if (process.env.CONVEX_URL) return process.env.CONVEX_URL;

	const rootEnvLocalPath = path.join(projectRoot, ".env.local");
	const env = parseEnv(await fs.readFile(rootEnvLocalPath, "utf8"));
	if (!env.CONVEX_URL) {
		throw new Error("CONVEX_URL is missing from repo root .env.local");
	}

	return env.CONVEX_URL;
}

async function main() {
	const convexUrl = await getConvexUrl();
	const client = new ConvexHttpClient(convexUrl);

	console.log(`[smoke] Convex URL: ${convexUrl}`);
	console.log(`[smoke] Zillow URL: ${targetUrl}`);

	const jobId = await client.mutation(api.pdfJob.createJob, {
		zillowUrl: targetUrl,
	});
	console.log(`[smoke] Created job: ${jobId}`);

	const startedAt = Date.now();
	let lastStatus: string | undefined;

	while (Date.now() - startedAt < timeoutMs) {
		const job = await client.query(api.pdfJob.getJob, { jobId });
		if (!job) {
			throw new Error("Job disappeared before completion");
		}

		if (job.status !== lastStatus) {
			lastStatus = job.status;
			console.log(
				`[smoke] status=${job.status} totalImages=${job.totalImages ?? 0} processedImages=${job.processedImages ?? 0}`,
			);
		}

		if (job.status === "completed") {
			const listing = job.listingJson ? JSON.parse(job.listingJson) : null;
			console.log(
				`[smoke] completed address=${listing?.address ?? ""} price=${listing?.price ?? ""} images=${listing?.images?.length ?? 0}`,
			);
			return;
		}

		if (job.status === "failed") {
			throw new Error(job.error || "Job failed without an error message");
		}

		await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
	}

	throw new Error(`Timed out after ${timeoutMs / 1000}s waiting for job completion`);
}

main().catch((error) => {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`[smoke] failed: ${message}`);
	process.exit(1);
});
