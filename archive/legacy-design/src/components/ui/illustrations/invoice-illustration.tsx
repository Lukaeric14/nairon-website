import { cn } from '@/lib/utils'
import { LogoIcon } from '@/components/logo'
import { DocumentIllustation } from "@/components/ui/illustrations/document-illustration"

export const InvoiceIllustration = ({ className }: { className?: string }) => {
    return (
        <div
            aria-hidden
            className={cn(className)}>
            <div className="bg-card ring-border-illustration shadow-black/6.5 relative overflow-hidden rounded-2xl border border-transparent p-8 text-sm shadow-lg ring-1">
                <div className="mb-6 flex items-start justify-between [--color-background:color-mix(in_oklab,var(--color-foreground)10%,var(--color-zinc-950))]">
                    <div className="space-y-0.5">
                        <LogoIcon />
                        <div className="mt-4 font-mono text-xs">INV-456789</div>
                        <div className="mt-1 -translate-x-1 font-mono text-2xl font-semibold">$284,342.57</div>
                        <div className="text-xs font-medium">Due in 15 days</div>
                    </div>
                    <DocumentIllustation />
                </div>

                <div className="mb-12 space-y-1.5 [--color-border:color-mix(in_oklab,var(--color-foreground)10%,transparent)]">
                    <div className="grid grid-cols-[auto_1fr] items-center">
                        <span className="text-muted-foreground w-18 block">To</span>
                        <span className="bg-border h-2 w-1/4 rounded-full px-2" />
                    </div>

                    <div className="grid grid-cols-[auto_1fr] items-center">
                        <span className="text-muted-foreground w-18 block">From</span>
                        <span className="bg-border h-2 w-1/2 rounded-full px-2" />
                    </div>

                    <div className="grid grid-cols-[auto_1fr] items-center">
                        <span className="text-muted-foreground w-18 block">Address</span>
                        <span className="bg-border h-2 w-2/3 rounded-full px-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}