import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LogoIcon } from '@/components/logo'
import { getFluxSignalCount } from '@/server/flux-signals'
import '@/styles/hero-animations.css'

const SIGNALS_FALLBACK = 128

export const ImageIllustration = () => {
    const [signalCount, setSignalCount] = useState<number | null>(null)
    const [isSignalCountLoading, setIsSignalCountLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        const loadSignalCount = async () => {
            try {
                const result = await getFluxSignalCount()
                if (mounted && result?.count) {
                    setSignalCount(result.count)
                }
            } catch {
                if (mounted) {
                    setSignalCount(SIGNALS_FALLBACK)
                }
            } finally {
                if (mounted) {
                    setIsSignalCountLoading(false)
                }
            }
        }

        loadSignalCount()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <div className="relative [--color-border-illustration:--alpha(var(--color-foreground)/12.5%)] [--color-border:--alpha(var(--color-foreground)/10%)]">
            <div className="mask-t-from-65% mask-t-to-85% absolute inset-0">
                <img
                    src="https://res.cloudinary.com/dohqjvu9k/image/upload/v1757918054/16-bg_kkevzx.webp"
                    alt="hero section background"
                    className="opacity-7.5 dark:opacity-2.5 size-full -scale-100 object-bottom"
                    loading="lazy"
                />
            </div>
            <div className="border-b">
                <div className="relative mx-auto h-[230px] overflow-hidden sm:h-[320px] md:h-[420px] lg:h-auto lg:overflow-visible">
                    <div className="absolute left-1/2 top-0 w-[1040px] -translate-x-1/2 origin-top scale-[0.34] sm:scale-[0.47] md:scale-[0.62] lg:static lg:w-auto lg:translate-x-0 lg:scale-100 lg:px-12">
                        <div className="relative mx-auto grid aspect-video max-w-6xl grid-cols-3 overflow-hidden rounded-2xl">
                            <div className="grid grid-cols-2 pr-6">
                                <div className="grid h-full grid-rows-3 border-r">
                                    <div className="flex flex-col justify-end p-6">
                                        <div className="**:rounded-full flex w-full flex-wrap justify-end gap-1 rounded border p-4">
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 rounded-l-2xl border-y border-l p-2">
                                        <div className="bg-linear-to-b to-card/75 ring-border size-full rounded rounded-l-lg ring-1"></div>
                                        <div className="bg-linear-to-b to-card/75 ring-border size-full rounded rounded-r-lg ring-1"></div>
                                        <div className="bg-linear-to-b to-card/75 ring-border size-full rounded rounded-l-lg ring-1"></div>
                                        <div className="bg-linear-to-b to-card/75 ring-border size-full rounded rounded-r-lg ring-1"></div>
                                    </div>
                                    <div className="m-2 bg-[repeating-linear-gradient(45deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_6px)]"></div>
                                </div>
                                <div className="grid h-full grid-rows-3 border-r border-dashed p-6">
                                    <div>
                                        <div
                                            aria-hidden
                                            className="scale-85 flex w-28 flex-wrap gap-2.5 opacity-75">
                                            {Array.from({ length: 10 }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    aria-hidden
                                                    className="h-5 w-2.5 max-sm:last:hidden">
                                                    <div className="bg-card rounded-t-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                    <div className="bg-foreground/5 border-foreground/10 relative mx-auto h-2 w-2 border-x" />
                                                    <div className="bg-card rounded-b-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mr-auto p-6">
                                        <div className="flex gap-1">
                                            <div className="size-7 border p-1">
                                                <div className="bg-card ring-border size-full ring-1"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-card ring-border size-full ring-1"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-card ring-border size-full ring-1"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 py-2">
                                            <div className="h-1 w-12 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                            <div className="flex justify-between gap-4">
                                                <div className="h-1.5 w-6 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                                <div className="h-1.5 w-10 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between gap-1">
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full border"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="space-y-2 py-2">
                                            <div className="w-30 h-2 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1.5px,transparent_1.5px,transparent_4px)]" />
                                            <div className="w-18 h-2 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1.5px,transparent_1.5px,transparent_4px)]" />
                                        </div>
                                        <div className="flex pr-2">
                                            <div
                                                aria-hidden
                                                className="scale-85 flex w-16 flex-wrap justify-center gap-2.5 opacity-75">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        aria-hidden
                                                        className="h-5 w-2.5 max-sm:last:hidden">
                                                        <div className="bg-card rounded-t-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                        <div className="bg-foreground/5 border-foreground/10 relative mx-auto h-2 w-2 border-x" />
                                                        <div className="bg-card rounded-b-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mask-b-from-75% -mt-4 ml-auto h-20 w-6 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center justify-center">
                                    <div
                                        aria-hidden
                                        className="flex items-center gap-3 max-sm:hidden">
                                        <div className="bg-border-illustration h-px w-6" />

                                        <div className="ml-auto h-4 w-6 bg-[repeating-linear-gradient(45deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_6px)]" />
                                        <div className="ring-border-illustration bg-card size-2 rotate-45 ring-1" />
                                    </div>
                                    <div className="mx-auto hidden w-fit scale-75 rounded-xl border p-1">
                                        <div className="bg-background ring-foreground/5 grid grid-rows-[auto_1fr_auto] rounded-lg p-2 shadow-md ring-1">
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground m-auto size-0.5 rounded-full"></div>
                                                </div>
                                                <div className="h-2 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground m-auto size-0.5 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-[auto_1fr_auto]">
                                                <div className="w-2 bg-[repeating-linear-gradient(var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="p-2">
                                                    <div className="bg-muted size-16 rounded-2xl border p-1">
                                                        <div className="ring-foreground/10 inset-shadow-sm inset-shadow-white bg-linear-to-b flex size-full rounded-[12px] from-emerald-50 to-indigo-200 shadow-xl shadow-indigo-600/35 ring-1">
                                                            <LogoIcon
                                                                className="m-auto size-5 opacity-75 drop-shadow-md"
                                                                uniColor
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-2 bg-[repeating-linear-gradient(var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                            </div>
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground m-auto size-0.5 rounded-full"></div>
                                                </div>
                                                <div className="h-2 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground m-auto size-0.5 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-auto w-fit rounded-xl border p-1">
                                        <div className="bg-card ring-foreground/5 grid grid-rows-[auto_1fr_auto] rounded-lg p-1 shadow-md ring-1">
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                                <div className="h-1 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center px-2 py-1">
                                                <span className="font-mono text-xs">Intent</span>
                                            </div>
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                                <div className="h-1 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        aria-hidden
                                        className="flex items-center gap-3 max-sm:hidden">
                                        <div className="ring-border-illustration bg-card size-2 rotate-45 ring-1" />
                                        <div className="ml-auto h-4 w-6 bg-[repeating-linear-gradient(0deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_6px)]" />
                                        <div className="bg-border-illustration h-px w-6" />
                                    </div>
                                </div>
                                <div className="relative mx-auto flex w-14 justify-center">
                                    <svg
                                        width="48"
                                        height="84"
                                        viewBox="0 0 48 84"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-border mx-auto w-fit">
                                        <path
                                            d="M12 0L12 61.395C12 62.4251 11.6026 63.4155 10.8906 64.1599L2.10943 73.3401C1.3974 74.0845 0.999999 75.0749 0.999999 76.105L0.999998 84"
                                            stroke="currentColor"
                                        />
                                        <path
                                            d="M24 0L24 63L24 74.5L24 84"
                                            stroke="currentColor"
                                        />
                                        <path
                                            d="M47.0078 84L47.0078 52.3045C47.0078 51.2414 46.5846 50.222 45.8316 49.4714L37.1771 40.8452C36.4241 40.0947 36.0009 39.0753 36.0009 38.0121L36.0009 2.07412e-06"
                                            stroke="currentColor"
                                        />
                                        <path
                                            d="M12 0L12 61.395C12 62.4251 11.6026 63.4155 10.8906 64.1599L2.10943 73.3401C1.3974 74.0845 0.999999 75.0749 0.999999 76.105L0.999998 84"
                                            stroke="var(--color-white)"
                                            className="drop-shadow-emerald-100 drop-shadow-xs [animation:beam-move_4.4s_linear_infinite]"
                                            strokeLinecap="round"
                                            strokeDasharray="42 278"
                                        />
                                        <path
                                            d="M24 0L24 63L24 74.5L24 84"
                                            stroke="var(--color-white)"
                                            className="drop-shadow-blue-100 drop-shadow-xs delay-[1s] [animation:beam-move_5.4s_linear_infinite]"
                                            strokeLinecap="round"
                                            strokeDasharray="42 278"
                                        />
                                        <path
                                            d="M47.0078 84L47.0078 52.3045C47.0078 51.2414 46.5846 50.222 45.8316 49.4714L37.1771 40.8452C36.4241 40.0947 36.0009 39.0753 36.0009 38.0121L36.0009 2.07412e-06"
                                            stroke="var(--color-white)"
                                            className="drop-shadow-purple-300 drop-shadow-xs delay-[2s] [animation:beam-move_5.4s_linear_infinite]"
                                            strokeLinecap="round"
                                            strokeDasharray="42 278"
                                        />
                                    </svg>
                                </div>

                                <Card signalCount={signalCount} isSignalCountLoading={isSignalCountLoading} />

                                <div className="relative mx-auto flex w-14 justify-center">
                                    <svg
                                        width="2"
                                        height="84"
                                        viewBox="0 0 2 84"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mx-auto">
                                        <path
                                            d="M1 0L1 84"
                                            stroke="var(--color-border)"
                                        />
                                        <path
                                            d="M1 0L1 84"
                                            stroke="var(--color-white)"
                                            strokeLinecap="round"
                                            strokeDasharray="42 278"
                                            className="drop-shadow-emerald-100 drop-shadow-sm [animation:beam-move_4.4s_linear_infinite]"
                                        />
                                    </svg>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <div className="z-1 relative mx-auto w-fit rounded-xl border p-1">
                                        <div className="bg-card ring-foreground/5 grid grid-rows-[auto_1fr_auto] rounded-lg p-1 shadow-md ring-1">
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                                <div className="h-1 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center px-2">
                                                <span className="flex items-center gap-2 font-mono text-xs">
                                                    <CheckCircle2 className="size-3 stroke-emerald-800 *:first:fill-emerald-500/35" />
                                                    <span>Shipped Features</span>
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                                <div className="h-1 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_2px,transparent_2px,transparent_6px)]"></div>
                                                <div className="flex size-2">
                                                    <div className="bg-foreground size-0.75 m-auto rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="grid grid-rows-[1fr_auto]">
                                <div className="grid grid-cols-2 pl-6">
                                    <div className="flex h-full flex-col items-center justify-between border-l border-dashed p-4">
                                        <div className="flex flex-col justify-center">
                                            <div className="space-y-2 py-2">
                                                <div className="h-2 w-32 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_2px)]" />
                                                <div className="h-2 w-20 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_2px)]" />
                                            </div>
                                            <div className="flex">
                                                <div
                                                    aria-hidden
                                                    className="scale-85 flex w-16 flex-wrap justify-end gap-2.5 opacity-75">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <div
                                                            key={index}
                                                            aria-hidden
                                                            className="h-5 w-2.5 max-sm:last:hidden">
                                                            <div className="bg-card rounded-t-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                            <div className="bg-foreground/5 border-foreground/10 relative mx-auto h-2 w-2 border-x" />
                                                            <div className="bg-card rounded-b-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mask-b-from-75% -mt-4 ml-auto h-20 w-6 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                            </div>
                                        </div>
                                        <div className="**:rounded-full flex w-full flex-wrap justify-end gap-1 rounded border p-4">
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                                <div className="size-3 border p-0.5">
                                                    <div className="bg-linear-to-b to-card/50 size-full rounded-full border"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div
                                                aria-hidden
                                                className="scale-85 flex w-28 flex-wrap justify-end gap-2.5 opacity-75">
                                                {Array.from({ length: 10 }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        aria-hidden
                                                        className="h-5 w-2.5 max-sm:last:hidden">
                                                        <div className="bg-card rounded-t-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                        <div className="bg-foreground/5 border-foreground/10 relative mx-auto h-2 w-2 border-x" />
                                                        <div className="bg-card rounded-b-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative grid h-full grid-rows-2 border-l">
                                        <div className="m-2 bg-[repeating-linear-gradient(45deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_6px)]"></div>

                                        <div className="-mb-2 flex flex-col justify-center rounded-r-xl border-y border-r p-6">
                                            <div className="space-y-2 py-2">
                                                <div className="h-2 w-32 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_2px)]" />
                                                <div className="h-2 w-20 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_2px)]" />
                                            </div>
                                            <div className="flex">
                                                <div
                                                    aria-hidden
                                                    className="scale-85 flex w-16 flex-wrap justify-end gap-2.5 opacity-75">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <div
                                                            key={index}
                                                            aria-hidden
                                                            className="h-5 w-2.5 max-sm:last:hidden">
                                                            <div className="bg-card rounded-t-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                            <div className="bg-foreground/5 border-foreground/10 relative mx-auto h-2 w-2 border-x" />
                                                            <div className="bg-card rounded-b-xs ring-foreground/5 h-1.5 shadow ring-1" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mask-b-from-75% -mt-4 ml-auto h-20 w-6 bg-[repeating-linear-gradient(90deg,var(--color-border-illustration),var(--color-border-illustration)_1px,transparent_1px,transparent_3px)]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Card = ({
    signalCount,
    isSignalCountLoading,
}: {
    signalCount: number | null
    isSignalCountLoading: boolean
}) => {
    const tools = [
        { name: 'context7', logo: 'context7', url: 'https://context7.com' },
        { name: 'exa', logo: '/tool-logos/exa.png', url: 'https://exa.ai' },
        { name: 'excalidraw', logo: '/tool-logos/excalidraw.png', url: 'https://excalidraw.com' },
        { name: 'granola', logo: '/tool-logos/granola.png', url: 'https://www.granola.ai' },
        { name: 'supermemory', logo: '/tool-logos/supermemory.png', url: 'https://supermemory.ai' },
        { name: 'wispr-flow', logo: '/tool-logos/wispr-flow.png', url: 'https://www.wispr.ai' },
    ]

    const skills = [
        'ui-skills',
        'humanizer',
        'taste-skill',
        'cartographer',
        'remotion',
        'agent-skills-vercel',
    ]

    return (
        <div className="ring-foreground/15 bg-card relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-transparent px-4 py-3 shadow-2xl shadow-violet-950/15 ring-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-semibold tracking-wide">FLUX</span>
                    </div>
                </div>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Left: Tools */}
                <div className="space-y-1.5">
                    <span className="text-muted-foreground font-mono text-[8px] uppercase tracking-wider">Tools</span>
                    <div className="grid grid-cols-3 gap-1.5">
                        {tools.map((tool) => (
                            <a
                                key={tool.name}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-md bg-foreground/5 p-1.5 hover:bg-foreground/10 transition-colors cursor-pointer"
                            >
                                {tool.logo === 'context7' ? (
                                    <Context7Logo />
                                ) : (
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        className="size-5 object-contain rounded-sm"
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                    <span className="text-muted-foreground/50 font-mono text-[7px] italic">and more...</span>
                </div>

                {/* Right: Skills */}
                <div className="space-y-1.5">
                    <span className="text-muted-foreground font-mono text-[8px] uppercase tracking-wider">Skills</span>
                    <div className="space-y-0.5">
                        {skills.map((skill) => (
                            <div key={skill} className="flex items-center gap-1.5 text-[8px] text-muted-foreground hover:text-foreground transition-colors">
                                <div className="size-1 rounded-full bg-violet-500/60" />
                                <span className="font-mono">{skill}</span>
                            </div>
                        ))}
                    </div>
                    <span className="text-muted-foreground/50 font-mono text-[7px] italic">and more...</span>
                </div>
            </div>

            {/* Footer */}
            <div className="space-y-1.5 pt-2 border-t border-foreground/5">
                <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-muted-foreground text-[8px]">
                        Tracking{' '}
                        <span className="relative inline-block min-w-6 text-center align-middle">
                            <span
                                className={`absolute inset-0 transition-opacity duration-200 ${
                                    isSignalCountLoading ? 'animate-pulse opacity-100' : 'opacity-0'
                                }`}>
                                ...
                            </span>
                            <span
                                className={`inline-block transition-opacity duration-300 ${
                                    isSignalCountLoading ? 'opacity-0' : 'opacity-100'
                                }`}>
                                {signalCount ?? SIGNALS_FALLBACK}
                            </span>
                        </span>{' '}
                        cutting-edge signals
                    </span>
                </div>
                <div className="flex gap-1">
                    {['MCPs', 'Skills', 'CLIs', 'Agentic Strategies'].map((tag) => (
                        <span key={tag} className="bg-foreground/5 text-muted-foreground rounded px-1 py-0.5 font-mono text-[7px]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Context7Logo = () => (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm">
        <rect width="28" height="28" rx="4" fill="black" />
        <path d="M10.5724 15.2565C10.5724 17.5025 9.6613 19.3778 8.17805 21.1047H11.6319L11.6319 22.7786H6.33459V21.1895C7.95557 19.3566 8.58065 17.8628 8.58065 15.2565L10.5724 15.2565Z" fill="white" />
        <path d="M17.4276 15.2565C17.4276 17.5025 18.3387 19.3778 19.822 21.1047H16.3681V22.7786H21.6654V21.1895C20.0444 19.3566 19.4194 17.8628 19.4194 15.2565H17.4276Z" fill="white" />
        <path d="M10.5724 12.7435C10.5724 10.4975 9.66131 8.62224 8.17807 6.89532L11.6319 6.89532V5.22137L6.33461 5.22137V6.81056C7.95558 8.64343 8.58066 10.1373 8.58066 12.7435L10.5724 12.7435Z" fill="white" />
        <path d="M17.4276 12.7435C17.4276 10.4975 18.3387 8.62224 19.822 6.89532L16.3681 6.89532L16.3681 5.22138L21.6654 5.22138V6.81056C20.0445 8.64343 19.4194 10.1373 19.4194 12.7435H17.4276Z" fill="white" />
    </svg>
)
