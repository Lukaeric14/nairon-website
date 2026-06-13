import { ArrowUpRight, Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { listCareerApplications } from "@/server/careers";

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
	createdAt: number;
	updatedAt: number;
}

interface ApplicationFieldRecord {
	key?: string;
	label: string;
	type: string;
	value: string;
}

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

export function CareersAdminPage() {
	const [adminToken, setAdminToken] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [applications, setApplications] = useState<CareerApplicationRecord[]>([]);

	useEffect(() => {
		setAdminToken(window.sessionStorage.getItem("careers-admin-token") ?? "");
	}, []);

	const latestSubmission = useMemo(() => {
		if (!applications.length) return "No submissions yet";
		return formatDate(applications[0].createdAt);
	}, [applications]);

	async function loadApplications(token = adminToken) {
		const trimmedToken = token.trim();
		if (!trimmedToken) {
			setError("Enter the admin access key.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const result = await listCareerApplications({
				data: { adminToken: trimmedToken },
			});
			setApplications(result.applications as CareerApplicationRecord[]);
			window.sessionStorage.setItem("careers-admin-token", trimmedToken);
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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await loadApplications();
	}

	return (
		<div className="min-h-screen bg-[#F7F5EF] font-inter text-[#1A1916]">
			<header className="border-b border-[#0C0C0C]/10 bg-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
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

			<main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
				<div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
					<div>
						<p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A6418]">
							Careers admin
						</p>
						<h1 className="max-w-xl text-4xl font-normal leading-tight tracking-[-0.04em] md:text-6xl">
							Career applications
						</h1>
						<p className="mt-4 max-w-xl text-base leading-7 text-[#5C584F]">
							Review candidates by role, links, work samples, and evidence that
							they can use AI tools to produce strong work.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="rounded-xl border border-[#0C0C0C]/10 bg-white p-4"
					>
						<label className="block">
							<span className="mb-1.5 block text-xs text-[#5C584F]">
								Admin access key
							</span>
							<input
								type="password"
								value={adminToken}
								onChange={(event) => setAdminToken(event.target.value)}
								placeholder="CAREERS_ADMIN_TOKEN"
								className="h-11 w-full rounded-lg border border-[#0C0C0C]/10 bg-[#F7F5EF] px-3 text-sm outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/15"
							/>
						</label>
						<div className="mt-3 flex items-center gap-3">
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

				<div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/10 md:grid-cols-3">
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
							Latest
						</p>
						<p className="mt-2 text-base font-medium">{latestSubmission}</p>
					</div>
					<div className="bg-white p-5">
						<p className="text-xs uppercase tracking-[0.16em] text-[#5C584F]">
							Role
						</p>
						<p className="mt-2 text-base font-medium">All roles</p>
					</div>
				</div>

				<section className="mt-8 overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-white">
					<div className="grid grid-cols-[1.2fr_1.2fr_1fr_0.8fr] border-b border-[#0C0C0C]/10 px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#5C584F] max-lg:hidden">
						<span>Candidate</span>
						<span>Portfolio</span>
						<span>Submitted</span>
						<span>Source</span>
					</div>

					{applications.length ? (
						<div className="divide-y divide-[#0C0C0C]/10">
							{applications.map((application) => (
								<article
									key={application._id}
									className="grid gap-4 px-5 py-5 lg:grid-cols-[1.2fr_1.2fr_1fr_0.8fr] lg:items-center"
								>
									<div>
										<h2 className="text-base font-semibold">
											{application.name}
										</h2>
										<a
											href={`mailto:${application.email}`}
											className="mt-1 block text-sm text-[#5C584F] hover:text-[#1A1916]"
										>
											{application.email}
										</a>
									</div>

									<a
										href={application.portfolioUrl}
										target="_blank"
										rel="noreferrer"
										className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#1A1916] hover:text-[#8A6418]"
									>
										{getHostname(application.portfolioUrl)}
										<ArrowUpRight className="size-4" />
									</a>

									<p className="text-sm text-[#5C584F]">
										{formatDate(application.createdAt)}
									</p>

									<p className="text-sm text-[#5C584F]">
										{application.source ?? "careers-page"}
									</p>

									<div className="lg:col-span-4">
										<p className="mb-3 text-sm font-semibold text-[#1A1916]">
											{application.roleTitle}
										</p>
										{getApplicationFields(application).length ? (
											<div className="mb-5 grid gap-4 md:grid-cols-2">
												{getApplicationFields(application).map((field) => (
													<div
														key={`${application._id}-${field.label}`}
														className={
															field.type === "textarea"
																? "md:col-span-2"
																: undefined
														}
													>
														<p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6418]">
															{field.label}
														</p>
														<p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#5C584F]">
															{field.value}
														</p>
													</div>
												))}
											</div>
										) : null}
										<p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6418]">
											AI tooling workflow
										</p>
										<p className="max-w-4xl whitespace-pre-wrap text-sm leading-6 text-[#5C584F]">
											{application.toolingWorkflow || "Not provided"}
										</p>
									</div>
								</article>
							))}
						</div>
					) : (
						<div className="px-5 py-16 text-center">
							<h2 className="text-xl font-normal tracking-[-0.03em]">
								No applications loaded
							</h2>
							<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5C584F]">
								Enter the admin access key to load applications from Convex.
							</p>
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
