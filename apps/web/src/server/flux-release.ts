import { createServerFn } from "@tanstack/react-start";

const RELEASE_ENDPOINT =
	"https://api.github.com/repos/Nairon-AI/flux/releases/latest";

export const FLUX_RELEASE_FALLBACK = {
	version: "v2.38.0",
	url: "https://github.com/Nairon-AI/flux/releases/tag/v2.38.0",
} as const;

interface GitHubReleaseResponse {
	tag_name?: string;
	html_url?: string;
}

export const getFluxLatestRelease = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const headers: Record<string, string> = {
				Accept: "application/vnd.github+json",
				"Cache-Control": "no-cache",
			};

			const token = process.env.GITHUB_TOKEN;
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch(`${RELEASE_ENDPOINT}?t=${Date.now()}`, {
				headers,
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error(`GitHub API request failed: ${response.status}`);
			}

			const payload = (await response.json()) as GitHubReleaseResponse;
			const version = payload.tag_name?.trim();
			const url = payload.html_url?.trim();

			if (!version || !url) {
				return FLUX_RELEASE_FALLBACK;
			}

			return { version, url };
		} catch {
			return FLUX_RELEASE_FALLBACK;
		}
	},
);
