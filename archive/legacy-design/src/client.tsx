import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

if (import.meta.env.DEV && import.meta.env.VITE_DISABLE_REACT_GRAB !== "true") {
	import("react-grab").then(() => {
		// Move toolbar to top-left corner once React Grab initializes
		const tryMove = () => {
			if (window.__REACT_GRAB__) {
				window.__REACT_GRAB__.setToolbarState({ edge: "left", ratio: 0.05 });
			} else {
				window.addEventListener("react-grab:init", () => {
					window.__REACT_GRAB__?.setToolbarState({ edge: "left", ratio: 0.05 });
				}, { once: true });
			}
		};
		tryMove();
	});
}

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<StartClient />
		</StrictMode>,
	);
});
