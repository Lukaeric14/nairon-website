import { createServerFn } from "@tanstack/react-start";

const SIGNALS_FALLBACK = 128;
// DEPRECATED: Flux recommendations are retired from the public website. Keep the
// fallback response for old components, but do not fetch Flux data anymore.
// const TREE_ENDPOINT =
// 	"https://api.github.com/repos/Nairon-AI/flux-recommendations/git/trees/main?recursive=1";

// interface GitTreeItem {
// 	path: string;
// 	type: string;
// }

// interface GitTreeResponse {
// 	tree?: GitTreeItem[];
// }

// const isSignalFile = (item: GitTreeItem) => {
// 	const path = item.path.toLowerCase();
// 	return (
// 		item.type === "blob" &&
// 		(path.endsWith(".yaml") || path.endsWith(".yml")) &&
// 		!path.startsWith(".github/") &&
// 		!path.endsWith("schema.yaml") &&
// 		!path.endsWith("accounts.yaml") &&
// 		!path.includes("/pending/")
// 	);
// };

export const getFluxSignalCount = createServerFn({ method: "GET" }).handler(
	async () => {
		return { count: SIGNALS_FALLBACK };
		// try {
		// 	const headers: Record<string, string> = {
		// 		Accept: "application/vnd.github+json",
		// 		"Cache-Control": "no-cache",
		// 	};
		// 	const token = process.env.GITHUB_TOKEN;
		// 	if (token) {
		// 		headers.Authorization = `Bearer ${token}`;
		// 	}
		// 	const response = await fetch(`${TREE_ENDPOINT}&t=${Date.now()}`, {
		// 		headers,
		// 		cache: "no-store",
		// 	});
		// 	if (!response.ok) {
		// 		throw new Error(`GitHub API request failed: ${response.status}`);
		// 	}
		// 	const payload = (await response.json()) as GitTreeResponse;
		// 	const count = (payload.tree ?? []).filter(isSignalFile).length;
		// 	return { count: count || SIGNALS_FALLBACK };
		// } catch {
		// 	return { count: SIGNALS_FALLBACK };
		// }
	},
);
