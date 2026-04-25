import { LogoIcon } from '@/components/logo'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { VisualStudioCode as VSCode } from '@/components/ui/svgs/vs-code'
import { Windsurf } from '@/components/ui/svgs/windsurf'
import { Claude } from '@/components/ui/svgs/claude'
import { OpenAI } from '@/components/ui/svgs/open-ai'
import { Vercel } from '@/components/ui/svgs/vercel'
import { Linear } from '@/components/ui/svgs/linear'
import { Gemini } from '@/components/ui/svgs/gemini'
import { Replit } from '@/components/ui/svgs/replit'
import { VSCodium } from '@/components/ui/svgs/vs-codium'
import { MistralAi } from '@/components/ui/svgs/mistral-ai'

export default function IntegrationsSection() {
    return (
        <section className="bg-white py-24">
            <div className="perspective-dramatic group mx-auto max-w-5xl px-6">
                <div className="rotate-x-6 hover:rotate-x-0 mask-radial-from-70% mask-radial-[50%_90%] group relative mx-auto max-w-2xl scale-y-90 items-center justify-between space-y-6 from-transparent pb-1 transition-transform duration-1000 hover:scale-y-100">
                    <div className="mask-radial-to-55% absolute inset-0 bg-[radial-gradient(var(--color-foreground)_1px,transparent_1px)] opacity-25 [background-size:16px_16px]" />
                    <div>
                        <InfiniteSlider
                            gap={56}
                            speed={20}
                            speedOnHover={10}>
                            <IntegrationCard>
                                <Claude />
                            </IntegrationCard>
                            <IntegrationCard>
                                <OpenAI />
                            </IntegrationCard>
                            <IntegrationCard>
                                <VSCode />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Windsurf />
                            </IntegrationCard>
                            <IntegrationCard>
                                <VSCodium />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Replit />
                            </IntegrationCard>
                        </InfiniteSlider>
                    </div>

                    <div>
                        <InfiniteSlider
                            gap={56}
                            speed={20}
                            speedOnHover={10}
                            reverse>
                            <IntegrationCard>
                                <Linear />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Vercel />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Gemini />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Claude />
                            </IntegrationCard>
                            <IntegrationCard>
                                <OpenAI />
                            </IntegrationCard>
                            <IntegrationCard>
                                <MistralAi />
                            </IntegrationCard>
                        </InfiniteSlider>
                    </div>
                    <div>
                        <InfiniteSlider
                            gap={56}
                            speed={15}
                            speedOnHover={10}>
                            <IntegrationCard>
                                <VSCode />
                            </IntegrationCard>
                            <IntegrationCard>
                                <VSCodium />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Windsurf />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Linear />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Vercel />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Replit />
                            </IntegrationCard>
                        </InfiniteSlider>
                    </div>
                    <div className="absolute inset-0 m-auto flex size-fit -translate-y-3.5 justify-center gap-2">
                        <IntegrationCard
                            className="relative size-24 rounded-2xl border border-[#0C0C0C]/20 bg-zinc-700/50 shadow-xl shadow-black/20 ring-1 ring-black/50 backdrop-blur-lg"
                            isCenter={true}>
                            <LogoIcon
                                uniColor
                                className="text-[#1A1916] drop-shadow-sm"
                            />
                        </IntegrationCard>
                    </div>
                </div>
                <div className="mx-auto mt-12 max-w-xl text-center">
                    <h2 className="text-balance text-[28px] leading-[32px] md:text-[44px] md:leading-[48px] font-normal tracking-[-1px] text-[#1A1916]">Runs across your <span className="font-serif italic text-[#C9A96E]">AI coding stack</span></h2>
                    <p className="text-[#5C584F] mb-6 mt-4 text-balance text-lg">Claude Code first, plus Factory Droid and OpenAI Codex workflows, with shared process intelligence across tools.</p>

                    <Button
                        size="sm"
                        variant="outline"
                        asChild>
                        <a href="https://github.com/Nairon-AI/flux" target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }: { children: React.ReactNode; className?: string; position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom'; isCenter?: boolean }) => {
    return (
        <div
            aria-hidden
            className={cn('bg-card relative z-20 flex size-20 rounded-xl border', className)}>
            <div className={cn('m-auto size-fit *:size-8', isCenter && '*:size-8')}>{children}</div>
        </div>
    )
}
