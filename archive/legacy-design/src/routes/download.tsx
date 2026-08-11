import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink, MonitorDown, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";

const desktopFeedBase = "https://pub-d2c6ed77dc6a4e3c8bb10bc046eea41a.r2.dev";
const androidInternalTrack =
	"https://play.google.com/apps/internaltest/4700776313057299128";
const testFlightApp = "https://apps.apple.com/app/testflight/id899247664";
const appStoreConnect =
	"https://appstoreconnect.apple.com/apps/6762267127/testflight/ios";

const desktopManifestUrls = {
	mac: `${desktopFeedBase}/latest-mac.yml`,
	windows: `${desktopFeedBase}/latest.yml`,
};

const mobileVersions = {
	ios: { version: "0.5.12", build: "21" },
	android: { version: "0.5.12", build: "21" },
};

const breadcrumbsJsonLd = JSON.stringify(
	breadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Download", path: "/download" },
	]),
);

export const Route = createFileRoute("/download")({
	component: DownloadPage,
	head: () => {
		const base = seoHead({
			title: "Download Hive - Desktop and Mobile Apps",
			description:
				"Download the current Hive desktop app and find the mobile install channels for iOS TestFlight and Android internal testing.",
			path: "/download",
			noindex: true,
		});
		return {
			...base,
			scripts: [{ type: "application/ld+json", children: breadcrumbsJsonLd }],
		};
	},
});

type DesktopPlatformDownload = {
	version: string | null;
	href: string;
	manifest: string;
	hasInstaller: boolean;
};

type DesktopDownloadState = {
	mac: DesktopPlatformDownload;
	windows: DesktopPlatformDownload;
	source:
		| "Loading latest manifests"
		| "R2 latest manifests"
		| "Partial R2 manifests"
		| "Manifest unavailable";
};

function parseVersion(manifest: string) {
	return manifest.match(/^version:\s*(.+)$/m)?.[1]?.trim();
}

function parseFileUrl(manifest: string, extension: string) {
	const escapedExtension = extension.replace(".", "\\.");
	const match = manifest.match(
		new RegExp(`url:\\s*([^\\s]+${escapedExtension})(?:\\s|$)`, "m"),
	);
	return match?.[1]?.trim();
}

async function fetchManifest(url: string) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`manifest unavailable: ${url}`);
	return response.text();
}

function fromManifestResult(
	result: PromiseSettledResult<string>,
	manifestUrl: string,
	extension: string,
): DesktopPlatformDownload {
	if (result.status !== "fulfilled") {
		return {
			version: null,
			href: manifestUrl,
			manifest: manifestUrl,
			hasInstaller: false,
		};
	}

	const version = parseVersion(result.value) ?? null;
	const fileUrl = parseFileUrl(result.value, extension);

	return {
		version,
		href: fileUrl ? `${desktopFeedBase}/${fileUrl}` : manifestUrl,
		manifest: manifestUrl,
		hasInstaller: Boolean(fileUrl),
	};
}

function sourceFor(downloads: DesktopPlatformDownload[]): DesktopDownloadState["source"] {
	const loadedCount = downloads.filter((download) => download.hasInstaller).length;
	if (loadedCount === downloads.length) return "R2 latest manifests";
	if (loadedCount > 0) return "Partial R2 manifests";
	return "Manifest unavailable";
}

function useDesktopDownloads() {
	const [downloads, setDownloads] = useState<DesktopDownloadState>({
		mac: {
			version: null,
			href: desktopManifestUrls.mac,
			manifest: desktopManifestUrls.mac,
			hasInstaller: false,
		},
		windows: {
			version: null,
			href: desktopManifestUrls.windows,
			manifest: desktopManifestUrls.windows,
			hasInstaller: false,
		},
		source: "Loading latest manifests",
	});

	useEffect(() => {
		let cancelled = false;

		async function loadManifests() {
			const [macResult, windowsResult] = await Promise.allSettled([
				fetchManifest(desktopManifestUrls.mac),
				fetchManifest(desktopManifestUrls.windows),
			]);

			if (!cancelled) {
				const mac = fromManifestResult(macResult, desktopManifestUrls.mac, ".dmg");
				const windows = fromManifestResult(
					windowsResult,
					desktopManifestUrls.windows,
					".exe",
				);
				setDownloads({
					mac,
					windows,
					source: sourceFor([mac, windows]),
				});
			}
		}

		loadManifests();
		return () => {
			cancelled = true;
		};
	}, []);

	return downloads;
}

