import { useAction, useMutation, useQuery } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";
import { api } from "@convex/_generated/api";
import {
	ArchiveRestore,
	BookOpen,
	ChevronDown,
	Clock3,
	FilePlus2,
	History,
	Link2,
	Loader2,
	Mic,
	PanelLeft,
	PanelRight,
	Plus,
	Save,
	SearchCheck,
	Sparkles,
	Trash2,
	X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useConvexAuth } from "convex/react";
import { authClient, signIn, signOut, signUp } from "@/lib/auth-client";
import {
	analyzeWriting,
	type WritingFinding,
} from "@/lib/writing-studio/slop-detector";

type CanvasMode = "deep" | "brief";
type RightPanel = "coach" | "references" | "history" | "access";
type CoachOperation = "first-pass" | "review" | "reorganize" | "brief";

type CoachResult = {
	summary?: string;
	highlights?: Array<{ quote: string; type: string; note: string }>;
	question?: string;
	proposedText?: string;
	review?: string;
};

type PangramResult = {
	headline: string;
	predictionShort: string;
	fractionAi: number;
	fractionAiAssisted: number;
	fractionHuman: number;
	windows: Array<{
		text: string;
		label: string;
		confidence: string;
		aiAssistanceScore: number;
	}>;
};

type LocalDraftBackup = {
	title: string;
	slug: string;
	deepRead: string;
	brief: string;
	savedAt: number;
};

type SpeechRecognitionLike = {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start: () => void;
	stop: () => void;
	onresult: ((event: {
		resultIndex: number;
		results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
	}) => void) | null;
	onend: (() => void) | null;
	onerror: (() => void) | null;
};

function formatTime(value: number) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(value);
}

function errorMessage(error: unknown) {
	if (!(error instanceof Error)) return "Something went wrong.";
	const convexMessage = error.message.match(/Uncaught Error:\s*([^\n]+?)(?:\s+at handler|\s+Called by client|$)/);
	return convexMessage?.[1]?.trim() || error.message;
}

function StatusPill({ status }: { status: string }) {
	const label = status === "ready" ? "Ready" : status[0]?.toUpperCase() + status.slice(1);
	return (
		<span
			className={`inline-flex items-center border px-2 py-0.5 font-medium text-[10px] uppercase tracking-[0.12em] ${
				status === "published"
					? "border-emerald-200 bg-emerald-50 text-emerald-700"
					: status === "ready"
						? "border-blue-200 bg-blue-50 text-blue-700"
						: "border-black/10 bg-black/[0.025] text-black/50"
			}`}
		>
			{label}
		</span>
	);
}

function AuthGate() {
	const [mode, setMode] = useState<"sign-in" | "create">("sign-in");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pending, setPending] = useState(false);

	async function submit(event: React.FormEvent) {
		event.preventDefault();
		setPending(true);
		try {
			const callbackURL = `${window.location.origin}/admin/signals`;
			const result =
				mode === "sign-in"
					? await signIn.email({ callbackURL, email, password })
					: await signUp.email({
							callbackURL,
							email,
							name: name.trim() || email.split("@")[0],
							password,
						});
			if (result.error) throw new Error(result.error.message || "Authentication failed.");
			toast.success(
				mode === "sign-in"
					? "Welcome back."
					: "Account created. Check your email if verification is required.",
			);
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setPending(false);
		}
	}

	return (
		<main id="main-content" className="min-h-screen bg-[#f4f2ed] px-5 py-16 font-geist text-[#171714]">
			<div className="mx-auto max-w-[430px] border border-black/10 bg-[#fbfaf7] p-7 shadow-[0_24px_80px_rgba(30,28,22,0.08)] sm:p-10">
				<a href="/" className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
					Nairon / Signals
				</a>
				<h1 className="mt-12 font-serif text-[46px] leading-[0.96] tracking-[-0.035em]">
					Writing Studio
				</h1>
				<p className="mt-4 max-w-sm text-[15px] leading-6 text-black/55">
					A private place for Nairon admins to collect rough thinking, shape it, and publish it.
				</p>
				<form className="mt-10 space-y-5" onSubmit={submit}>
					{mode === "create" ? (
						<label className="block text-xs font-medium text-black/65">
							Name
							<input
								className="mt-2 h-11 w-full border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-[#1378e6] focus:ring-2 focus:ring-[#1378e6]/10"
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
						</label>
					) : null}
					<label className="block text-xs font-medium text-black/65">
						Email
						<input
							className="mt-2 h-11 w-full border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-[#1378e6] focus:ring-2 focus:ring-[#1378e6]/10"
							onChange={(event) => setEmail(event.target.value)}
							required
							type="email"
							value={email}
						/>
					</label>
					<label className="block text-xs font-medium text-black/65">
						Password
						<input
							className="mt-2 h-11 w-full border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-[#1378e6] focus:ring-2 focus:ring-[#1378e6]/10"
							minLength={8}
							onChange={(event) => setPassword(event.target.value)}
							required
							type="password"
							value={password}
						/>
					</label>
					<button
						className="flex h-11 w-full items-center justify-center gap-2 bg-[#171714] px-4 text-sm font-medium text-white transition hover:bg-[#1378e6] disabled:opacity-50"
						disabled={pending}
						type="submit"
					>
						{pending ? <Loader2 className="size-4 animate-spin" /> : null}
						{mode === "sign-in" ? "Sign in" : "Create admin account"}
					</button>
				</form>
				<button
					className="mt-5 text-xs text-black/50 underline decoration-black/20 underline-offset-4 hover:text-black"
					onClick={() => setMode(mode === "sign-in" ? "create" : "sign-in")}
					type="button"
				>
					{mode === "sign-in" ? "First time here? Create an account" : "Already have an account? Sign in"}
				</button>
				<p className="mt-10 border-t border-black/10 pt-5 text-[11px] leading-5 text-black/40">
					An account still needs Writing Studio access. The first owner is configured securely on the backend.
				</p>
			</div>
		</main>
	);
}

function EmptyStudio({ onCreate, creating }: { onCreate: () => void; creating: boolean }) {
	return (
		<div className="flex min-h-0 flex-1 items-center justify-center bg-[#fbfaf7] px-6 text-center">
			<div className="max-w-md">
				<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">Blank page, no ceremony</p>
				<h2 className="mt-5 font-serif text-5xl tracking-[-0.035em]">What are you thinking about?</h2>
				<p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-black/50">
					Start messy. Type, paste, or dictate. Nothing needs a title or structure yet.
				</p>
				<button
					className="mx-auto mt-8 flex h-11 items-center gap-2 bg-[#171714] px-5 text-sm font-medium text-white hover:bg-[#1378e6] disabled:opacity-50"
					disabled={creating}
					onClick={onCreate}
					type="button"
				>
					{creating ? <Loader2 className="size-4 animate-spin" /> : <FilePlus2 className="size-4" />}
					New article
				</button>
			</div>
		</div>
	);
}

export function WritingStudio() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const access = useQuery(api.writingAuth.getMyAccess, isAuthenticated ? {} : "skip");
	const articles = useQuery(
		api.articles.listArticles,
		isAuthenticated && access ? {} : "skip",
	);
	const createArticle = useMutation(api.articles.createArticle);
	const updateDraft = useMutation(api.articles.updateDraft);
	const acquireLock = useMutation(api.articles.acquireLock);
	const releaseLock = useMutation(api.articles.releaseLock);
	const addReference = useMutation(api.articles.addReference);
	const deleteReference = useMutation(api.articles.deleteReference);
	const restoreVersion = useMutation(api.articles.restoreVersion);
	const approveBrief = useMutation(api.articles.approveBrief);
	const markReady = useMutation(api.articles.markReady);
	const publishArticle = useMutation(api.articles.publish);
	const unpublishArticle = useMutation(api.articles.unpublish);
	const trashArticle = useMutation(api.articles.trashArticle);
	const runCoach = useAction(api.writingChecks.runCoach);
	const runPangram = useAction(api.writingChecks.runPangram);
	const admins = useQuery(
		api.writingAuth.listAdmins,
		isAuthenticated && access?.role === "owner" ? {} : "skip",
	);
	const grantAdmin = useMutation(api.writingAuth.grantAdmin);
	const revokeAdmin = useMutation(api.writingAuth.revokeAdmin);

	const [selectedId, setSelectedId] = useState<Id<"signalArticles"> | null>(null);
	const detail = useQuery(
		api.articles.getArticle,
		isAuthenticated && access && selectedId
			? { articleId: selectedId }
			: "skip",
	);
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [deepRead, setDeepRead] = useState("");
	const [brief, setBrief] = useState("");
	const [mode, setMode] = useState<CanvasMode>("deep");
	const [panel, setPanel] = useState<RightPanel>("coach");
	const [leftOpen, setLeftOpen] = useState(false);
	const [rightOpen, setRightOpen] = useState(false);
	const [dirty, setDirty] = useState(false);
	const [saving, setSaving] = useState(false);
	const [savedAt, setSavedAt] = useState<number | null>(null);
	const [creating, setCreating] = useState(false);
	const [coachPending, setCoachPending] = useState<CoachOperation | null>(null);
	const [coachResult, setCoachResult] = useState<CoachResult | null>(null);
	const [slopResult, setSlopResult] = useState<ReturnType<typeof analyzeWriting> | null>(null);
	const [pangramPending, setPangramPending] = useState(false);
	const [pangramResult, setPangramResult] = useState<PangramResult | null>(null);
	const [pangramError, setPangramError] = useState<string | null>(null);
	const [referenceTitle, setReferenceTitle] = useState("");
	const [referenceUrl, setReferenceUrl] = useState("");
	const [referenceContent, setReferenceContent] = useState("");
	const [referencePending, setReferencePending] = useState(false);
	const [dictating, setDictating] = useState(false);
	const [lockedBy, setLockedBy] = useState<string | null>(null);
	const [recovery, setRecovery] = useState<LocalDraftBackup | null>(null);
	const [adminEmail, setAdminEmail] = useState("");
	const [adminPending, setAdminPending] = useState(false);
	const hydratedId = useRef<string | null>(null);
	const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
	const currentText = mode === "deep" ? deepRead : brief;
	const setCurrentText = mode === "deep" ? setDeepRead : setBrief;

	useEffect(() => {
		if (selectedId || !articles?.length) return;
		setSelectedId(articles[0]._id);
	}, [articles, selectedId]);

	useEffect(() => {
		if (!detail || hydratedId.current === detail.article._id) return;
		hydratedId.current = detail.article._id;
		setTitle(detail.article.title);
		setSlug(detail.article.slug);
		setDeepRead(detail.article.deepRead);
		setBrief(detail.article.brief);
		setDirty(false);
		setSavedAt(detail.article.updatedAt);
		setCoachResult(null);
		setSlopResult(null);
		setPangramResult(null);
		setPangramError(null);
		setLockedBy(null);
		try {
			const rawBackup = window.localStorage.getItem(`signals:draft-backup:${detail.article._id}`);
			const backup = rawBackup ? (JSON.parse(rawBackup) as LocalDraftBackup) : null;
			if (backup && backup.savedAt > detail.article.updatedAt) setRecovery(backup);
			else setRecovery(null);
		} catch {
			setRecovery(null);
		}
	}, [detail]);

	useEffect(() => {
		if (!selectedId || !detail) return;
		void acquireLock({ articleId: selectedId }).then((result) => {
			if (!result.acquired) {
				setLockedBy(result.editorName);
				toast.error(`${result.editorName} is editing this Draft.`);
			} else setLockedBy(null);
		});
		const interval = window.setInterval(() => void acquireLock({ articleId: selectedId }), 50_000);
		return () => {
			window.clearInterval(interval);
			void releaseLock({ articleId: selectedId });
		};
	}, [acquireLock, detail?.article._id, releaseLock, selectedId]);

	useEffect(() => {
		if (!dirty || !selectedId) return;
		const backup: LocalDraftBackup = { title, slug, deepRead, brief, savedAt: Date.now() };
		window.localStorage.setItem(`signals:draft-backup:${selectedId}`, JSON.stringify(backup));
	}, [brief, deepRead, dirty, selectedId, slug, title]);

	const saveNow = useCallback(async () => {
		if (!selectedId || !hydratedId.current || saving) return;
		setSaving(true);
		try {
			const result = await updateDraft({ articleId: selectedId, title, slug, deepRead, brief });
			setDirty(false);
			setSavedAt(result.savedAt);
			window.localStorage.removeItem(`signals:draft-backup:${selectedId}`);
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setSaving(false);
		}
	}, [brief, deepRead, saving, selectedId, slug, title, updateDraft]);

	useEffect(() => {
		if (!dirty) return;
		const timeout = window.setTimeout(() => void saveNow(), 900);
		return () => window.clearTimeout(timeout);
	}, [dirty, saveNow]);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
				event.preventDefault();
				void saveNow();
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [saveNow]);

	function edit(setter: (value: string) => void, value: string) {
		if (lockedBy) return;
		setter(value);
		setDirty(true);
	}

	function useRecovery() {
		if (!recovery) return;
		setTitle(recovery.title);
		setSlug(recovery.slug);
		setDeepRead(recovery.deepRead);
		setBrief(recovery.brief);
		setDirty(true);
		setRecovery(null);
	}

	function discardRecovery() {
		if (selectedId) window.localStorage.removeItem(`signals:draft-backup:${selectedId}`);
		setRecovery(null);
	}

	async function addStudioAdmin(event: React.FormEvent) {
		event.preventDefault();
		setAdminPending(true);
		try {
			await grantAdmin({ email: adminEmail, role: "admin" });
			setAdminEmail("");
			toast.success("Admin access granted.");
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setAdminPending(false);
		}
	}

	async function createNew() {
		setCreating(true);
		try {
			const id = await createArticle({});
			hydratedId.current = null;
			setSelectedId(id);
			setLeftOpen(false);
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setCreating(false);
		}
	}

	async function coach(operation: CoachOperation) {
		if (!currentText.trim()) return toast.error("Put some thoughts on the page first.");
		setPanel("coach");
		setRightOpen(true);
		setCoachPending(operation);
		setCoachResult(null);
		try {
			const result = await runCoach({
				operation,
				text: currentText,
				references: detail?.references.map((reference) => reference.content) ?? [],
			});
			setCoachResult(result as CoachResult);
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setCoachPending(null);
		}
	}

	function runLocalCheck() {
		setPanel("coach");
		setRightOpen(true);
		setSlopResult(analyzeWriting(currentText));
	}

	async function pangram() {
		setPanel("coach");
		setRightOpen(true);
		setPangramPending(true);
		setPangramError(null);
		setPangramResult(null);
		try {
			setPangramResult((await runPangram({ text: currentText })) as PangramResult);
		} catch (error) {
			setPangramError(errorMessage(error));
		} finally {
			setPangramPending(false);
		}
	}

	function toggleDictation() {
		if (recognitionRef.current && dictating) {
			recognitionRef.current.stop();
			return;
		}
		const scope = window as typeof window & {
			SpeechRecognition?: new () => SpeechRecognitionLike;
			webkitSpeechRecognition?: new () => SpeechRecognitionLike;
		};
		const Recognition = scope.SpeechRecognition ?? scope.webkitSpeechRecognition;
		if (!Recognition) return toast.error("Voice capture is not supported in this browser.");
		const recognition = new Recognition();
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.lang = "en-US";
		recognition.onresult = (event) => {
			let transcript = "";
			for (let index = event.resultIndex; index < event.results.length; index += 1) {
				if (event.results[index].isFinal) transcript += event.results[index][0].transcript;
			}
			if (transcript.trim()) edit(setCurrentText, `${currentText}${currentText ? " " : ""}${transcript.trim()}`);
		};
		recognition.onend = () => setDictating(false);
		recognition.onerror = () => {
			setDictating(false);
			toast.error("Voice capture stopped. You can keep typing normally.");
		};
		recognitionRef.current = recognition;
		setDictating(true);
		recognition.start();
	}

	async function addNewReference(event: React.FormEvent) {
		event.preventDefault();
		if (!selectedId || !referenceContent.trim()) return;
		setReferencePending(true);
		try {
			await addReference({
				articleId: selectedId,
				kind: referenceUrl ? "url" : "text",
				title: referenceTitle,
				content: referenceContent,
				sourceUrl: referenceUrl || undefined,
			});
			setReferenceTitle("");
			setReferenceUrl("");
			setReferenceContent("");
			toast.success("Reference added.");
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setReferencePending(false);
		}
	}

	async function changeStatus(action: "ready" | "draft" | "publish" | "unpublish" | "trash") {
		if (!selectedId || !detail) return;
		try {
			if (dirty) await saveNow();
			if (action === "ready") await markReady({ articleId: selectedId, ready: true });
			if (action === "draft") await markReady({ articleId: selectedId, ready: false });
			if (action === "publish") await publishArticle({ articleId: selectedId });
			if (action === "unpublish") await unpublishArticle({ articleId: selectedId });
			if (action === "trash") {
				await trashArticle({ articleId: selectedId });
				setSelectedId(null);
				hydratedId.current = null;
			}
			toast.success(action === "publish" ? "Article published." : "Article updated.");
		} catch (error) {
			toast.error(errorMessage(error));
		}
	}

	const stats = useMemo(() => analyzeWriting(currentText), [currentText]);

	if (isLoading || (isAuthenticated && access === undefined)) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#f4f2ed] text-black/35">
				<Loader2 className="size-5 animate-spin" aria-label="Loading Writing Studio" />
			</div>
		);
	}
	if (!isAuthenticated) return <AuthGate />;
	if (!access) {
		return (
			<main id="main-content" className="flex min-h-screen items-center justify-center bg-[#f4f2ed] px-6 font-geist">
				<div className="max-w-md border border-black/10 bg-[#fbfaf7] p-8">
					<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">Private workspace</p>
					<h1 className="mt-5 font-serif text-4xl">This account is not an admin.</h1>
					<p className="mt-4 text-sm leading-6 text-black/55">
						Ask a Writing Studio owner to add your email. Public readers never see this area.
					</p>
					<button className="mt-8 text-sm font-medium underline underline-offset-4" onClick={() => void signOut()} type="button">
						Sign out
					</button>
				</div>
			</main>
		);
	}

	return (
		<main id="main-content" className="writing-studio-dark flex h-dvh min-h-[620px] flex-col overflow-hidden bg-[#050505] font-geist text-white">
			<header className="flex h-14 shrink-0 items-center border-b border-white/[0.09] bg-[#080808] px-3 sm:px-4">
				<button className="mr-1 inline-flex h-8 items-center gap-2 px-2 text-white/42 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setLeftOpen(true)} type="button" aria-label="Open drafts">
					<PanelLeft className="size-4" />
					<span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] sm:inline">Drafts</span>
				</button>
				<span className="mx-2 hidden h-4 w-px bg-white/10 sm:block" />
				<a href="/" className="hidden text-[15px] font-semibold tracking-[-0.06em] text-white sm:block">n.</a>
				<span className="mx-2 hidden h-4 w-px bg-white/10 sm:block" />
				<span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/28">Writing room</span>
				<div className="ml-auto flex items-center gap-1 sm:gap-2">
					<span className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-white/28 sm:flex">
						{saving ? <Loader2 className="size-3 animate-spin" /> : <span className={`size-1.5 rounded-full ${dirty ? "bg-amber-400" : "bg-emerald-500"}`} />}
						{saving ? "Saving" : dirty ? "Unsaved" : savedAt ? `Saved ${formatTime(savedAt)}` : "Saved"}
					</span>
					<button className="p-2 text-white/38 hover:bg-white/5 hover:text-white" onClick={() => void saveNow()} type="button" aria-label="Save draft">
						<Save className="size-4" />
					</button>
					<button className="inline-flex h-8 items-center gap-2 px-2 text-white/42 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setRightOpen(true)} type="button" aria-label="Open writing tools">
						<span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] sm:inline">Tools</span>
						<PanelRight className="size-4" />
					</button>
					{detail?.liveRevision ? <span className="hidden border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700 sm:inline">Live v{detail.liveRevision.revision}</span> : null}
					{detail ? (
						<div className="relative group">
							<button className="flex h-8 items-center gap-2 border border-white/15 bg-[#101010] px-3 text-xs font-medium text-white/70 hover:border-white/30" type="button">
								<StatusPill status={detail.article.status} /> <ChevronDown className="size-3" />
							</button>
							<div className="invisible absolute right-0 top-full z-50 mt-1 w-44 border border-black/10 bg-white p-1 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
								{detail.article.status === "draft" ? <button className="w-full px-3 py-2 text-left text-xs hover:bg-black/5" onClick={() => void changeStatus("ready")} type="button">Mark Ready</button> : null}
								{detail.article.status === "ready" ? <button className="w-full px-3 py-2 text-left text-xs hover:bg-black/5" onClick={() => void changeStatus("publish")} type="button">Publish</button> : null}
								{detail.article.status === "ready" ? <button className="w-full px-3 py-2 text-left text-xs hover:bg-black/5" onClick={() => void changeStatus("draft")} type="button">Move back to Draft</button> : null}
								{detail.liveRevision ? <button className="w-full px-3 py-2 text-left text-xs hover:bg-black/5" onClick={() => void changeStatus("unpublish")} type="button">Unpublish live revision</button> : null}
								<button className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50" onClick={() => void changeStatus("trash")} type="button">Move to trash</button>
							</div>
						</div>
					) : null}
				</div>
			</header>

			<div className="flex min-h-0 flex-1">
				<aside className={`${leftOpen ? "fixed inset-y-0 left-0 z-50 flex w-[min(330px,92vw)]" : "hidden"} shrink-0 flex-col border-r border-white/[0.1] bg-[#0a0a0a] shadow-[24px_0_80px_rgba(0,0,0,.45)]`}>
					<div className="flex h-14 items-center border-b border-black/10 px-4">
						<span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">Drafts</span>
						<button className="ml-auto p-2 text-black/45 hover:bg-black/5" onClick={() => void createNew()} type="button" aria-label="New article">
							{creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
						</button>
						<button className="p-2 text-white/40 hover:text-white" onClick={() => setLeftOpen(false)} type="button" aria-label="Close drafts"><X className="size-4" /></button>
					</div>
					<div className="min-h-0 flex-1 overflow-y-auto p-2">
						{articles?.map((article) => (
							<button
								className={`mb-1 w-full border px-3 py-3 text-left transition ${selectedId === article._id ? "border-black/10 bg-[#fbfaf7] shadow-sm" : "border-transparent hover:bg-black/[0.035]"}`}
								key={article._id}
								onClick={() => { hydratedId.current = null; setSelectedId(article._id); setLeftOpen(false); }}
								type="button"
							>
								<div className="line-clamp-2 text-[13px] font-medium leading-5">{article.title}</div>
								<div className="mt-2 flex items-center justify-between gap-2">
									<StatusPill status={article.status} />
									<span className="text-[10px] text-black/35">{formatTime(article.updatedAt)}</span>
								</div>
							</button>
						))}
						{articles?.length === 0 ? <p className="px-3 py-8 text-xs leading-5 text-black/40">No Drafts yet. Start with whatever is in your head.</p> : null}
					</div>
					<div className="border-t border-black/10 p-3">
						<button className="w-full px-2 py-2 text-left text-[11px] text-black/40 hover:bg-black/5" onClick={() => void authClient.signOut()} type="button">{access.email} · Sign out</button>
					</div>
				</aside>
				{leftOpen ? <button className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]" onClick={() => setLeftOpen(false)} type="button" aria-label="Close drafts overlay" /> : null}

				{!detail ? <EmptyStudio onCreate={() => void createNew()} creating={creating} /> : (
					<section className="min-w-0 flex-1 overflow-y-auto bg-[#080808]">
						<div className="mx-auto flex min-h-full max-w-[980px] flex-col px-5 pb-32 pt-12 sm:px-12 lg:px-20 lg:pt-20">
							{lockedBy ? <div className="mb-5 border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><strong>{lockedBy}</strong> is editing this Draft. This canvas is read-only until their lock expires.</div> : null}
							{recovery ? <div className="mb-5 flex flex-col gap-3 border border-blue-200 bg-blue-50 p-3 text-xs leading-5 text-blue-900 sm:flex-row sm:items-center"><span className="flex-1">Unsynced browser edits from {formatTime(recovery.savedAt)} are available.</span><div className="flex gap-2"><button className="bg-[#1378e6] px-3 py-1.5 font-medium text-white" onClick={useRecovery} type="button">Recover them</button><button className="px-3 py-1.5 font-medium" onClick={discardRecovery} type="button">Discard</button></div></div> : null}
							<div className="flex flex-wrap items-center gap-3 border-b border-white/[0.09] pb-5">
								<div className="flex border border-white/10">
									<button className={`px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] ${mode === "deep" ? "bg-white text-black" : "text-white/32 hover:text-white"}`} onClick={() => setMode("deep")} type="button">Deep Read</button>
									<button className={`border-l border-white/10 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] ${mode === "brief" ? "bg-white text-black" : "text-white/32 hover:text-white"}`} onClick={() => setMode("brief")} type="button">Brief</button>
								</div>
								{detail.article.briefStale && mode === "brief" ? <div className="flex items-center gap-2"><span className="text-[11px] text-amber-700">Brief needs review</span><button className="border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-800" onClick={async () => { if (!selectedId) return; await approveBrief({ articleId: selectedId }); toast.success("Brief approved."); }} type="button">Approve current Brief</button></div> : null}
								<div className="ml-auto flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-white/24">
									<span>{stats.wordCount.toLocaleString()} words</span><span>·</span><span>{stats.readingMinutes} min</span>
								</div>
							</div>
							<textarea
								aria-label="Article title"
								className="mt-12 w-full resize-none overflow-hidden bg-transparent text-[clamp(2.8rem,7vw,6rem)] font-normal leading-[0.92] tracking-[-0.06em] text-white outline-none [field-sizing:content] placeholder:text-white/12"
								onChange={(event) => edit(setTitle, event.target.value)}
								placeholder="Untitled idea"
								readOnly={Boolean(lockedBy)}
								rows={1}
								value={title}
							/>
							<div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-white/20">
								<span>/signals/</span>
								<input aria-label="Article URL slug" className="min-w-0 flex-1 bg-transparent outline-none focus:text-black/60" onChange={(event) => edit(setSlug, event.target.value)} readOnly={Boolean(lockedBy || detail.liveRevision)} title={detail.liveRevision ? "Published article URLs stay stable" : undefined} value={slug} />
								{detail.liveRevision ? <span className="hidden text-emerald-700 sm:inline">Stable published URL</span> : null}
							</div>
							<div className="relative mt-12 flex-1">
								<textarea
									aria-label={mode === "deep" ? "Deep Read article canvas" : "Brief article canvas"}
									className="h-full min-h-[52vh] w-full resize-none bg-transparent text-[18px] leading-[1.82] tracking-[-0.012em] text-white/72 outline-none placeholder:text-white/18 sm:text-[21px]"
									onChange={(event) => edit(setCurrentText, event.target.value)}
									placeholder={mode === "deep" ? "Dump the thought here. Fragments, questions, pasted notes—anything goes." : "The short version for a reader who has two minutes."}
									readOnly={Boolean(lockedBy)}
									spellCheck
									value={currentText}
								/>
							</div>
						</div>
						<div className="fixed bottom-4 left-1/2 z-30 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 border border-white/15 bg-[#0d0d0d] p-1.5 text-white shadow-[0_12px_50px_rgba(0,0,0,.55)]">
							<button aria-label={dictating ? "Stop dictation" : "Start dictation"} className="flex h-9 items-center gap-2 px-3 text-xs hover:bg-white/10" onClick={toggleDictation} type="button">
								<Mic className={`size-4 ${dictating ? "text-red-400" : ""}`} /> <span className="hidden sm:inline">{dictating ? "Stop" : "Dictate"}</span>
							</button>
							<span className="h-5 w-px bg-white/15" />
							<button aria-label="Run first pass" className="flex h-9 items-center gap-2 px-3 text-xs hover:bg-white/10" disabled={Boolean(coachPending)} onClick={() => void coach("first-pass")} type="button">
								<Sparkles className="size-4" /> <span className="hidden sm:inline">Light first pass</span>
							</button>
							<button aria-label="Run writing check" className="flex h-9 items-center gap-2 px-3 text-xs hover:bg-white/10" onClick={runLocalCheck} type="button">
								<SearchCheck className="size-4" /> <span className="hidden sm:inline">Check writing</span>
							</button>
							<button aria-label="Try Pangram AI detection" className="flex h-9 items-center gap-2 border border-white/15 px-3 text-xs hover:bg-white/10" disabled={pangramPending} onClick={() => void pangram()} type="button">
								{pangramPending ? <Loader2 className="size-4 animate-spin" /> : <span className="font-semibold">P</span>} <span className="hidden sm:inline">Try Pangram</span>
							</button>
						</div>
					</section>
				)}

				<aside className={`${rightOpen ? "fixed inset-y-0 right-0 z-50 flex w-[min(410px,94vw)]" : "hidden"} shrink-0 flex-col border-l border-white/[0.1] bg-[#0a0a0a] shadow-[-24px_0_80px_rgba(0,0,0,.45)]`}>
					<div className="flex h-14 shrink-0 items-center border-b border-black/10 px-3">
						{(["coach", "references", "history", ...(access.role === "owner" ? ["access" as const] : [])] as RightPanel[]).map((item) => (
							<button className={`px-2 py-2 text-[11px] font-medium capitalize ${panel === item ? "text-white/85" : "text-white/35 hover:text-white/65"}`} key={item} onClick={() => setPanel(item)} type="button">{item}</button>
						))}
						<button className="ml-auto p-2 text-white/40 hover:text-white" onClick={() => setRightOpen(false)} type="button" aria-label="Close writing tools"><X className="size-4" /></button>
					</div>
					<div className="min-h-0 flex-1 overflow-y-auto">
						{panel === "coach" ? (
							<div className="space-y-8 p-4">
								<section>
									<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/35">Think with it</p>
									<div className="mt-3 grid grid-cols-2 gap-2">
										<button className="border border-black/10 bg-white px-3 py-3 text-left text-xs hover:border-[#1378e6]/40" onClick={() => void coach("review")} type="button">Review my reasoning</button>
										<button className="border border-black/10 bg-white px-3 py-3 text-left text-xs hover:border-[#1378e6]/40" onClick={() => void coach("reorganize")} type="button">Propose a structure</button>
										<button className="col-span-2 border border-black/10 bg-white px-3 py-3 text-left text-xs hover:border-[#1378e6]/40" onClick={() => void coach("brief")} type="button">Draft the 2-minute Brief</button>
									</div>
								</section>
								{coachPending ? <div className="flex items-center gap-2 border-l-2 border-[#1378e6] bg-blue-50 p-4 text-xs text-blue-800"><Loader2 className="size-4 animate-spin" /> Reading the Draft, not replacing it…</div> : null}
								{coachResult ? (
									<section className="border border-black/10 bg-white p-4 text-sm leading-6">
										<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1378e6]">Coach note</p>
										{coachResult.summary ? <p className="mt-3">{coachResult.summary}</p> : null}
										{coachResult.review ? <p className="mt-3 whitespace-pre-wrap">{coachResult.review}</p> : null}
										{coachResult.highlights?.map((highlight) => <blockquote className="mt-4 border-l-2 border-black/10 pl-3" key={`${highlight.quote}-${highlight.type}`}><p className="text-xs italic text-black/45">“{highlight.quote}”</p><p className="mt-1 text-xs">{highlight.note}</p></blockquote>)}
										{coachResult.question ? <p className="mt-4 font-medium text-[#1378e6]">{coachResult.question}</p> : null}
										{coachResult.proposedText ? <><div className="mt-4 max-h-64 overflow-y-auto whitespace-pre-wrap border-t border-black/10 pt-4 text-xs text-black/60">{coachResult.proposedText}</div><button className="mt-4 flex items-center gap-2 bg-[#171714] px-3 py-2 text-xs font-medium text-white hover:bg-[#1378e6]" onClick={() => { edit(setCurrentText, coachResult.proposedText ?? currentText); setCoachResult(null); }} type="button"><ArchiveRestore className="size-3.5" />Use this version</button></> : null}
									</section>
								) : null}
								<section className="border-t border-black/10 pt-7">
									<div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Writing check</p><p className="mt-1 text-[11px] text-black/40">Specific patterns, not an authorship score.</p></div><button className="border border-black/10 bg-white px-3 py-2 text-[11px] hover:border-black/30" onClick={runLocalCheck} type="button">Run</button></div>
									{slopResult ? <WritingCheckResult findings={slopResult.findings} average={slopResult.averageSentenceLength} lengths={slopResult.sentenceLengths} /> : null}
								</section>
								<section className="border-t border-black/10 pt-7">
									<div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold">Pangram experiment</p><p className="mt-1 text-[11px] leading-4 text-black/40">Probabilistic third-party classification. Never proof of authorship.</p></div><button className="border border-black/10 bg-white px-3 py-2 text-[11px] hover:border-black/30 disabled:opacity-50" disabled={pangramPending} onClick={() => void pangram()} type="button">{pangramPending ? "Checking…" : "Run"}</button></div>
									{pangramError ? <p className="mt-3 border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">{pangramError}</p> : null}
									{pangramResult ? <PangramView result={pangramResult} /> : null}
								</section>
							</div>
						) : null}

						{panel === "references" ? (
							<div className="p-4">
								<div><p className="text-xs font-semibold">Reference shelf</p><p className="mt-1 text-[11px] leading-5 text-black/40">Paste source material here. The Coach can read it, but it stays outside the Article.</p></div>
								<form className="mt-5 space-y-2 border border-black/10 bg-white p-3" onSubmit={addNewReference}>
									<input className="h-9 w-full border-b border-black/10 bg-transparent text-xs outline-none focus:border-[#1378e6]" onChange={(event) => setReferenceTitle(event.target.value)} placeholder="Reference name" value={referenceTitle} />
									<div className="flex items-center gap-2 border-b border-black/10"><Link2 className="size-3.5 text-black/25" /><input className="h-9 min-w-0 flex-1 bg-transparent text-xs outline-none" onChange={(event) => setReferenceUrl(event.target.value)} placeholder="Source URL (optional)" type="url" value={referenceUrl} /></div>
									<textarea className="min-h-32 w-full resize-y bg-transparent py-2 text-xs leading-5 outline-none" onChange={(event) => setReferenceContent(event.target.value)} placeholder="Paste notes, a transcript, research, or source text…" value={referenceContent} />
									<button className="flex h-9 w-full items-center justify-center gap-2 bg-[#171714] text-xs font-medium text-white disabled:opacity-40" disabled={!referenceContent.trim() || referencePending} type="submit">{referencePending ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}Add reference</button>
								</form>
								<div className="mt-6 space-y-2">{detail?.references.map((reference) => <article className="group border border-black/10 bg-white p-3" key={reference._id}><div className="flex items-start gap-2"><BookOpen className="mt-0.5 size-3.5 shrink-0 text-black/30" /><div className="min-w-0 flex-1"><h3 className="truncate text-xs font-medium">{reference.title}</h3>{reference.sourceUrl ? <a className="mt-1 block truncate text-[10px] text-[#1378e6] hover:underline" href={reference.sourceUrl} rel="noreferrer" target="_blank">{reference.sourceUrl}</a> : null}<p className="mt-2 line-clamp-4 whitespace-pre-wrap text-[11px] leading-5 text-black/45">{reference.content}</p></div><button className="p-1 text-black/20 opacity-0 hover:text-red-600 group-hover:opacity-100" onClick={() => void deleteReference({ referenceId: reference._id })} type="button" aria-label={`Delete ${reference.title}`}><Trash2 className="size-3.5" /></button></div></article>)}</div>
							</div>
						) : null}

						{panel === "history" ? (
							<div className="p-4"><div className="flex items-center gap-2"><History className="size-4 text-black/35" /><p className="text-xs font-semibold">Saved versions</p></div><p className="mt-2 text-[11px] leading-5 text-black/40">Autosave keeps working copies. Publishing creates a separate immutable revision.</p><div className="mt-5 space-y-2">{detail?.versions.map((version) => <article className="border border-black/10 bg-white p-3" key={version._id}><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-medium">{formatTime(version.savedAt)}</p><p className="mt-1 text-[10px] text-black/35">{version.source} · {version.savedBy}</p></div><button className="flex items-center gap-1 text-[10px] font-medium text-[#1378e6] hover:underline" onClick={async () => { if (!selectedId) return; await restoreVersion({ articleId: selectedId, versionId: version._id }); hydratedId.current = null; toast.success("Saved version restored."); }} type="button"><Clock3 className="size-3" />Restore</button></div><p className="mt-2 line-clamp-2 text-[11px] text-black/45">{version.title}</p></article>)}</div></div>
						) : null}

						{panel === "access" && access.role === "owner" ? (
							<div className="p-4"><p className="text-xs font-semibold">Studio access</p><p className="mt-1 text-[11px] leading-5 text-black/40">Owners can grant access by email. New admins create or sign in to their own account.</p><form className="mt-5 flex gap-2" onSubmit={addStudioAdmin}><input aria-label="Admin email" className="h-10 min-w-0 flex-1 border border-black/10 bg-white px-3 text-xs outline-none focus:border-[#1378e6]" onChange={(event) => setAdminEmail(event.target.value)} placeholder="teammate@naironai.com" required type="email" value={adminEmail} /><button className="h-10 bg-[#171714] px-3 text-xs font-medium text-white disabled:opacity-40" disabled={adminPending} type="submit">Add</button></form><div className="mt-6 space-y-2">{admins?.map((admin) => <div className="flex items-center gap-2 border border-black/10 bg-white p-3" key={admin._id}><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{admin.email}</p><p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-black/35">{admin.role}</p></div><button className="p-1 text-black/25 hover:text-red-600" onClick={() => void revokeAdmin({ adminId: admin._id })} type="button" aria-label={`Remove ${admin.email}`}><X className="size-3.5" /></button></div>)}</div><p className="mt-6 border-t border-black/10 pt-4 text-[10px] leading-4 text-black/35">Environment-configured owners are not listed here and cannot be removed from this screen.</p></div>
						) : null}
					</div>
				</aside>
				{rightOpen ? <button className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]" onClick={() => setRightOpen(false)} type="button" aria-label="Close writing tools overlay" /> : null}
			</div>
		</main>
	);
}

function WritingCheckResult({ findings, average, lengths }: { findings: WritingFinding[]; average: number; lengths: number[] }) {
	const max = Math.max(1, ...lengths);
	return (
		<div className="mt-4">
			<div className="border border-black/10 bg-white p-3"><div className="flex items-baseline justify-between"><span className="text-[11px] text-black/45">Sentence rhythm</span><span className="font-mono text-[10px] text-black/35">avg {average} words</span></div><div className="mt-3 flex h-12 items-end gap-0.5 overflow-hidden" aria-label="Sentence length chart">{lengths.slice(0, 80).map((length, index) => <span className={`min-w-0 flex-1 ${length > 34 ? "bg-amber-400" : "bg-[#1378e6]/35"}`} key={`${length}-${index}`} style={{ height: `${Math.max(8, (length / max) * 100)}%` }} title={`${length} words`} />)}</div></div>
			{findings.length ? <div className="mt-3 space-y-2">{findings.map((finding) => <article className="border border-black/10 bg-white p-3" key={finding.id}><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700">{finding.label}</span><span className="text-[9px] uppercase text-black/25">{finding.type}</span></div><p className="mt-2 line-clamp-3 text-[11px] italic leading-5 text-black/45">“{finding.excerpt}”</p><p className="mt-2 text-[11px] leading-5">{finding.note}</p><p className="mt-1 text-[11px] leading-5 text-[#1378e6]">Try: {finding.suggestion}</p></article>)}</div> : <p className="mt-3 border border-emerald-200 bg-emerald-50 p-3 text-[11px] leading-5 text-emerald-800">No configured patterns found. That is not a quality score—read it aloud once before publishing.</p>}
		</div>
	);
}

function PangramView({ result }: { result: PangramResult }) {
	const rows = [
		["Human", result.fractionHuman],
		["AI-assisted", result.fractionAiAssisted],
		["AI", result.fractionAi],
	] as const;
	return (
		<div className="mt-4 border border-black/10 bg-white p-3">
			<div className="flex items-center justify-between"><span className="text-xs font-semibold">{result.predictionShort || "No classification"}</span><span className="border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-violet-700">Experimental</span></div>
			{result.headline ? <p className="mt-2 text-[11px] leading-5 text-black/45">{result.headline}</p> : null}
			<div className="mt-4 space-y-2">{rows.map(([label, value]) => <div key={label}><div className="flex justify-between text-[10px] text-black/45"><span>{label}</span><span>{Math.round(value * 100)}%</span></div><div className="mt-1 h-1.5 bg-black/5"><div className="h-full bg-violet-500" style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }} /></div></div>)}</div>
			{result.windows.length ? <div className="mt-4 border-t border-black/10 pt-3"><p className="text-[10px] font-medium text-black/45">Highlighted segments</p>{result.windows.slice(0, 5).map((window, index) => <div className="mt-2 text-[10px] leading-4" key={`${window.text}-${index}`}><span className="font-semibold text-violet-700">{window.label}</span><span className="text-black/35"> · {window.confidence}</span><p className="mt-1 line-clamp-3 text-black/50">{window.text}</p></div>)}</div> : null}
			<p className="mt-4 border-t border-black/10 pt-3 text-[10px] leading-4 text-black/35">Use this as a prompt to inspect phrasing, not as evidence about who wrote it.</p>
		</div>
	);
}
