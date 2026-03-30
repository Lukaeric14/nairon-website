#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const rootEnvPaths = [
	path.join(projectRoot, ".env"),
	path.join(projectRoot, ".env.local"),
];
const webEnvLocalPath = path.join(projectRoot, "apps/web/.env.local");
const timeoutMs = Number(process.env.CONVEX_ENV_SYNC_TIMEOUT_MS ?? 30_000);
const pollIntervalMs = 500;

function parseEnv(content) {
	const values = {};

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

async function readEnvFile(filePath) {
	try {
		return parseEnv(await fs.readFile(filePath, "utf8"));
	} catch {
		return {};
	}
}

function isUsableConvexUrl(value, kind) {
	if (!value) return false;
	if (value.includes("your-deployment") || value.includes("your-site")) return false;

	const suffix = kind === "site" ? ".convex.site" : ".convex.cloud";
	return value.startsWith("https://") && value.includes(suffix);
}

async function waitForConvexEnv() {
	const deadline = Date.now() + timeoutMs;

	while (Date.now() <= deadline) {
		const merged = {};
		for (const envPath of rootEnvPaths) {
			Object.assign(merged, await readEnvFile(envPath));
		}

		const convexUrl = merged.VITE_CONVEX_URL || merged.CONVEX_URL;
		const convexSiteUrl =
			merged.VITE_CONVEX_SITE_URL || merged.CONVEX_SITE_URL;

		if (
			isUsableConvexUrl(convexUrl, "cloud") &&
			isUsableConvexUrl(convexSiteUrl, "site")
		) {
			return {
				convexUrl,
				convexSiteUrl,
			};
		}

		await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
	}

	throw new Error(
		"Timed out waiting for Convex env. Start the backend first with `cd packages/backend && bun run dev`, then start the web app.",
	);
}

async function main() {
	const { convexUrl, convexSiteUrl } = await waitForConvexEnv();
	const existing = await readEnvFile(webEnvLocalPath);

	existing.VITE_CONVEX_URL = convexUrl;
	existing.VITE_CONVEX_SITE_URL = convexSiteUrl;

	const nextContent = `${Object.entries(existing)
		.map(([key, value]) => `${key}=${value}`)
		.join("\n")}\n`;

	await fs.writeFile(webEnvLocalPath, nextContent, "utf8");

	console.log(
		`[sync-convex-env] Synced ${convexUrl} and ${convexSiteUrl} to apps/web/.env.local`,
	);
}

main().catch((error) => {
	console.error(`[sync-convex-env] ${error.message}`);
	process.exit(1);
});
