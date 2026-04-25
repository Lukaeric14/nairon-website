import { cn } from '@/lib/utils'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const plans = ['codex', 'flux'] as const

type Plan = (typeof plans)[number]

type Feature = {
    name: string
    description?: string
    plans: Record<Plan, boolean>
}

const features: Feature[] = [
    // Features Codex already has (checks first)
    {
        name: 'HITL mode (one task at a time)',
        description: 'Stay deeply involved. Review each task before the next one starts.',
        plans: {
            codex: true,
            flux: true,
        },
    },
    // Features only Flux adds
    {
        name: 'Re-anchoring at every checkpoint',
        description: 'Agents verify alignment with original intent before, during, and after each task.',
        plans: {
            codex: false,
            flux: true,
        },
    },
    {
        name: 'Evidence-based merge gates',
        description: 'Nothing ships without proof: tests pass, types check, builds succeed.',
        plans: {
            codex: false,
            flux: true,
        },
    },
    {
        name: 'Cross-model review',
        description: 'Multiple models critique each other. Blind spots and assumptions get caught automatically.',
        plans: {
            codex: false,
            flux: true,
        },
    },
    {
        name: 'Ralph mode (fully autonomous)',
        description: 'Run an entire epic unattended — all tasks, reviews, and reflections without stopping.',
        plans: {
            codex: false,
            flux: true,
        },
    },
    {
        name: 'Brain Vault (persistent memory)',
        description: 'Obsidian-compatible knowledge base in .flux/brain/. Pitfalls, principles, conventions, and decisions survive across sessions.',
        plans: {
            codex: false,
            flux: true,
        },
    },
    {
        name: 'Security suite (STRIDE + scanning)',
        description: 'Built-in threat modeling, vulnerability scanning, security review, and PoC validation.',
        plans: {
            codex: false,
            flux: true,
        },
    },
]

const renderPlanColumn = (plan: Plan) => {
    const header =
        plan === 'codex' ? (
            <div className="sticky top-0 flex h-14 flex-col items-center justify-center gap-1.5 rounded-t-xl px-4 text-center lg:px-6">
                <span className="text-sm font-semibold">Coding Agents</span>
            </div>
        ) : (
            <div className="sticky top-0 flex h-14 flex-col items-center justify-center gap-1.5 px-4 pt-2 text-center lg:px-8">
                <span className="text-sm font-semibold">Coding Agents + Flux</span>
            </div>
        )

    return (
        <div
            data-plan={plan}
            className={cn(plan === 'flux' && 'ring-border bg-card/50 shadow-black/6.5 relative z-10 rounded-xl shadow-xl ring-1')}>
            {header}

            <div>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="odd:bg-card flex h-14 items-center justify-center px-6 text-sm last:h-[calc(3.5rem+1px)] last:border-b group-last:odd:rounded-r-lg">
                        <div>{feature.plans[plan] === true ? <Indicator checked /> : feature.plans[plan] === false ? <Indicator /> : feature.plans[plan]}</div>
                    </div>
                ))}
                <div className="h-6"></div>
            </div>
        </div>
    )
}

export default function ComparatorSection() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-5xl md:px-6">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="max-w-lg max-md:px-6">
                        <div className="text-balance lg:max-w-xs">
                            <h2 className="text-[28px] leading-[32px] md:text-[36px] md:leading-[40px] lg:text-[44px] lg:leading-[48px] font-normal tracking-[-1px] text-[#1A1916]">Coding Agents vs Coding Agents + <span className="font-serif italic text-[#C9A96E]">Flux</span></h2>
                            <p className="text-[#5C584F] mt-4 text-balance lg:mt-6">Flux keeps coding agents in the same dev flow, but adds deterministic workflow state, evidence-based quality gates, adversarial review, and self-improving recommendations.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2">
                        <div>
                            <div className="z-1 sticky top-0 flex h-14 items-end gap-1.5 px-6 py-2">
                                <div className="text-[#5C584F] text-sm font-medium">Features</div>
                            </div>

                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="text-[#5C584F] md:nth-2:rounded-tl-xl even:bg-card flex h-14 items-center rounded-l-lg px-6 last:h-[calc(3.5rem+1px)] md:last:rounded-bl-xl">
                                    <div className="text-sm">{feature.name}</div>{' '}
                                    {feature.description && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="flex size-7">
                                                    <span className="bg-foreground/10 text-foreground/65 m-auto flex size-4 items-center justify-center rounded-full text-sm">?</span>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-56 text-sm">{feature.description}</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2">
                            {plans.map((plan) => (
                                <div
                                    key={plan}
                                    className="group">
                                    {renderPlanColumn(plan)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Indicator = ({ checked = false }: { checked?: boolean }) => {
    return <span className={cn('flex size-4 items-center justify-center rounded-full bg-rose-500 font-sans text-xs font-semibold text-[#1A1916]', checked && 'bg-emerald-600 text-[#1A1916]')}>{checked ? <CheckIcon /> : '✗'}</span>
}

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
            className="size-2.5">
            <path
                fill="currentColor"
                d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"
            />
        </svg>
    )
}
