import { Apple, CornerDownLeft, X } from 'lucide-react'

export const AIIllustration1 = () => {
    return (
        <div
            aria-hidden
            className="min-w-xs relative pb-16">
            <div className="absolute inset-x-6 top-5 translate-x-2">
                <div className="absolute inset-0 scale-100 opacity-75 blur-lg transition-all duration-300 dark:opacity-50">
                    <div className="bg-linear-to-r/increasing animate-hue-rotate absolute inset-x-6 bottom-0 top-12 -translate-y-3 from-pink-400 to-purple-400"></div>
                </div>
                <div className="bg-illustration/95 ring-border-illustration shadow-black/6.5 relative rounded-xl shadow-lg ring-1 backdrop-blur">
                    <X className="absolute right-2 top-2 size-3" />

                    <span className="text-muted-foreground block p-3 text-xs">Enter instruction</span>

                    <div className="flex justify-between border-t p-2">
                        <span className="hover:bg-foreground/5 text-muted-foreground hover:text-foreground flex h-6 cursor-pointer items-center gap-1.5 rounded-md p-2 duration-100">
                            <Apple className="size-3.5 opacity-75" />
                            <span className="text-xs">Professional</span>
                        </span>
                        <div className="bg-primary before:border-foreground/20 relative flex size-6 rounded-md text-[#1A1916] shadow before:absolute before:inset-0 before:rounded-md before:border">
                            <CornerDownLeft className="m-auto size-3.5 drop-shadow" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <div className="bg-border h-1 w-4/5 rounded-full"></div>
                    <div className="flex items-center gap-1">
                        <div className="bg-border h-1 w-2/5 rounded-full"></div>
                        <div className="bg-primary h-1 w-1/5 rounded-full"></div>
                        <div className="bg-border h-1 w-1/5 rounded-full"></div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                        <div className="bg-border h-1 w-2/5 rounded-full"></div>
                        <div className="bg-border h-1 w-1/5 rounded-full"></div>
                    </div>
                    <div className="flex w-3/4 items-center gap-1">
                        <div className="bg-border h-1 w-1/5 rounded-full"></div>
                        <div className="bg-border h-1 w-4/5 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIIllustration1