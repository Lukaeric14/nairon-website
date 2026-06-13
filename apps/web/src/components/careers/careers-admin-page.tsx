import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowUpRight,
	CheckCircle2,
	CircleDot,
	Copy,
	Eye,
	Loader2,
	RefreshCcw,
	Star,
	Trash2,
	XCircle,
} from "lucide-react";
import {
	useEffect,
	useMemo,
	useState,
	type FormEvent,
	type MouseEvent,
} from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type ApplicationStatus = "new" | "strong" | "maybe" | "rejected";

interface CareerApplicationRecord {
	_id: string;
	roleId: string;
	roleTitle: string;
	name: string;
	email: string;
	portfolioUrl: string;
	toolingWorkflow?: string;
	source?: string;
	applicationFieldsJson?: string;
	status?: ApplicationStatus;
	statusUpdatedAt?: number;
	statusUpdatedBy?: string;
	createdAt: number;
	updatedAt: number;
}

interface ApplicationFieldRecord {
	key?: string;
	label: string;
	type: string;
	value: string;
}

const statusOptions: {
	value: ApplicationStatus;
	label: string;
	className: string;
	icon: typeof CircleDot;
}[] = [
	{
		value: "new",
		label: "New",
		className: "border-[#0C0C0C]/10 bg-[#F7F5EF] text-[#5C584F]",
		icon: CircleDot,
	},
	{
		value: "strong",
		label: "Strong",
		className: "border-emerald-200 bg-emerald-50 text-emerald-800",
		icon: Star,
	},
	{
		value: "maybe",
		label: "Maybe",
		className: "border-amber-200 bg-amber-50 text-amber-800",
		icon: CheckCircle2,
	},
	{
		value: "rejected",
		label: "Rejected",
		className: "border-red-200 bg-red-50 text-red-800",
		icon: XCircle,
	},
];

function formatDate(timestamp: number) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(timestamp));
}

function getHostname(url: string) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

function getStatus(application: CareerApplicationRecord): ApplicationStatus {
	return application.status ?? "new";
}

function getApplicationFields(application: CareerApplicationRecord) {
	if (!application.applicationFieldsJson) return [];

	try {
		const fields = JSON.parse(application.applicationFieldsJson);
		if (!Array.isArray(fields)) return [];
		return fields.filter(
			(field): field is ApplicationFieldRecord =>
				field &&
				typeof field.label === "string" &&
				typeof field.value === "string" &&
				typeof field.type === "string",
		);
	} catch {
		return [];
	}
}

async function parseJsonResponse(response: Response) {
	const text = await response.text();
	return text ? JSON.parse(text) : {};
}

function CopyButton({ value, label }: { value: string; label: string }) {
	const [copied, setCopied] = useState(false);

	async function copyValue(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		await navigator.clipboard.writeText(value);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1200);
	}

	return (
		<button
			type="button"
			onClick={copyValue}
			aria-label={`Copy ${label}`}
			title={`Copy ${label}`}
			className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-[#6F6A60] transition-colors hover:bg-[#0C0C0C]/5 hover:text-[#1A1916]"
		>
			<Copy className="size-3.5" />
			<span className="sr-only">{copied ? "Copied" : `Copy ${label}`}</span>
		</button>
	);
}

function CopyableText({
	value,
	label,
	className = "",
}: {
	value: string;
	label: string;
	className?: string;
}) {
	return (
		<div className={`flex min-w-0 items-center gap-1.5 ${className}`}>
			<span className="min-w-0 truncate">{value}</span>
			<CopyButton value={value} label={label} />
		</div>
	);
}