function DownloadPage() {
	useCalInit();
	const desktop = useDesktopDownloads();
	const desktopCards = useMemo(
		() => [
			{
				name: "macOS",
				version: desktop.mac.version,
				detail: "Universal DMG for Apple Silicon and Intel Macs.",
				href: desktop.mac.href,
				label: desktop.mac.hasInstaller ? "Download DMG" : "View manifest",
			},
			{
				name: "Windows",
				version: desktop.windows.version,
				detail: "Signed installer for Windows desktops.",
				href: desktop.windows.href,
				label: desktop.windows.hasInstaller ? "Download EXE" : "View manifest",
			},
		],
		[
			desktop.mac.hasInstaller,
			desktop.mac.href,
			desktop.mac.version,
			desktop.windows.hasInstaller,
			desktop.windows.href,
			desktop.windows.version,
		],
	);

	return (
		<div className="font-geist min-h-screen" style={{ backgroundColor: "var(--ds-shell)" }}>
			<Navbar />
			<main className="px-6 pt-32 pb-20 md:pt-40">
				<section className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] md:items-end">
					<div>
						<p
							className="mb-5 font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em]"
							style={{ color: "var(--brand-blue)" }}
						>
							Hive downloads
						</p>
						<h1 className="max-w-3xl text-5xl font-medium leading-[0.95] text-ds-text-primary md:text-7xl">
							Install the current Hive app.
						</h1>
						<p className="mt-7 max-w-2xl text-lg leading-8 text-ds-text-secondary">
							Desktop installers come from the public R2 updater feed. Mobile
							installs come through TestFlight and Play internal testing, so
							store membership controls what build appears on each phone.
						</p>
					</div>

					<div className="rounded-xl border border-ds-border bg-ds-surface p-6">
						<div className="flex items-start justify-between gap-6">
							<div>
								<p className="text-sm text-ds-text-tertiary">Desktop feed</p>
								<div className="mt-3 space-y-2 text-ds-text-primary">
									<p className="text-2xl font-medium">
										macOS {desktop.mac.version ? `v${desktop.mac.version}` : "latest"}
									</p>
									<p className="text-2xl font-medium">
										Windows{" "}
										{desktop.windows.version ? `v${desktop.windows.version}` : "latest"}
									</p>
								</div>
							</div>
							<MonitorDown className="mt-1 h-8 w-8" style={{ color: "var(--brand-blue)" }} />
						</div>
						<div className="mt-8 space-y-3 text-sm text-ds-text-tertiary">
							<p>Source: {desktop.source}</p>
							<a
								href={desktop.mac.manifest}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 transition-colors hover:text-ds-text-primary"
								style={{ color: "var(--brand-blue)" }}
							>
								View mac manifest
								<ExternalLink className="h-3.5 w-3.5" />
							</a>
							<a
								href={desktop.windows.manifest}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 transition-colors hover:text-ds-text-primary"
								style={{ color: "var(--brand-blue)" }}
							>
								View Windows manifest
								<ExternalLink className="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</section>

				<section className="mx-auto mt-16 max-w-6xl">
					<div className="grid gap-px overflow-hidden rounded-xl border border-ds-border bg-ds-border md:grid-cols-2">
						{desktopCards.map((card) => (
							<a
								key={card.name}
								href={card.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group bg-ds-surface p-7 transition-colors hover:bg-ds-surface-raised"
							>
								<div className="flex min-h-[220px] flex-col justify-between gap-10">
									<div>
										<div className="flex items-start justify-between gap-6">
											<h2 className="text-3xl font-medium text-ds-text-primary">
												{card.name}
											</h2>
											<Download className="h-6 w-6 transition-transform group-hover:translate-y-0.5" style={{ color: "var(--brand-blue)" }} />
										</div>
										<p className="mt-3 text-sm font-semibold" style={{ color: "var(--brand-blue)" }}>
											{card.version
												? `Current version v${card.version}`
												: "Current version from latest manifest"}
										</p>
										<p className="mt-4 max-w-sm text-base leading-7 text-ds-text-secondary">
											{card.detail}
										</p>
									</div>
									<span
										className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-all group-hover:brightness-110"
										style={{ backgroundColor: "var(--brand-blue)" }}
									>
										{card.label}
										<ExternalLink className="h-3.5 w-3.5" />
									</span>
								</div>
							</a>
						))}
					</div>
				</section>

				<section className="mx-auto mt-16 max-w-6xl">
					<div className="mb-6 flex items-center gap-3">
						<Smartphone className="h-5 w-5" style={{ color: "var(--brand-blue)" }} />
						<h2 className="text-2xl font-medium text-ds-text-primary">Mobile</h2>
					</div>

					<div className="grid gap-px overflow-hidden rounded-xl border border-ds-border bg-ds-border md:grid-cols-2">
						<div className="bg-ds-surface p-7">
							<h3 className="text-2xl font-medium text-ds-text-primary">iOS</h3>
							<p className="mt-3 text-sm font-semibold" style={{ color: "var(--brand-blue)" }}>
								TestFlight build v{mobileVersions.ios.version} (
								{mobileVersions.ios.build})
							</p>
							<p className="mt-4 text-base leading-7 text-ds-text-secondary">
								Hive for iPhone ships through TestFlight. Install TestFlight,
								then use the invite sent to your Apple ID.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<a
									href={testFlightApp}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:text-ds-text-primary"
									style={{ borderColor: "var(--brand-blue)", color: "var(--brand-blue)" }}
								>
									Get TestFlight
									<ExternalLink className="h-3.5 w-3.5" />
								</a>
								<a
									href={appStoreConnect}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-ds-text-secondary hover:text-ds-text-primary"
								>
									Manage invites
									<ExternalLink className="h-3.5 w-3.5" />
								</a>
							</div>
						</div>

						<div className="bg-ds-surface p-7">
							<h3 className="text-2xl font-medium text-ds-text-primary">Android</h3>
							<p className="mt-3 text-sm font-semibold" style={{ color: "var(--brand-blue)" }}>
								Play internal build v{mobileVersions.android.version} (
								{mobileVersions.android.build})
							</p>
							<p className="mt-4 text-base leading-7 text-ds-text-secondary">
								Android builds ship through the Google Play internal track.
								Join once, then Play Store will show the newest accepted build.
							</p>
							<a
								href={androidInternalTrack}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-8 inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:text-ds-text-primary"
								style={{ borderColor: "var(--brand-blue)", color: "var(--brand-blue)" }}
							>
								Open Play internal track
								<ExternalLink className="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
