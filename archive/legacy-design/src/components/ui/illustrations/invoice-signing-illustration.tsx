import { LogoIcon } from '@/components/logo'
import { cn } from '@/lib/utils'

export const InvoiceSigningIllustration = ({ className }: { className?: string }) => {
    return (
        <div
            aria-hidden
            className={cn(className)}>
            <div className="bg-card ring-border-illustration shadow-black/6.5 relative overflow-hidden rounded-2xl p-8 text-sm shadow-lg ring-1">
                <div className="space-y-0.5">
                    <LogoIcon />
                    <div className="mt-4 font-mono text-xs">INV-456789</div>
                    <div className="mt-1 -translate-x-1 font-mono text-2xl font-semibold">$284,342.57</div>
                    <div className="text-xs font-medium">Due in 15 days</div>
                </div>

                <div className="border-foreground/15 bg-foreground/5 my-6 flex h-24 items-center justify-center rounded-md border border-dashed">
                    <div className="border-b px-6 font-serif">Sign here</div>
                </div>
            </div>
        </div>
    )
}