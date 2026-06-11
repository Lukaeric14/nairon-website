import { lazy, Suspense, useEffect, useState } from "react";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewModeProvider } from "@/contexts/view-mode-context";
import { Toaster } from "sonner";
import { organizationJsonLd, websiteJsonLd, serviceJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const SmoothScroll = lazy(() =>
	import("@/components/smooth-scroll").then((m) => ({
		default: m.SmoothScroll,
	})),
);

export interface RouterContext {
	queryClient: QueryClient;
	convex: ConvexReactClient;
}

const jsonLdOrg = JSON.stringify(organizationJsonLd());
const jsonLdSite = JSON.stringify(websiteJsonLd());
const jsonLdService = JSON.stringify(serviceJsonLd());

// Google Analytics (gtag.js) — GA4 property G-VKNPNM07L5.
// Production-only so local dev traffic doesn't pollute the GA property.
const gaScripts = import.meta.env.PROD
	? [
			{
				src: "https://www.googletagmanager.com/gtag/js?id=G-VKNPNM07L5",
				async: true,
			},
			{
				children:
					"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VKNPNM07L5');",
			},
		]
	: [];

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Nairon - Company for AI Employees" },
			{
				name: "description",
				content:
					"Nairon builds and deploys AI employees for modern teams, with industry-specific offers like real estate living under dedicated ICP pages.",
			},
			{ name: "theme-color", content: "#FFFFFF" },
		],
		links: [
			// Warm up TCP/TLS to third-party origins used early on the page
			// (booking widget, analytics, hero video) to shave connection latency.
			{ rel: "preconnect", href: "https://app.cal.com", crossOrigin: "anonymous" },
			{ rel: "preconnect", href: "https://www.googletagmanager.com" },
			{ rel: "dns-prefetch", href: "https://iframe.videodelivery.net" },
			{ rel: "icon", href: "/favicon.png", type: "image/png", sizes: "192x192" },
			{ rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
			{ rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
			{
				rel: "preload",
				href: "/fonts/inter-latin.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/fonts/urbanist-latin.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/fonts/instrument-serif-latin-regular.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/fonts/instrument-serif-latin-italic.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				as: "image",
				href: "/nairon-logo.png",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdOrg,
			},
			{
				type: "application/ld+json",
				children: jsonLdSite,
			},
			{
				type: "application/ld+json",
				children: jsonLdService,
			},
			...gaScripts,
		],
	}),
});

function RootComponent() {
	const { convex } = Route.useRouteContext();
	const [enableSmoothScroll, setEnableSmoothScroll] = useState(false);

	useEffect(() => {
		const smoothTimeoutId = window.setTimeout(() => setEnableSmoothScroll(true), 1200);
		return () => {
			window.clearTimeout(smoothTimeoutId);
		};
	}, []);

	return (
		<html lang="en" suppressHydrationWarning style={{ backgroundColor: "#FFFFFF" }}>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background font-sans antialiased" style={{ backgroundColor: "#FFFFFF" }}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-[#C9A96E] focus:px-4 focus:py-2 focus:text-[#0C0C0C] focus:font-medium"
				>
					Skip to content
				</a>
				<ConvexProvider client={convex}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						forcedTheme="light"
						enableSystem={false}
						disableTransitionOnChange
					>
						<ViewModeProvider>
							{enableSmoothScroll ? (
								<Suspense
									fallback={
										<main id="main-content">
											<Outlet />
										</main>
									}
								>
									<SmoothScroll>
										<main id="main-content">
											<Outlet />
										</main>
									</SmoothScroll>
								</Suspense>
							) : (
								<main id="main-content">
									<Outlet />
								</main>
							)}
						{/* ViewModeToggle hidden for now */}
						</ViewModeProvider>
						<Toaster />
					</ThemeProvider>
				</ConvexProvider>
				<Scripts />
			</body>
		</html>
	);
}
