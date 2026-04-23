import { Card } from '@/components/ui/card'
import { motion } from 'motion/react'
import { Quote, EyeOff } from 'lucide-react'

// Luka Eric - Nairon co-founder
const LUKA_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'

// Stealth logo component
const StealthLogo = () => (
    <div className="flex items-center gap-2 mb-6">
        <div className="size-8 rounded-lg bg-gradient-to-br from-[#EBE8E2] to-[#F7F5F0] border border-[#E0DDD6] flex items-center justify-center">
            <EyeOff className="size-4 text-[#666]" />
        </div>
        <span className="text-[#666] font-medium tracking-wide text-sm">STEALTH</span>
    </div>
)

const testimonials = [
    {
        id: 'luka',
        text: "I'm mostly a product person — not an engineer. But with Flux guiding my Claude Code sessions, I've been able to ship real features and help build a 6-figure ARR startup. The workflow loops keep me from making dumb mistakes and the recommendations actually make sense.",
        avatar: LUKA_AVATAR,
        name: 'Luka Eric',
        title: 'Co-founder',
        highlight: '6-figure ARR',
        highlightLabel: 'Built with Flux',
    },
]

export default function Testimonials() {
    const testimonial = testimonials[0]

    return (
        <section className="bg-white relative py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-6">
                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                        <span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
                            Real Usage
                        </span>
                    </div>
                    <h2 className="text-[28px] leading-[32px] md:text-[48px] md:leading-[52px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916]">
                        Built by <span className="font-serif italic text-[#C9A96E]">builders</span>
                    </h2>
                </div>

                {/* Featured testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="relative bg-[#F5F3EE] border-[#1a1a1a] rounded-2xl p-8 md:p-12 shadow-xl">
                        {/* Quote icon */}
                        <Quote className="absolute top-6 right-6 md:top-8 md:right-8 size-8 md:size-10 text-[#C9A96E]/20" />
                        
                        {/* Stealth company logo */}
                        <StealthLogo />
                        
                        {/* Testimonial text */}
                        <blockquote className="text-lg md:text-xl text-[#1A1916] leading-relaxed mb-8 max-w-2xl">
                            "{testimonial.text}"
                        </blockquote>

                        {/* Author info */}
                        <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-4">
                                <div className="ring-[#C9A96E]/30 aspect-square size-14 md:size-16 overflow-hidden rounded-full border-2 border-[#C9A96E]/20 shadow-lg">
                                    <img
                                        src={testimonial.avatar}
                                        alt={`Avatar of ${testimonial.name}`}
                                        className="size-full object-cover"
                                    />
                                </div>
                                <div>
                                    <span className="block text-[#1A1916] font-medium text-base md:text-lg">{testimonial.name}</span>
                                    <span className="block text-[#5C584F] text-sm md:text-base">{testimonial.title}</span>
                                </div>
                            </div>

                            {/* Highlight stat */}
                            <div className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-xl px-5 py-3 text-center">
                                <span className="block text-[#C9A96E] font-semibold text-lg md:text-xl">{testimonial.highlight}</span>
                                <span className="block text-[#5C584F] text-xs md:text-sm">{testimonial.highlightLabel}</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Social proof note */}
                <p className="text-center text-[#5C584F] text-sm mt-8">
                    Flux is used daily by the team building Nairon AI
                </p>
            </div>
        </section>
    )
}
