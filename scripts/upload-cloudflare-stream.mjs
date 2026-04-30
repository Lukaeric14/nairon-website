#!/usr/bin/env node

import { mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { openAsBlob } from "node:fs";

const accountId =
	process.env.CLOUDFLARE_ACCOUNT_ID || "b2a841211806aa59e0f0b15844207d50";
const token = process.env.CLOUDFLARE_API_TOKEN;
const videoDir = process.argv[2] || "apps/web/public/faq-videos";
const outputPath = process.argv[3] || ".context/cloudflare-stream-videos.json";

if (!token) {
	console.error("Missing CLOUDFLARE_API_TOKEN.");
	process.exit(1);
}

const files = (await readdir(videoDir))
	.filter((file) => file.endsWith(".mp4"))
	.sort();

if (files.length === 0) {
	console.error(`No .mp4 files found in ${videoDir}`);
	process.exit(1);
}

const uploads = [];

for (const file of files) {
	const path = join(videoDir, file);
	const form = new FormData();
	const blob = await openAsBlob(path, { type: "video/mp4" });

	form.append("file", blob, file);
	form.append("meta", JSON.stringify({ name: basename(file, ".mp4") }));
	form.append("requireSignedURLs", "false");

	console.log(`Uploading ${file}...`);

	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: form,
		},
	);
	const json = await response.json();

	if (!json.success) {
		console.error(JSON.stringify(json.errors ?? json, null, 2));
		process.exit(1);
	}

	const uid = json.result.uid;
	uploads.push({
		file,
		uid,
		embedSrc: `https://iframe.videodelivery.net/${uid}`,
		preview: json.result.preview,
		thumbnail: json.result.thumbnail,
	});
}

await mkdir(".context", { recursive: true });
await writeFile(outputPath, `${JSON.stringify(uploads, null, 2)}\n`);

console.log(`Wrote ${outputPath}`);
