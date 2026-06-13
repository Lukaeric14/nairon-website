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
	Loader2,
	RefreshCcw,
	Star,
	Trash2,
	XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
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

	async function copyValue() {
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
			className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-[#5C584F] transition-colors hover:bg-[#0C0C0C]/5 hover:text-[#1A1916]"
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

export function CareersAdminPage() {
	const [adminEmail, setAdminEmail] = useState("");
	const [adminToken, setAdminToken] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [applications, setApplications] = useState<CareerApplicationRecord[]>([]);
	const [updatingId, setUpdatingId] = useState("");
	const [deleteTarget, setDeleteTarget] =
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
				cell: ({ row }) => {
					const application = row.original;
					return (
						<div className="min-w-[220px]">
							<CopyableText
								value={application.name}
								label="candidate name"
								className="font-semibold text-[#1A1916]"
							/>
							<CopyableText
								value={application.email}
								label="candidate email"
								className="mt-1 text-sm text-[#5C584F]"
							/>
						</div>
					);
				},
			},
			{
				header: "Status",
				accessorFn: (application) => getStatus(application),
				cell: ({ row }) => <StatusBadge status={getStatus(row.original)} />,
			},
			{
				header: "Role",
				accessorKey: "roleTitle",
				cell: ({ row }) => (
					<CopyableText
						value={row.original.roleTitle}
						label="role"
						className="max-w-[220px] text-sm text-[#1A1916]"
					/>
				),
			},
			{
				header: "Portfolio",
				accessorKey: "portfolioUrl",
				cell: ({ row }) => {
					const application = row.original;
					return (
						<div className="flex min-w-[180px] items-center gap-1.5">
							<a
								href={application.portfolioUrl}
								target="_blank"
								rel="noreferrer"
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
				cell: ({ row }) => (
					<CopyableText
						value={formatDate(row.original.createdAt)}
						label="submitted date"
						className="min-w-[150px] text-sm text-[#5C584F]"
					/>
				),
			},
			{
				header: "Source",
				accessorKey: "source",
				cell: ({ row }) => (
					<CopyableText
						value={row.original.source ?? "careers-page"}
						label="source"
						className="min-w-[130px] text-sm text-[#5C584F]"
					/>
				),
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => {
					const application = row.original;
					const currentStatus = getStatus(application);
					return (
						<div className="flex min-w-[330px] flex-wrap items-center gap-2">
							{statusOptions.map((option) => {
								const Icon = option.icon;
								const active = currentStatus === option.value;
								return (
									<button
										key={option.value}
										type="button"
										disabled={updatingId === application._id || active}
										onClick={() => updateStatus(application, option.value)}
										className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors disabled:cursor-default disabled:opacity-70 ${
											active
												? option.className
												: "border-[#0C0C0C]/10 bg-white text-[#5C584F] hover:bg-[#F7F5EF] hover:text-[#1A1916]"
										}`}
									>
										<Icon className="size-3.5" />
										{option.label}
									</button>
								);
							})}
							<button
								type="button"
								onClick={() => setDeleteTarget(application)}
								className="inline-flex h-8 items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50"
							>
								<Trash2 className="size-3.5" />
								Delete
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

				<section className="mt-8 overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-white">
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1180px] border-collapse">
							<thead className="bg-[#F7F5EF]">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												className="border-b border-[#0C0C0C]/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#5C584F]"
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
									table.getRowModel().rows.map((row) => {
										const application = row.original;
										const fields = getApplicationFields(application);
										return (
											<tr key={row.id} className="border-b border-[#0C0C0C]/10">
												<td colSpan={columns.length} className="p-0">
													<table className="w-full table-fixed border-collapse">
														<tbody>
															<tr className="align-top">
																{row.getVisibleCells().map((cell) => (
																	<td
																		key={cell.id}
																		className="px-4 py-4 align-top"
																	>
																		{flexRender(
																			cell.column.columnDef.cell,
																			cell.getContext(),
																		)}
																	</td>
																))}
															</tr>
															<tr>
																<td
																	colSpan={columns.length}
																	className="bg-[#FCFBF8] px-4 pb-5"
																>
																	<div className="grid gap-4 rounded-lg border border-[#0C0C0C]/10 bg-white p-4 md:grid-cols-2">
																		{fields.map((field) => (
																			<div
																				key={`${application._id}-${field.label}`}
																				className={
																					field.type === "textarea"
																						? "md:col-span-2"
																						: undefined
																				}
																			>
																				<div className="mb-1 flex items-center gap-1.5">
																					<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6418]">
																						{field.label}
																					</p>
																					<CopyButton
																						value={field.value}
																						label={field.label}
																					/>
																				</div>
																				<p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#5C584F]">
																					{field.value}
																				</p>
																			</div>
																		))}
																		<div className="md:col-span-2">
																			<div className="mb-1 flex items-center gap-1.5">
																				<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6418]">
																					AI tooling workflow
																				</p>
																				<CopyButton
																					value={
																						application.toolingWorkflow ||
																						"Not provided"
																					}
																					label="AI tooling workflow"
																				/>
																			</div>
																			<p className="max-w-4xl whitespace-pre-wrap text-sm leading-6 text-[#5C584F]">
																				{application.toolingWorkflow ||
																					"Not provided"}
																			</p>
																		</div>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										);
									})
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
