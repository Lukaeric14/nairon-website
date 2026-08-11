import { Card } from '@/components/ui/card'
import { AiMemoryIllustration } from '@/components/illustrations/ai-memory'
import { Flow10Illustration } from '@/components/illustrations/flow-10'
import { CircuitBoard, type CircuitConnection, type CircuitNodeType } from '@/components/ui/circuit-board'
import { TrueFocus } from '@/components/ui/true-focus'
import { Activity, BetweenHorizonalEnd, LineChart, Sparkles, Workflow } from 'lucide-react'

const miniWorkflowNodes: CircuitNodeType[] = [
    { id: 'p1', x: 50, y: 70, label: 'Prompt', status: 'active', size: 'sm' },
    { id: 'p2', x: 130, y: 30, label: 'Agent', status: 'processing', size: 'sm' },
    { id: 'p3', x: 130, y: 110, label: 'Tools', status: 'active', size: 'sm' },
    { id: 'p4', x: 220, y: 70, label: 'Ship', status: 'active', size: 'sm' },
]

const miniWorkflowConnections: CircuitConnection[] = [
    { from: 'p1', to: 'p2', animated: true },
    { from: 'p1', to: 'p3', animated: true },
    { from: 'p2', to: 'p4', animated: true },
    { from: 'p3', to: 'p4', animated: true },
]

export default function BentoSeven() {
    return (
        <section className="bg-background @container py-24">
            <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-semibold lg:text-4xl">HITL or AFK: same guarantees</h2>
                    <p className="text-muted-foreground mt-4 text-lg">Work task-by-task with full control, or hand off an entire epic. Re-anchoring keeps agents aligned, evidence validates every step, cross-model review catches drift before it compounds.</p>
                </div>
                <div className="@2xl:grid-cols-2 @2xl:grid-rows-2 @4xl:grid-cols-3 grid gap-3">
                    <div className="@xl:col-span-2 @2xl:row-span-2 grid grid-rows-[auto_1fr] gap-3">
                        <Card className="grid grid-rows-[auto_1fr] gap-6 overflow-hidden rounded-2xl p-6 md:p-8 md:pb-0">
                            <div>
                                <BetweenHorizonalEnd className="text-muted-foreground size-4" />
                                <h3 className="text-foreground mb-2 mt-4 font-medium">Re-anchoring at every checkpoint</h3>
                                <p className="text-muted-foreground text-balance">Agents continuously verify against original intent. Before execution, during implementation, after completion. Drift is caught and corrected automatically.</p>
                            </div>
                            <div className="-mx-6 overflow-hidden pl-2 md:-mx-8 md:pl-6">
                                <Flow10Illustration />
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <Card className="group grid grid-cols-[auto_1fr] gap-4 overflow-hidden rounded-2xl p-6 md:gap-6 md:p-8">
                                <div className="hidden origin-left scale-[0.18] pl-2 pt-3 sm:block">
                                    <TrueFocus
                                        sentence="Find gaps first"
                                        manualMode={false}
                                        blurAmount={2}
                                        animationDuration={0.45}
                                    />
                                </div>
                                <div>
                                    <Workflow className="text-muted-foreground size-4" />
                                    <h3 className="text-foreground mt-4 font-medium">Evidence over intuition</h3>
                                    <p className="text-muted-foreground mt-2">Every decision backed by test results, type checks, and build outputs. Nothing ships without proof.</p>
                                </div>
                            </Card>
                            <Card className="group grid grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-2xl p-6 md:gap-6 md:p-8">
                                <div>
                                    <Sparkles className="text-muted-foreground size-4" />
                                    <h3 className="text-foreground mt-4 font-medium">Cross-model review</h3>
                                    <p className="text-muted-foreground mt-2">Multiple models critique each other's work. Blind spots get caught, assumptions get challenged.</p>
                                </div>
                                <div className="overflow-hidden">
                                    <CircuitBoard
                                        width={260}
                                        height={140}
                                        nodes={miniWorkflowNodes}
                                        connections={miniWorkflowConnections}
                                        className="mx-auto"
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                    <Card className="grid grid-rows-[auto_1fr] gap-6 overflow-hidden rounded-2xl p-6 md:gap-8 md:p-8">
                        <div>
                            <Activity className="text-muted-foreground size-4" />
                            <h3 className="text-foreground mb-2 mt-4 font-medium">Zero context drift</h3>
                            <p className="text-muted-foreground">Persistent memory across sessions. Agents remember intent, decisions, and constraints, even when you walk away.</p>
                        </div>
                        <AiMemoryIllustration />
                    </Card>
                    <Card className="grid grid-rows-[auto_1fr] gap-6 rounded-2xl p-6 md:gap-8 md:p-8">
                        <div>
                            <LineChart className="text-muted-foreground size-4" />
                            <h3 className="text-foreground mb-2 mt-4 font-medium">AFK confidence metrics</h3>
                            <p className="text-muted-foreground text-balance">See how well agents stay aligned over time. Track re-anchoring success, evidence quality, and review outcomes.</p>
                        </div>
                        <div className="space-y-3 pb-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">AI collaboration score</span>
                                    <span className="font-mono font-medium">52 -&gt; 78</span>
                                </div>
                                <div className="bg-muted h-2 rounded-full overflow-hidden">
                                    <div className="h-full w-[74%] bg-primary rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Pushback quality</span>
                                    <span className="font-mono font-medium">+3x</span>
                                </div>
                                <div className="bg-muted h-2 rounded-full overflow-hidden">
                                    <div className="h-full w-[82%] bg-emerald-500 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Rework loops</span>
                                    <span className="font-mono font-medium">-34%</span>
                                </div>
                                <div className="bg-muted h-2 rounded-full overflow-hidden">
                                    <div className="h-full w-[36%] bg-amber-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
