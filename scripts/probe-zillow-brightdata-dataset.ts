import process from "node:process";

const apiKey = process.env.BRIGHTDATA_API_KEY;
const datasetId =
	process.env.BRIGHTDATA_DATASET_ID || "gd_lfqkr8wm13ixtbd8f5";
const targetUrl =
	process.argv[2] ||
	process.env.TARGET_URL ||
	"https://www.zillow.com/homedetails/200-Balmoral-Gardens-Ct-Lake-Saint-Louis-MO-63367/333821061_zpid/";

function parseItems(body: string): Record<string, unknown>[] {
	const trimmed = body.trim();
	if (!trimmed) {
		throw new Error("Bright Data returned an empty response body");
	}

	try {
		const parsed = JSON.parse(trimmed);
		return Array.isArray(parsed) ? parsed : [parsed];
	} catch {
		return trimmed
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean)
			.map((line) => JSON.parse(line));
	}
}

async function fetchSnapshot(snapshotId: string): Promise<Record<string, unknown>[]> {
	const deadline = Date.now() + 90_000;

	while (Date.now() < deadline) {
		const progressResponse = await fetch(
			`https://api.brightdata.com/datasets/v3/progress/${snapshotId}`,
			{
				headers: { Authorization: `Bearer ${apiKey}` },
			},
		);

		if (!progressResponse.ok) {
			throw new Error(
				`Bright Data progress check failed (${progressResponse.status})`,
			);
		}

		const progress = await progressResponse.json();
		const status =
			progress && typeof progress === "object" && "status" in progress
				? String(progress.status)
				: "unknown";

		console.log(`[brightdata] snapshot=${snapshotId} status=${status}`);

		if (status === "ready") {
			const downloadResponse = await fetch(
				`https://api.brightdata.com/datasets/snapshots/${snapshotId}/download?format=json`,
				{
					headers: { Authorization: `Bearer ${apiKey}` },
				},
			);

			if (!downloadResponse.ok) {
				throw new Error(
					`Bright Data snapshot download failed (${downloadResponse.status})`,
				);
			}

			return parseItems(await downloadResponse.text());
		}

		if (status === "failed") {
			throw new Error(`Bright Data snapshot ${snapshotId} failed`);
		}

		await new Promise((resolve) => setTimeout(resolve, 2_000));
	}

	throw new Error(`Bright Data snapshot ${snapshotId} timed out`);
}

async function main() {
	if (!apiKey) {
		throw new Error("Set BRIGHTDATA_API_KEY before running this probe.");
	}

	const query = new URLSearchParams({
		dataset_id: datasetId,
		notify: "false",
		include_errors: "true",
		format: "json",
	});

	console.log(`[brightdata] dataset=${datasetId}`);
	console.log(`[brightdata] url=${targetUrl}`);

	const response = await fetch(
		`https://api.brightdata.com/datasets/v3/scrape?${query.toString()}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				input: [{ url: targetUrl }],
			}),
		},
	);

	const body = await response.text();
	let items: Record<string, unknown>[] = [];

	if (response.status === 202) {
		const parsed = JSON.parse(body);
		if (!parsed.snapshot_id) {
			throw new Error("Bright Data returned 202 without a snapshot_id");
		}
		console.log(`[brightdata] queued snapshot=${parsed.snapshot_id}`);
		items = await fetchSnapshot(parsed.snapshot_id);
	} else if (response.ok) {
		items = parseItems(body);
	} else {
		throw new Error(
			`Bright Data scrape failed (${response.status}): ${body.slice(0, 500)}`,
		);
	}

	const item = items[0];
	if (!item || typeof item !== "object") {
		throw new Error("Bright Data returned no listing data");
	}

	const record = item as Record<string, unknown>;
	const photos = Array.isArray(record.photos) ? record.photos : [];
	const output = {
		zpid: record.zpid,
		address: record.streetAddress,
		city: record.city,
		state: record.state,
		price: record.price,
		bedrooms: record.bedrooms,
		bathrooms: record.bathrooms,
		livingArea: record.livingArea,
		photoCount: record.photoCount,
		extractedPhotos: photos.length,
		url: record.url || record.hdpUrl,
	};

	console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : String(error));
	process.exit(1);
});
