import { Bot, ClipboardList, Gauge, GitCompareArrows, Hammer, SearchCode } from 'lucide-react'

const steps = [
    {
        id: '01',
        title: 'Scope',
        description: 'Anchor intent. Clarify requirements, constraints, and success criteria before any code.',
        icon: ClipboardList,
    },
    {
        id: '02',
        title: 'Plan',
        description: 'Break work into tasks. HITL: one at a time. AFK: queue the whole epic.',
        icon: GitCompareArrows,
    },
    {
        id: '03',
        title: 'Execute',
        description: 'Re-anchor at every checkpoint. Agents verify alignment before, during, and after.',
        icon: Hammer,
    },
    {
        id: '04',
        title: 'Review',
        description: 'Cross-model critique. Multiple models challenge assumptions and catch blind spots.',
        icon: SearchCode,
    },
    {
        id: '05',
        title: 'Evidence',
        description: 'Nothing merges without proof. Tests pass, types check, builds succeed.',
        icon: Gauge,
    },
]

const snapshots = [
    {
        title: 'Re-anchoring',
        subtitle: 'Continuous alignment with original intent',
        lines: ['Check intent before each task', 'Verify during implementation', 'Validate after completion'],
        metric: 'Drift -89%',
    },
    {
        title: 'Evidence Gate',
        subtitle: 'Proof required before merge',
        lines: ['Tests pass on all changes', 'Types check with zero errors', 'Build succeeds in CI'],
        metric: 'Rework -67%',
    },
    {
        title: 'Cross-model Review',
        subtitle: 'Multi-model critique catches blind spots',
        lines: ['Reviewer model challenges assumptions', 'Edge cases surfaced automatically', 'Confidence scores per decision'],
        metric: 'Bugs -54%',
    },
]

export default function FeaturesSection() {
    return (
        <section className="bg-background @container py-16 md:py-24 lg:py-32">
            <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-semibold lg:text-4xl">Your choice: HITL or AFK</h2>
                    <p className="text-muted-foreground mt-4 text-lg">Stay deeply involved with one task at a time, or throw the whole epic at it and walk away. Same guarantees either way.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-5">
                    {steps.map((step) => {
                        const Icon = step.icon
                        return (
                            <article
                                key={step.id}
                                className="bg-card ring-border rounded-2xl p-5 ring-1">
                                <p className="text-muted-foreground font-mono text-xs">{step.id}</p>
                                <Icon className="text-muted-foreground mt-4 size-4" />
                                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
                            </article>
                        )
                    })}
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-3">
                    {snapshots.map((snapshot) => (
                        <IllustrationPerspective key={snapshot.title}>
                            <div className="bg-background ring-border space-y-3 rounded-xl p-4 ring-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium">{snapshot.title}</span>
                                    <Bot className="text-muted-foreground size-3.5" />
                                </div>
                                <p className="text-muted-foreground text-xs">{snapshot.subtitle}</p>
                                <div className="space-y-1.5">
                                    {snapshot.lines.map((line) => (
                                        <div
                                            key={line}
                                            className="text-muted-foreground/90 border-border/70 rounded-md border px-2 py-1 text-[11px]">
                                            {line}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 border-t pt-2">
                                    <Gauge className="text-primary size-3.5" />
                                    <span className="text-xs font-medium">{snapshot.metric}</span>
                                </div>
                            </div>
                        </IllustrationPerspective>
                    ))}
                </div>
            </div>
        </section>
    )
}

const IllustrationPerspective = ({ children }: { children: React.ReactNode }) => (
    <div className="perspective-dramatic bg-card mask-radial-from-70% mask-radial-at-top-left mask-radial-[100%_100%] rounded-2xl border p-3">
        <div className="rotate-y-3 -skew-y-2">{children}</div>
    </div>
)
