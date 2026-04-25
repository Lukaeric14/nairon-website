import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || status === 'loading') return

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setStatus('error')
            setMessage('Please enter a valid email address')
            return
        }

        setStatus('loading')
        try {
            const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL
            const response = await fetch(`${convexSiteUrl}/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'cto-observability' }),
            })
            const result = await response.json()
            
            if (result.success) {
                setStatus('success')
                setMessage(result.message || "You're on the waitlist!")
                setEmail('')
            } else {
                setStatus('error')
                setMessage(result.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            setStatus('error')
            setMessage('Something went wrong. Please try again.')
            console.error('Waitlist error:', error)
        }
    }

    if (status === 'success') {
        return (
            <div className="flex items-center justify-center gap-2 text-emerald-500 mt-8">
                <CheckCircle2 className="size-5" />
                <span className="text-sm font-medium">{message}</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md">
            <div className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === 'error') setStatus('idle')
                    }}
                    placeholder="Enter your work email"
                    className="flex-1 rounded-lg border border-[#0C0C0C]/10 bg-[#0C0C0C]/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C9A96E]/50 focus:outline-none focus:ring-1 focus:ring-[#C9A96E]/50"
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="rounded-lg bg-[#C9A96E] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#B8944F] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Joining...</span>
                        </>
                    ) : (
                        'Join waitlist'
                    )}
                </button>
            </div>
            {status === 'error' && (
                <p className="mt-2 text-sm text-red-400">{message}</p>
            )}
        </form>
    )
}

export default function StatsSection() {
    return (
        <section className="bg-white @container py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20 w-fit mx-auto rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                    Coming Soon
                </div>
                <h2 className="mx-auto max-w-2xl text-balance text-center text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] font-normal tracking-[-1px] text-[#1A1916]">CTO-level <span className="font-serif italic text-[#C9A96E]">observability</span></h2>
                <p className="text-[#5C584F] mx-auto mt-6 max-w-xl text-pretty text-center text-lg">
                    See which engineers are actually leveraging AI effectively, where the team needs development, and which workflows produce the highest quality output.
                </p>

                <WaitlistForm />

                <div className="relative mt-12">
                    <PlusDecorator className="-translate-[calc(50%-0.5px)]" />
                    <PlusDecorator className="right-0 -translate-y-[calc(50%-0.5px)] translate-x-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />

                    <div className="**:text-center bg-card *:hover:bg-[#0C0C0C]/[0.02] @xl:grid-cols-3 grid grid-cols-2 divide-x border border-[#0C0C0C]/10 *:p-8">
                        <div className="space-y-2">
                            <div className="bg-gradient-to-t from-[#1A1916] to-[#5C584F] bg-clip-text text-3xl font-medium text-transparent md:text-5xl">Team</div>
                            <p className="text-[#5C584F] text-sm">Benchmarks and improvement trends across your engineering org</p>
                        </div>
                        <div className="@max-xl:border-0 space-y-2">
                            <div className="bg-gradient-to-t from-[#1A1916] to-[#5C584F] bg-clip-text text-3xl font-medium text-transparent md:text-5xl">Quality</div>
                            <p className="text-[#5C584F] text-sm">Thinking metrics, not just velocity — measure how engineers collaborate with AI</p>
                        </div>
                        <div className="@max-xl:hidden space-y-2">
                            <div className="bg-gradient-to-t from-[#1A1916] to-[#5C584F] bg-clip-text text-3xl font-medium text-transparent md:text-5xl">Hiring</div>
                            <p className="text-[#5C584F] text-sm">Recruiting signals: identify candidates with sophisticated AI collaboration patterns</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const PlusDecorator = ({ className }: { className?: string }) => (
    <div
        aria-hidden
        className={cn('mask-radial-from-15% before:bg-foreground/25 after:bg-foreground/25 absolute size-3 before:absolute before:inset-0 before:m-auto before:h-px after:absolute after:inset-0 after:m-auto after:w-px', className)}
    />
)
