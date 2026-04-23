import { cn } from '@/lib/utils'

export const DocumentsIllustration = () => {
    return (
        <div className="relative z-10 flex h-20 w-fit flex-col gap-6">
            {['PDF', 'DOC', 'TXT'].map((type) => (
                <div
                    key={type}
                    className="relative">
                    <div className={cn('z-2 after:border-foreground/15 text-shadow-sm absolute -right-3 bottom-2 rounded px-1.5 py-0.5 text-[10px] font-semibold text-[#1A1916] shadow-lg after:absolute after:inset-0 after:rounded after:border', type === 'PDF' && 'bg-rose-500 shadow-rose-900/25', type === 'DOC' && 'bg-blue-500 shadow-blue-900/25', type === 'TXT' && 'bg-orange-600 shadow-orange-900/25')}>{type}</div>
                    <div className="bg-illustration corner-tr-bevel ring-border-illustration z-1 shadow-black/6.5 relative w-16 space-y-3 rounded-md rounded-tr-[15%] p-3 shadow-md ring-1">
                        <div className="space-y-1.5">
                            <div className="flex gap-2">
                                <div className="bg-foreground/10 h-0.5 w-full rounded-full" />
                            </div>
                            <div className="flex gap-1">
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                            </div>
                            <div className="flex gap-1">
                                <div className="bg-foreground/10 h-0.5 w-1/2 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/2 rounded-full" />
                            </div>
                            <div className="flex gap-1">
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                            </div>
                            <div className="flex gap-1">
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-2/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                            </div>
                            <div className="flex gap-1">
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                                <div className="bg-foreground/10 h-0.5 w-1/3 rounded-full" />
                            </div>
                        </div>
                        <div className="flex gap-1 pt-1">
                            <div className="bg-foreground h-0.5 w-4 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}