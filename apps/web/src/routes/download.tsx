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

const fallbackDesktop = {
	macVersion: "0.5.90",
	windowsVersion: "0.5.90",
	macDmg: `${desktopFeedBase}/Hive-0.5.90-universal.dmg`,
	windowsExe: `${desktopFeedBase}/Hive-Setup-0.5.90.exe`,
	macManifest: `${desktopFeedBase}/latest-mac.yml`,
	windowsManifest: `${desktopFeedBase}/latest.yml`,
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

type DesktopDownloadState = {
	macVersion: string;
	windowsVersion: string;
	macDmg: string;
	windowsExe: string;
	macManifest: string;
	source: "R2 latest manifests" | "Static fallback";
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

function useDesktopDownloads() {
	const [downloads, setDownloads] = useState<DesktopDownloadState>({
		...fallbackDesktop,
		source: "Static fallback",
	});

	useEffect(() => {
		let cancelled = false;

		async function loadManifests() {
			try {
				const [macManifest, windowsManifest] = await Promise.all([
					fetch(fallbackDesktop.macManifest).then((response) => {
						if (!response.ok) throw new Error("mac manifest unavailable");
						return response.text();
					}),
					fetch(fallbackDesktop.windowsManifest).then((response) => {
						if (!response.ok) throw new Error("windows manifest unavailable");
						return response.text();
					}),
				]);

				const macDmg = parseFileUrl(macManifest, ".dmg");
				const windowsExe = parseFileUrl(windowsManifest, ".exe");
				const macVersion = parseVersion(macManifest) ?? fallbackDesktop.macVersion;
				const windowsVersion =
					parseVersion(windowsManifest) ?? fallbackDesktop.windowsVersion;

				if (!cancelled && macDmg && windowsExe) {
					setDownloads({
						macVersion,
						windowsVersion,
						macDmg: `${desktopFeedBase}/${macDmg}`,
						windowsExe: `${desktopFeedBase}/${windowsExe}`,
						macManifest: fallbackDesktop.macManifest,
						source: "R2 latest manifests",
					});
				}
			} catch {
				if (!cancelled) {
					setDownloads({ ...fallbackDesktop, source: "Static fallback" });
				}
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
				version: desktop.macVersion,
				detail: "Universal DMG for Apple Silicon and Intel Macs.",
				href: desktop.macDmg,
				label: "Download DMG",
			},
			{
				name: "Windows",
				version: desktop.windowsVersion,
				detail: "Signed installer for Windows desktops.",
				href: desktop.windowsExe,
				label: "Download EXE",
			},
		],
		[
			desktop.macDmg,
			desktop.macVersion,
			desktop.windowsExe,
			desktop.windowsVersion,
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
										macOS v{desktop.macVersion}
									</p>
									<p className="text-2xl font-medium">
										Windows v{desktop.windowsVersion}
									</p>
								</div>
							</div>
							<MonitorDown className="mt-1 h-8 w-8" style={{ color: "var(--brand-blue)" }} />
						</div>
						<div className="mt-8 space-y-3 text-sm text-ds-text-tertiary">
							<p>Source: {desktop.source}</p>
							<a
								href={desktop.macManifest}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 transition-colors hover:text-ds-text-primary"
								style={{ color: "var(--brand-blue)" }}
							>
								View mac manifest
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
											Current version v{card.version}
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
