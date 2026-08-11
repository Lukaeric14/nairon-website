import { Clock, MessageSquare } from 'lucide-react'

export const AiMemoryIllustration = () => {
    return (
        <div
            aria-hidden
            className="min-w-xs">
            <div className="perspective-dramatic flex flex-col gap-4">
                <div className="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-top-left rotate-x-5 rotate-z-6 -rotate-4 pl-6 pt-1">
                    <div className="bg-background/75 ring-border-illustration shadow-black/6.5 rounded-2xl p-2 shadow-lg ring-1">
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div className="text-sm font-medium">AI Memory</div>
                            <div className="bg-primary/10 text-primary ml-auto rounded-full px-2 py-0.5 text-xs">Active</div>
                        </div>
                        <div className="bg-card ring-border-illustration rounded-xl p-4 ring-1">
                            <div className="space-y-3">
                                <div className="text-muted-foreground text-xs">Context Window</div>

                                <div className="bg-muted relative h-3 overflow-hidden rounded-full">
                                    <div className="bg-primary/40 absolute inset-y-0 left-0 w-[30%] rounded-full"></div>
                                    <div className="bg-primary absolute inset-y-0 left-[30%] w-[45%] rounded-full"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-medium text-[#1A1916]">12K / 16K tokens</div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="text-muted-foreground text-xs">Remembered Context</div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 p-2 ring-1 ring-purple-500/20">
                                        <MessageSquare className="size-3.5 shrink-0 text-purple-600 dark:text-purple-400" />
                                        <div className="flex-1 truncate text-[10px]">User prefers dark mode UI</div>
                                        <Clock className="text-muted-foreground size-2.5 shrink-0" />
                                        <span className="text-muted-foreground text-[10px]">2m</span>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
                                        <MessageSquare className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                                        <div className="flex-1 truncate text-[10px]">Working on a React project</div>
                                        <Clock className="text-muted-foreground size-2.5 shrink-0" />
                                        <span className="text-muted-foreground text-[10px]">5m</span>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 p-2 ring-1 ring-cyan-500/20">
                                        <MessageSquare className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                                        <div className="flex-1 truncate text-[10px]">Asked about authentication best practices</div>
                                        <Clock className="text-muted-foreground size-2.5 shrink-0" />
                                        <span className="text-muted-foreground text-[10px]">8m</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-xs">
                                <div className="text-muted-foreground">3 conversations stored</div>
                                <button className="text-primary hover:underline">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiMemoryIllustration