import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ModalContextValue {
	hireModalOpen: boolean;
	candidateModalOpen: boolean;
	openHireModal: () => void;
	closeHireModal: () => void;
	openCandidateModal: () => void;
	closeCandidateModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [hireModalOpen, setHireModalOpen] = useState(false);
	const [candidateModalOpen, setCandidateModalOpen] = useState(false);

	const openHireModal = useCallback(() => setHireModalOpen(true), []);
	const closeHireModal = useCallback(() => setHireModalOpen(false), []);
	const openCandidateModal = useCallback(() => setCandidateModalOpen(true), []);
	const closeCandidateModal = useCallback(() => setCandidateModalOpen(false), []);

	return (
		<ModalContext.Provider
			value={{
				hireModalOpen,
				candidateModalOpen,
				openHireModal,
				closeHireModal,
				openCandidateModal,
				closeCandidateModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

export function useModals() {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error("useModals must be used within ModalProvider");
	return ctx;
}
