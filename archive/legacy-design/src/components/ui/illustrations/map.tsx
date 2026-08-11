import DottedMap from 'dotted-map'

const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'
const SHADCN_AVATAR = 'https://avatars.githubusercontent.com/u/124599?v=4'

export const MapIllustration = () => (
    <div
        aria-hidden
        className="min-w-2xl relative [--color-background:transparent]">
        <div className="absolute inset-6">
            <div className="absolute left-1/3 top-1/2 z-10 size-8 -translate-x-full rotate-45 rounded-l-full rounded-t-full bg-white p-0.5 shadow-md shadow-black/15">
                <div className="before:border-foreground/20 relative size-7 -rotate-45 overflow-hidden rounded-full shadow-md before:absolute before:inset-0 before:rounded-full before:border">
                    <img
                        className="aspect-square rounded-full object-cover"
                        src={GLODIE_AVATAR}
                        alt="Glodie"
                    />
                </div>
            </div>
            <div className="ring-border-illustration absolute right-1/2 top-1/2 z-10 -translate-y-full translate-x-full rotate-45 rounded-l-full rounded-t-full bg-white p-0.5 shadow-md shadow-black/15 ring-1">
                <div className="before:border-foreground/20 relative size-7 -rotate-45 overflow-hidden rounded-full shadow-md before:absolute before:inset-0 before:rounded-full before:border">
                    <img
                        className="aspect-square rounded-full object-cover"
                        src={THEO_AVATAR}
                        alt="Theo"
                    />
                </div>
            </div>
            <div className="top-1/6 absolute right-1/4 z-10 size-8 -translate-y-full translate-x-full rotate-45 rounded-l-full rounded-t-full bg-white p-0.5 shadow-md shadow-black/15">
                <div className="before:border-foreground/20 relative size-7 -rotate-45 overflow-hidden rounded-full shadow-md before:absolute before:inset-0 before:rounded-full before:border">
                    <img
                        className="aspect-square rounded-full object-cover"
                        src={SHADCN_AVATAR}
                        alt="Shadcn"
                    />
                </div>
            </div>
        </div>
        <div className="mask-radial-from-35% *:opacity-50">
            <Map />
        </div>
    </div>
)

const map = new DottedMap({ height: 55, grid: 'vertical' })
const points = map.getPoints()

const svgOptions = {
    backgroundColor: 'var(--color-background)',
    color: 'currentColor',
    radius: 0.15,
}

export const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg
            viewBox={viewBox}
            style={{ background: svgOptions.backgroundColor }}
            className="opacity-75">
            {points.map((point: { x: number; y: number }, index: number) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={svgOptions.radius}
                    fill={svgOptions.color}
                />
            ))}
        </svg>
    )
}

export default MapIllustration
