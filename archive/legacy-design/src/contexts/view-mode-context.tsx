import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";

export type ViewMode = "engineer" | "hiring-manager";

interface ViewModeContextValue {
	viewMode: ViewMode;
	setViewMode: (mode: ViewMode) => void;
	toggleViewMode: () => void;
	isEngineer: boolean;
	isHiringManager: boolean;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

export function ViewModeProvider({ children }: { children: ReactNode }) {
	const [viewMode, setViewMode] = useState<ViewMode>("engineer");

	const toggleViewMode = useCallback(() => {
		setViewMode((prev) => (prev === "engineer" ? "hiring-manager" : "engineer"));
	}, []);

	const value: ViewModeContextValue = {
		viewMode,
		setViewMode,
		toggleViewMode,
		isEngineer: viewMode === "engineer",
		isHiringManager: viewMode === "hiring-manager",
	};

	return (
		<ViewModeContext.Provider value={value}>
			{children}
		</ViewModeContext.Provider>
	);
}

export function useViewMode() {
	const context = useContext(ViewModeContext);
	if (!context) {
		throw new Error("useViewMode must be used within a ViewModeProvider");
	}
	return context;
}
