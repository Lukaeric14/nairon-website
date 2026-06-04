// Provides the active projector (unit scale + screen origin) to every
// primitive in a scene, so all shapes share one grid without each one
// re-deriving the projection.

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { makeProjector, UNIT, type Projector, type ScreenPt } from "./iso";

interface IsoContextValue {
	project: Projector;
	unit: number;
}

const IsoContext = createContext<IsoContextValue>({
	project: makeProjector(UNIT),
	unit: UNIT,
});

export function IsoProvider({
	unit = UNIT,
	origin,
	children,
}: {
	unit?: number;
	origin?: ScreenPt;
	children: ReactNode;
}) {
	const ox = origin?.sx ?? 0;
	const oy = origin?.sy ?? 0;
	const value = useMemo<IsoContextValue>(
		() => ({ project: makeProjector(unit, { sx: ox, sy: oy }), unit }),
		[unit, ox, oy],
	);
	return <IsoContext.Provider value={value}>{children}</IsoContext.Provider>;
}

export function useIso(): IsoContextValue {
	return useContext(IsoContext);
}
