import { useEffect, useRef } from 'react'
import { animate, createTimeline, utils } from 'animejs'
import type { Timeline, JSAnimation } from 'animejs'

const STEPS = [
  { id: 'intent', label: 'INTENT', subtitle: 'Define goal' },
  { id: 'interview', label: 'INTERVIEW', subtitle: 'Deep understanding' },
  { id: 'plan', label: 'PLAN', subtitle: 'Architecture' },
  { id: 'implement', label: 'IMPLEMENT', subtitle: 'Agents execute' },
  { id: 'review', label: 'REVIEW', subtitle: 'Tests seal spec' },
  { id: 'done', label: 'DONE', subtitle: '' },
]

const ANIMATION_DURATION = 12000 // 12 seconds total cycle
const STEP_DURATION = ANIMATION_DURATION / STEPS.length

type Animation = Timeline | JSAnimation

export function WorkflowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const animationsRef = useRef<Animation[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const nodes = container.querySelectorAll('.workflow-node')
    const connectors = container.querySelectorAll('.workflow-connector')
    const trail = trailRef.current

    // Initial state using utils.set
    utils.set(nodes, { opacity: 0.3, scale: 0.95 })
    utils.set(connectors, { strokeDashoffset: 100 })

    // Main timeline
    const tl = createTimeline({
      loop: true,
      defaults: {
        ease: 'inOutQuad',
      },
    })

    // Animate through each step
    STEPS.forEach((step, index) => {
      const nodeSelector = `.workflow-node[data-step="${step.id}"]`
      const connectorSelector = `.workflow-connector[data-step="${index}"]`

      // Get actual elements
      const nodeEl = container.querySelector(nodeSelector)
      const connectorEl = container.querySelector(connectorSelector)

      if (nodeEl) {
        // Highlight current node
        tl.add(nodeEl, {
          opacity: 1,
          scale: 1,
          duration: STEP_DURATION * 0.3,
          ease: 'outBack',
        }, index * STEP_DURATION)

        // Fade out current node (except last)
        if (index < STEPS.length - 1) {
          tl.add(nodeEl, {
            opacity: 0.4,
            scale: 0.97,
            duration: STEP_DURATION * 0.3,
            ease: 'inQuad',
          }, index * STEP_DURATION + STEP_DURATION * 0.7)
        }
      }

      // Animate connector to next step
      if (index < STEPS.length - 1 && connectorEl) {
        tl.add(connectorEl, {
          strokeDashoffset: [100, 0],
          duration: STEP_DURATION * 0.4,
          ease: 'inOutSine',
        }, index * STEP_DURATION + STEP_DURATION * 0.3)
      }
    })

    // Reset connectors at end
    tl.add(connectors, {
      strokeDashoffset: 100,
      duration: 500,
      ease: 'inQuad',
    }, ANIMATION_DURATION - 200)

    // Reset last node
    const lastNode = container.querySelector('.workflow-node[data-step="done"]')
    if (lastNode) {
      tl.add(lastNode, {
        opacity: 0.3,
        scale: 0.95,
        duration: 300,
      }, ANIMATION_DURATION - 100)
    }

    animationsRef.current.push(tl)

    if (trail) {
      const trailAnim = animate(trail, {
        strokeDashoffset: [2000, 0],
        loop: true,
        duration: ANIMATION_DURATION,
        ease: 'linear',
      })
      animationsRef.current.push(trailAnim)
    }

    return () => {
      animationsRef.current.forEach(anim => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause()
        }
      })
      animationsRef.current = []
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4 py-12">
      <svg viewBox="0 0 1000 160" className="w-full h-auto">
        <defs>
          {/* Gradient for pulse */}
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node glow */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dotted pattern */}
          <pattern id="dotPattern" width="8" height="2" patternUnits="userSpaceOnUse">
            <rect width="3" height="2" fill="var(--color-border)" opacity="0.5" />
          </pattern>
        </defs>

        {/* Background track */}
        <path
          d="M 50 80 H 950"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.3"
        />

        {/* Animated connectors */}
        {STEPS.slice(0, -1).map((_, index) => {
          const x1 = 80 + index * 160
          const x2 = 80 + (index + 1) * 160
          return (
            <line
              key={index}
              className="workflow-connector"
              data-step={index}
              x1={x1 + 60}
              y1="80"
              x2={x2 - 60}
              y2="80"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
              opacity="0.6"
            />
          )
        })}

        {/* Trailing energy line */}
        <path
          ref={trailRef}
          d="M 50 80 H 950"
          fill="none"
          stroke="url(#pulseGradient)"
          strokeWidth="3"
          strokeDasharray="100 1900"
          strokeDashoffset="2000"
          filter="url(#glow)"
        />

        {/* Workflow nodes */}
        {STEPS.map((step, index) => {
          const cx = 80 + index * 160
          const isLast = index === STEPS.length - 1
          
          return (
            <g key={step.id} className="workflow-node" data-step={step.id}>
              {/* Node background */}
              <rect
                x={cx - 55}
                y="35"
                width="110"
                height="90"
                rx="12"
                fill="var(--color-card)"
                stroke="var(--color-border)"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Corner accents */}
              <circle cx={cx - 45} cy="45" r="2.5" fill="currentColor" className="text-foreground/60" />
              <circle cx={cx + 45} cy="45" r="2.5" fill="currentColor" className="text-foreground/60" />
              <circle cx={cx - 45} cy="115" r="2.5" fill="currentColor" className="text-foreground/60" />
              <circle cx={cx + 45} cy="115" r="2.5" fill="currentColor" className="text-foreground/60" />

              {/* Dotted decorative lines */}
              <rect x={cx - 35} y="44" width="70" height="2" fill="url(#dotPattern)" />
              <rect x={cx - 35} y="114" width="70" height="2" fill="url(#dotPattern)" />

              {/* Step number indicator */}
              <circle
                cx={cx}
                cy="60"
                r="12"
                fill={isLast ? '#10b981' : 'var(--color-background)'}
                stroke={isLast ? '#10b981' : 'var(--color-border)'}
                strokeWidth="1.5"
              />
              {isLast ? (
                <path
                  d={`M ${cx - 5} 60 L ${cx - 1} 64 L ${cx + 6} 55`}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text
                  x={cx}
                  y="64"
                  textAnchor="middle"
                  className="fill-muted-foreground text-[11px] font-mono"
                >
                  {index + 1}
                </text>
              )}

              {/* Label */}
              <text
                x={cx}
                y="88"
                textAnchor="middle"
                className="fill-foreground text-[11px] font-mono font-semibold tracking-wide"
              >
                {step.label}
              </text>

              {/* Subtitle */}
              {step.subtitle && (
                <text
                  x={cx}
                  y="103"
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px]"
                >
                  {step.subtitle}
                </text>
              )}
            </g>
          )
        })}


      </svg>

      {/* Flow direction indicator */}
      <div className="flex justify-center mt-4 gap-2 items-center text-muted-foreground text-xs font-mono">
        <span className="opacity-60">Start</span>
        <svg width="60" height="8" className="opacity-40">
          <line x1="0" y1="4" x2="50" y2="4" stroke="currentColor" strokeWidth="1" />
          <path d="M 48 1 L 55 4 L 48 7" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="opacity-60">Complete</span>
      </div>
    </div>
  )
}