function CellPreview({
	value,
	label,
	onOpen,
	className = "",
}: {
	value: string;
	label: string;
	onOpen: () => void;
	className?: string;
}) {
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onOpen}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onOpen();
				}
			}}
			className={`group flex min-w-0 cursor-pointer items-center gap-1.5 rounded-md py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/40 ${className}`}
			title={value}
		>
			<span className="min-w-0 truncate group-hover:text-[#8A6418]">{value}</span>
			<CopyButton value={value} label={label} />
		</div>
	);
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
	const option = statusOptions.find((item) => item.value === status) ?? statusOptions[0];
	const Icon = option.icon;

	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${option.className}`}
		>
			<Icon className="size-3.5" />
			{option.label}
		</span>
	);
}

function ApplicationDetailsModal({
	application,
	onOpenChange,
}: {
	application: CareerApplicationRecord | null;
	onOpenChange: (open: boolean) => void;
}) {
	const fields = application ? getApplicationFields(application) : [];

	return (
		<Dialog open={Boolean(application)} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[86vh] overflow-hidden border-[#0C0C0C]/10 bg-white p-0 text-[#1A1916] sm:max-w-4xl">
				{application ? (
					<>
						<DialogHeader className="border-b border-[#0C0C0C]/10 px-6 py-5 text-left">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div className="min-w-0">
									<DialogTitle className="truncate text-2xl font-normal tracking-[-0.03em]">
										{application.name}
									</DialogTitle>
									<div className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-[#5C584F]">
										<span className="truncate">{application.email}</span>
										<CopyButton value={application.email} label="candidate email" />
									</div>
								</div>
								<StatusBadge status={getStatus(application)} />
							</div>
						</DialogHeader>

						<div className="max-h-[calc(86vh-96px)] overflow-y-auto px-6 py-5">
							<div className="grid gap-px overflow-hidden rounded-lg border border-[#0C0C0C]/10 bg-[#0C0C0C]/10 sm:grid-cols-3">
								<div className="bg-[#FCFBF8] p-4">
									<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6418]">
										Role
									</p>
									<CopyableText
										value={application.roleTitle}
										label="role"
										className="mt-1 text-sm text-[#1A1916]"
									/>
								</div>
								<div className="bg-[#FCFBF8] p-4">
									<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6418]">
										Submitted
									</p>
									<CopyableText
										value={formatDate(application.createdAt)}
										label="submitted date"
										className="mt-1 text-sm text-[#1A1916]"
									/>
								</div>
								<div className="bg-[#FCFBF8] p-4">
									<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6418]">
										Source
									</p>
									<CopyableText
										value={application.source ?? "careers-page"}
										label="source"
										className="mt-1 text-sm text-[#1A1916]"
									/>
								</div>
							</div>

							<div className="mt-5 space-y-5">
								{fields.map((field) => (
									<div key={`${application._id}-${field.label}`}>
										<div className="mb-1 flex items-center gap-1.5">
											<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6418]">
												{field.label}
											</p>
											<CopyButton value={field.value} label={field.label} />
										</div>
										<p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#5C584F]">
											{field.value}
										</p>
									</div>
								))}
								<div>
									<div className="mb-1 flex items-center gap-1.5">
										<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6418]">
											AI tooling workflow
										</p>
										<CopyButton
											value={application.toolingWorkflow || "Not provided"}
											label="AI tooling workflow"
										/>
									</div>
									<p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#5C584F]">
										{application.toolingWorkflow || "Not provided"}
									</p>
								</div>
							</div>
						</div>
					</>
				) : null}
			</DialogContent>
		</Dialog>
	);
}

export function CareersAdminPage() {
	const [adminEmail, setAdminEmail] = useState("");
	const [adminToken, setAdminToken] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [applications, setApplications] = useState<CareerApplicationRecord[]>([]);
	const [updatingId, setUpdatingId] = useState("");
	const [deleteTarget, setDeleteTarget] =
		useState<CareerApplicationRecord | null>(null);
	const [detailsTarget, setDetailsTarget] =
		useState<CareerApplicationRecord | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		setAdminEmail(window.sessionStorage.getItem("careers-admin-email") ?? "");
		setAdminToken(window.sessionStorage.getItem("careers-admin-token") ?? "");
	}, []);

	const counts = useMemo(() => {
		return applications.reduce(
			(acc, application) => {
				acc[getStatus(application)] += 1;
				return acc;
			},
			{ new: 0, strong: 0, maybe: 0, rejected: 0 } satisfies Record<
				ApplicationStatus,
				number
			>,
		);
	}, [applications]);

	const latestSubmission = useMemo(() => {
		if (!applications.length) return "No submissions yet";
		return formatDate(applications[0].createdAt);
	}, [applications]);

	function getAdminCredentials(email = adminEmail, token = adminToken) {
		return {
			adminEmail: email.trim().toLowerCase(),
			adminToken: token.trim(),
		};
	}

	async function loadApplications(email = adminEmail, token = adminToken) {
		const credentials = getAdminCredentials(email, token);
		if (!credentials.adminEmail) {
			setError("Enter your admin email.");
			return;
		}
		if (!credentials.adminToken) {
			setError("Enter the admin access key.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await fetch("/api/career-applications", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
			});
			const result = await parseJsonResponse(response);
			if (!response.ok) {
				throw new Error(result.error ?? "Could not load applications.");
			}
			setApplications(result.applications as CareerApplicationRecord[]);
			window.sessionStorage.setItem("careers-admin-email", credentials.adminEmail);
			window.sessionStorage.setItem("careers-admin-token", credentials.adminToken);
		} catch (loadError) {
			const message =
				loadError instanceof Error
					? loadError.message
					: "Could not load applications.";
			setError(message);
			setApplications([]);
		} finally {
			setLoading(false);
		}
	}

	async function updateStatus(
		application: CareerApplicationRecord,
		status: ApplicationStatus,
	) {
		const credentials = getAdminCredentials();
		setUpdatingId(application._id);
		setError("");

		const previous = applications;
		setApplications((current) =>
			current.map((item) =>
				item._id === application._id
					? {
							...item,
							status,
							statusUpdatedAt: Date.now(),
							statusUpdatedBy: credentials.adminEmail,
						}
					: item,
			),
		);

		try {
			const response = await fetch("/api/career-applications", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...credentials,
					id: application._id,
					status,
				}),
			});
			const result = await parseJsonResponse(response);
			if (!response.ok || !result.success) {
				throw new Error(result.error ?? "Could not update status.");
			}
		} catch (updateError) {
			setApplications(previous);
			setError(
				updateError instanceof Error
					? updateError.message
					: "Could not update status.",
			);
		} finally {
			setUpdatingId("");
		}
	}

	async function deleteApplication() {
		if (!deleteTarget) return;
		const credentials = getAdminCredentials();
		setDeleting(true);
		setError("");

		try {
			const response = await fetch("/api/career-applications", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...credentials,
					id: deleteTarget._id,
				}),
			});
			const result = await parseJsonResponse(response);
			if (!response.ok || !result.success) {
				throw new Error(result.error ?? "Could not delete application.");
			}

			setApplications((current) =>
				current.filter((item) => item._id !== deleteTarget._id),
			);
			setDeleteTarget(null);
		} catch (deleteError) {
			setError(
				deleteError instanceof Error
					? deleteError.message
					: "Could not delete application.",
			);
		} finally {
			setDeleting(false);
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		await loadApplications(
			String(formData.get("adminEmail") ?? ""),
			String(formData.get("adminToken") ?? ""),
		);
	}

	const columns = useMemo<ColumnDef<CareerApplicationRecord>[]>(
		() => [
			{
				header: "Candidate",
				accessorKey: "name",
				size: 260,
				cell: ({ row }) => {
					const application = row.original;
					return (
						<div className="min-w-0">
							<CellPreview
								value={application.name}
								label="candidate name"
								onOpen={() => setDetailsTarget(application)}
								className="font-semibold text-[#1A1916]"
							/>
							<CellPreview
								value={application.email}
								label="candidate email"
								onOpen={() => setDetailsTarget(application)}
								className="mt-1 text-sm text-[#5C584F]"
							/>
						</div>
					);
				},
			},
			{
				header: "Status",
				accessorFn: (application) => getStatus(application),
				size: 150,
				cell: ({ row }) => {
					const application = row.original;
					const currentStatus = getStatus(application);
					return (
						<select
							value={currentStatus}
							disabled={updatingId === application._id}
							onChange={(event) =>
								updateStatus(application, event.target.value as ApplicationStatus)
							}
							onClick={(event) => event.stopPropagation()}
							className="h-9 w-full rounded-full border border-[#0C0C0C]/10 bg-white px-3 text-xs font-semibold text-[#1A1916] outline-none transition-colors hover:bg-[#F7F5EF] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 disabled:opacity-60"
						>
							{statusOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					);
				},
			},
			{
				header: "Role",
				accessorKey: "roleTitle",
				size: 180,
				cell: ({ row }) => (
					<CellPreview
						value={row.original.roleTitle}
						label="role"
						onOpen={() => setDetailsTarget(row.original)}
						className="text-sm text-[#1A1916]"
					/>
				),
			},
			{
				header: "Portfolio",
				accessorKey: "portfolioUrl",
				size: 180,
				cell: ({ row }) => {
					const application = row.original;
					return (
						<div className="flex min-w-0 items-center gap-1.5">
							<a
								href={application.portfolioUrl}
								target="_blank"
								rel="noreferrer"
								onClick={(event) => event.stopPropagation()}
								className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-[#1A1916] hover:text-[#8A6418]"
							>
								<span className="truncate">{getHostname(application.portfolioUrl)}</span>
								<ArrowUpRight className="size-4 shrink-0" />
							</a>
							<CopyButton value={application.portfolioUrl} label="portfolio URL" />
						</div>
					);
				},
			},
			{
				header: "Submitted",
				accessorKey: "createdAt",
				size: 170,
				cell: ({ row }) => (
					<CellPreview
						value={formatDate(row.original.createdAt)}
						label="submitted date"
						onOpen={() => setDetailsTarget(row.original)}
						className="text-sm text-[#5C584F]"
					/>
				),
			},
			{
				header: "Source",
				accessorKey: "source",
				size: 140,
				cell: ({ row }) => (
					<CellPreview
						value={row.original.source ?? "careers-page"}
						label="source"
						onOpen={() => setDetailsTarget(row.original)}
						className="text-sm text-[#5C584F]"
					/>
				),
			},
			{
				id: "actions",
				header: "Actions",
				size: 150,
				cell: ({ row }) => {
					const application = row.original;
					return (
						<div className="flex items-center justify-end gap-2">
							<button
								type="button"
								onClick={() => setDetailsTarget(application)}
								className="inline-flex size-9 items-center justify-center rounded-full border border-[#0C0C0C]/10 bg-white text-[#5C584F] transition-colors hover:bg-[#F7F5EF] hover:text-[#1A1916]"
								aria-label={`View ${application.name}`}
								title="View application"
							>
								<Eye className="size-4" />
							</button>
							<button
								type="button"
								onClick={() => setDeleteTarget(application)}
								className="inline-flex size-9 items-center justify-center rounded-full border border-red-200 bg-white text-red-700 transition-colors hover:bg-red-50"
								aria-label={`Delete ${application.name}`}
								title="Delete application"
							>
								<Trash2 className="size-4" />
							</button>
						</div>
					);
				},
			},
		],
		[updatingId, applications],
	);

	const table = useReactTable({
		data: applications,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="min-h-screen bg-[#F7F5EF] font-inter text-[#1A1916]">
			<header className="border-b border-[#0C0C0C]/10 bg-white">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
					<a
						href="/"
						aria-label="Nairon home"
						className="text-2xl font-bold tracking-[-0.06em] text-[#0C0C0C]"
					>
						nairon.
					</a>
					<a
						href="/careers"
						className="text-sm font-medium text-[#5C584F] transition-colors hover:text-[#1A1916]"
					>
						View careers page
					</a>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
				<div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
					<div>
						<p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A6418]">
							Careers admin
						</p>
						<h1 className="max-w-xl text-4xl font-normal leading-tight tracking-[-0.04em] md:text-6xl">
							Career applications
						</h1>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-3 rounded-xl border border-[#0C0C0C]/10 bg-white p-4"
					>
						<div className="grid gap-3 sm:grid-cols-2">
							<label className="block">
								<span className="mb-1.5 block text-xs text-[#5C584F]">
									Admin email
								</span>
								<input
									name="adminEmail"
									type="email"
									value={adminEmail}
									onChange={(event) => setAdminEmail(event.target.value)}
									placeholder="you@naironai.com"
									className="h-11 w-full rounded-lg border border-[#0C0C0C]/10 bg-[#F7F5EF] px-3 text-sm outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/15"
								/>
							</label>
							<label className="block">
								<span className="mb-1.5 block text-xs text-[#5C584F]">
									Admin access key
								</span>
								<input
									name="adminToken"
									type="password"
									value={adminToken}
									onChange={(event) => setAdminToken(event.target.value)}
									placeholder="CAREERS_ADMIN_TOKEN"
									className="h-11 w-full rounded-lg border border-[#0C0C0C]/10 bg-[#F7F5EF] px-3 text-sm outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/15"
								/>
							</label>
						</div>
						<div className="mt-3 flex flex-wrap items-center gap-3">
							<button
								type="submit"
								disabled={loading}
								className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1A1916] disabled:opacity-60"
							>
								{loading ? (
									<Loader2 className="size-4 animate-spin" />
								) : (
									<RefreshCcw className="size-4" />
								)}
								Load applications
							</button>
							{error ? <p className="text-sm text-[#9A3412]">{error}</p> : null}
						</div>
					</form>
				</div>

				<div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/10 md:grid-cols-6">
					<div className="bg-white p-5">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Applications
						</p>
						<p className="mt-2 text-3xl tracking-[-0.04em]">
							{applications.length}
						</p>
					</div>
					<div className="bg-white p-5">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Strong
						</p>
						<p className="mt-2 text-3xl tracking-[-0.04em]">{counts.strong}</p>
					</div>
					<div className="bg-white p-5">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Maybe
						</p>
						<p className="mt-2 text-3xl tracking-[-0.04em]">{counts.maybe}</p>
					</div>
					<div className="bg-white p-5">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Rejected
						</p>
						<p className="mt-2 text-3xl tracking-[-0.04em]">
							{counts.rejected}
						</p>
					</div>
					<div className="bg-white p-5 md:col-span-2">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Latest
						</p>
						<p className="mt-2 text-base font-medium">{latestSubmission}</p>
					</div>
				</div>

				<section className="mt-8 overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-white shadow-sm">
					<div className="border-b border-[#0C0C0C]/10 px-5 py-4">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<div>
								<h2 className="text-base font-semibold tracking-[-0.02em]">
									Applications
								</h2>
								<p className="mt-1 text-sm text-[#5C584F]">
									Click a cell or the eye icon to inspect the full application.
								</p>
							</div>
							{loading ? (
								<div className="inline-flex items-center gap-2 text-sm text-[#5C584F]">
									<Loader2 className="size-4 animate-spin" />
									Loading
								</div>
							) : null}
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1230px] table-fixed border-collapse">
							<colgroup>
								{table.getAllLeafColumns().map((column) => (
									<col key={column.id} style={{ width: column.getSize() }} />
								))}
							</colgroup>
							<thead className="bg-[#F7F5EF]">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												className="border-b border-[#0C0C0C]/10 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C584F]"
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.length ? (
									table.getRowModel().rows.map((row) => (
										<tr
											key={row.id}
											className="border-b border-[#0C0C0C]/10 align-middle transition-colors last:border-b-0 hover:bg-[#FCFBF8]"
										>
											{row.getVisibleCells().map((cell) => (
												<td
													key={cell.id}
													className="min-w-0 px-4 py-3 align-middle"
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</td>
											))}
										</tr>
									))
								) : (
									<tr>
										<td colSpan={columns.length} className="px-5 py-16 text-center">
											<h2 className="text-xl font-normal tracking-[-0.03em]">
												No applications loaded
											</h2>
											<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5C584F]">
												Enter the admin access key to load applications from Convex.
											</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</main>

			<ApplicationDetailsModal
				application={detailsTarget}
				onOpenChange={(open) => {
					if (!open) setDetailsTarget(null);
				}}
			/>

			<Dialog
				open={Boolean(deleteTarget)}
				onOpenChange={(open) => {
					if (!open && !deleting) setDeleteTarget(null);
				}}
			>
				<DialogContent className="border-[#0C0C0C]/10 bg-white text-[#1A1916]">
					<DialogHeader>
						<DialogTitle>Delete application?</DialogTitle>
						<DialogDescription>
							This permanently removes{" "}
							<span className="font-medium text-[#1A1916]">
								{deleteTarget?.name ?? "this candidate"}
							</span>
							&apos;s application from the admin panel.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<button
							type="button"
							disabled={deleting}
							onClick={() => setDeleteTarget(null)}
							className="inline-flex h-10 items-center justify-center rounded-full border border-[#0C0C0C]/10 px-4 text-sm font-semibold text-[#1A1916] transition-colors hover:bg-[#F7F5EF] disabled:opacity-60"
						>
							Cancel
						</button>
						<button
							type="button"
							disabled={deleting}
							onClick={deleteApplication}
							className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-red-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60"
						>
							{deleting ? <Loader2 className="size-4 animate-spin" /> : null}
							Delete application
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
