// Source: https://github.com/origin-space/originui/blob/main/components/code-block.tsx
'use client'

import { cn } from '@/lib/utils'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { JSX, useLayoutEffect, useState } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import type { BundledLanguage } from 'shiki/bundle/web'
import { codeToHast } from 'shiki/bundle/web'

export async function highlight(code: string, lang: BundledLanguage, theme?: string) {
    const hast = await codeToHast(code, {
        lang,
        theme: theme || 'github-dark',
    })

    return toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
    }) as JSX.Element
}

type Props = {
    code: string | null
    lang: BundledLanguage
    initial?: JSX.Element
    preHighlighted?: JSX.Element | null
    maxHeight?: number
    className?: string
    theme?: string
    lineNumbers?: boolean
}

export default function CodeBlock({ code, lang, initial, maxHeight, preHighlighted, theme, className }: Props) {
    const [content, setContent] = useState<JSX.Element | null>(preHighlighted || initial || null)

    useLayoutEffect(() => {
        // If we have pre-highlighted content, skip the effect
        if (preHighlighted) {
            return
        }

        let isMounted = true

        if (code) {
            highlight(code, lang, theme).then((result) => {
                if (isMounted) setContent(result)
            })
        }

        return () => {
            isMounted = false
        }
    }, [code, lang, theme, preHighlighted])

    return (
        <div
            className={cn('[&_pre]:scroll-fade-y [&_pre]:scrollbar-thin [&_pre]:max-h-(--pre-max-height) *:text-[11px]/5! [&_code]:font-mono [&_pre]:min-h-[32rem] [&_pre]:overflow-auto [&_pre]:border-l [&_pre]:!bg-transparent [&_pre]:py-3 [&_pre]:leading-snug', className)}
            style={{ '--pre-max-height': `${maxHeight}px` } as React.CSSProperties}>
            {content ? content : <pre className="flex size-full items-center justify-center p-4">Loading...</pre>}
        </div>
    )
}
