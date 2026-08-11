const KanbanIllustration = () => {
    return (
        <div
            aria-hidden
            className="w-full mask-b-from-85%">
            <div className="grid grid-cols-2 gap-2">
                {/* In Progress column */}
                <div className="rounded-lg border border-[rgba(12,12,12,0.08)] bg-white p-2">
                    <div className="mb-2 flex items-center gap-1.5 px-1 pt-0.5">
                        <div className="h-1 w-1 rounded-full bg-[#C9A96E]" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#5C584F]">
                            In Progress
                        </span>
                    </div>
                    <div className="space-y-2">
                        <div className="relative h-20">
                            <div className="absolute inset-0 rounded-md border border-[rgba(12,12,12,0.06)] bg-[#F5F2EB]" />
                            <div className="rotate-2 translate-x-[4px] translate-y-[4px] absolute inset-0 flex flex-col justify-between rounded-md border border-[rgba(12,12,12,0.08)] bg-white p-2 shadow-md shadow-black/[0.05]">
                                <div className="text-[9px] font-medium leading-tight text-[#1A1916]">
                                    Follow up with leads
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="size-2.5 rounded-full bg-[#C9A96E]" />
                                    <div className="h-0.5 w-5 rounded bg-[rgba(12,12,12,0.12)]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-20 flex-col justify-between rounded-md border border-[rgba(12,12,12,0.06)] bg-[#FAF7F0] p-2">
                            <div className="text-[9px] font-medium leading-tight text-[#1A1916]">
                                Send proposals
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="size-2.5 rounded-full bg-[#C9A96E]" />
                                <div className="h-0.5 w-5 rounded bg-[rgba(12,12,12,0.12)]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review column */}
                <div className="flex flex-col rounded-lg border border-[rgba(12,12,12,0.08)] bg-white p-2">
                    <div className="mb-2 flex items-center gap-1.5 px-1 pt-0.5">
                        <div className="h-1 w-1 rounded-full bg-[#C9A96E]" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#5C584F]">
                            Implement
                        </span>
                    </div>
                    <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-[#C9A96E]/40 bg-[#C9A96E]/[0.06]">
                        <div className="text-[9px] font-semibold tracking-wide text-[#C9A96E]">
                            Drop here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KanbanIllustration
