import { cn } from "@/lib/utils";

const referenceAsciiArt = String.raw`
                                                                                                             ...............
                                                                                                       ...::-------======--:....
                                                                                                ..:---===++++++++++============-...
                                                                                         ...:-====+++++++++++++=========----------:.....:::...
                                                                                    ....:--=+++++++++==============---=======+++++++++++++=-....
                                                                               ....:-==+++++++++============------=++++++++++==+*********+====..
                                                                           .....:-=+++***++==========++========++***+++++=--=+++*****++++***+:..
                                                                        .....:-=++****++===========++++++*#%%@@%*+=++**++++==--=+++++++****-......
                                                                        ..:-=+++***++============++**###*##%%#*+==-:..:::---======++**+=:.........
                                                                   .....-==+****++====--=---===++***#####**++++=---::::::::---=====-:...
                                                                   ..:-=++***++==-=-----=--==+++****####****++=-------------====-:..
                                                                ...-=+++**++=-----------====++++****#******++==---------=====-:....
                                                            ....:-=+++**+==-------------=====++++++********+=-----========--:..  ...
                                                         .....:-=+++**++==------------==========+++++++***+=-----========-...
                                                         ...:-=++****+====----------=============+++++**++============--....
                                                       ...:-=++****++=======-------=================++++=====++++==--:.....
                                                .. ....::-==+*****+=========-----=============+++===++==----====--:.....
                                   ......:::::------=-::-=++*****++=========---=====++++++++++==--====----------:.......
                              ....:-=++*++++******+=-:-=++******+===============+++++++++++**++==--=--------:::.....
                             ..-+***************++=-:-=++******+====++========++++++++++++***+=-::=======--::.......
                           ..=#########********+==--=++******++====++++======+++++++++*****++=--:=+=------:....
                           .+###############*+===:-=++***+++++==+++++++++++=++++++******#**++==--=====---::..
                          ...:-=*%##########*++---=+****++++++=++++++++++==++++++****####*+++==--===---:-=:..
                               ...=#######*+++--=+*****++++===+++++++++++++++++++******++++++=---------+++-.
                                 ..:+####*++=-=++******+++===++++***++++++++++++++++**+++++++=-------+****+:.
                                  ...*##*=+=-=+********++===+++++++++++++++++++++++****+++++===---=+*******:.
                                   ..=#+-===++*********+==+++++*++++++++++++++++++*#****++++==--=*##*****#*:.
                                   ..-+---=+******##**+===+++***++++++++++++++++++*#****+++=+=-*%##**####**:.
                                   ..--:-=+*****####*+===+++***++++++++++++++++===+****+++=+=*%%%########*+:.
                                   .:=:-+*****#####*++==+++**++++++++++++++++=====+****+++=:-#@%%########*-.
                                  ..---=*****#####**+===+++**++++++++++++++=======+*+*+++=:..+%%%%#######*:.
                                  .:-=+*#*#######**+===++***+++++++++++++=========++++++-.. .-#%%%%%%####=..
                                  .--+*#########**+====++**+++++++++++++=========+*++++-..   .+%%%%%####+:
                                 .:-+**###%%%##**++===++++++=+++++++++==========+*+++=:.     .=#%%%%###*-..
                                ..-=*####%%%#****+===+++++===++++++++=========-=*+++-.       .+%%%%%###-...
                               ..:=+*#######***++===++++++++++++++++========--=*+*-...       :*%%#%%%*:.
                               ..-+*######***++++==+++++++++++++++=========---++-...        .+%%%%##+:..
                               .-=**#####****+*+===++++++++***+++========---::..            -#%%%%*-..
                              .:-=*####*******++==+++++++****+++=======----:....           .=#%#+:..
                             ..-+++###**##****++==+**++*****+++=======--::....              .:..
                             .:=***##****###***++++*+++****+++======--::....
                             .-++**#*****####*+++++++++**+++======--::..
                            .:=**#*******####**+++++++++++======--:......
                            .-+*********#####**++=============--:.....
                           ..=********#######**+===========---:.....
                           .:=******#####**##**+=========---:.......
                           .:+****************+=========--::...
                          ..=+=+***##*****+***+========--::..
                          ..+++***###*****##*+=======---::..
                          .:++++*####**+**#**=======+=-:...
                          .-+=+**####*+++*#**+=======-:...
                          .=++***####*+++*#**+=====--:....
                          .=++***###**++*##***+=---:....
                         ..++****###**++******+=--:.....
                         .:+*****##*+**+*****==--:..
                         .:+****##**********+=--:.
                         .:+****#**********+=--:....
                         .-+***************+=-:.
                         .-+**#********###*+-:..
                         .:+*#********####*=:...
                         .:+*#******######*-....
                         ..+*#******####%*-...
                         ..=*#*****######=....
                         ..-*******#####=..
                          .:*##**######=....
                          ..+**+####%#=.....
                        ....-++#@%%%#+=:....
                      ....:=#%@@@@%%*###*=:..                                                                                               ..
                     ..:+##%%%@@@@%*%%%%##+:.
                ....:+*#%%%%%@@@@#*%%%%%%%##+:.
              ...:+*#%%%%%%%%%%@##%%%%%%%%%%%#*-.
            ...-*%%%%%%%%%%%%%@%%%%%%%%%%%%%%%%*:.
          ..:=#%%%%%%%%%%%%%%%%@@@%%%%%%%%%%@@@%+.
         .:+%%%@%@%%%%%%%@%%+-#%###*+=-----=+*%%+...
       ..+%%@@@%%%#*++=+=-.......... ..... ...:=:..
     ..+@@%#+:........ .....         ...       ..
     .%@+:.. ..
    .*-...
     ..
`;

const ASCII_WIDTH = 92;
const ASCII_HEIGHT = 48;
const ASCII_RAMP = " .:-=+*#%@";

function ellipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
	return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
}

function buildSignalAsciiBrain() {
	const rows: string[] = [];

	for (let y = 0; y < ASCII_HEIGHT; y++) {
		let row = "";
		const ny = (y / (ASCII_HEIGHT - 1)) * 2 - 1;

		for (let x = 0; x < ASCII_WIDTH; x++) {
			const nx = (x / (ASCII_WIDTH - 1)) * 2 - 1;
			const left = ellipse(nx, ny, -0.32, -0.2, 0.55, 0.48);
			const right = ellipse(nx, ny, 0.32, -0.2, 0.55, 0.48);
			const crown = ellipse(nx, ny, 0, -0.48, 0.68, 0.28);
			const base = ellipse(nx, ny, 0, 0.08, 0.64, 0.36);
			const brain = left < 1 || right < 1 || crown < 1 || base < 1;
			const centerFold = Math.abs(nx) < 0.08 && ny < 0.2 && ny > -0.56;
			const lowerGap = ellipse(nx, ny, 0, 0.16, 0.17, 0.36) < 1 && ny > -0.2;
			const stem = ny > 0.26 && ny < 0.96 && Math.abs(nx) < 0.045 + (ny - 0.26) * 0.018;
			const foot = ny > 0.82 && ellipse(nx, ny, 0, 0.92, 0.22, 0.08) < 1;
			const halo = !brain && Math.min(left, right, crown, base) < 1.08;
			const inside = (brain && !lowerGap) || stem || foot || halo;

			if (!inside) {
				row += " ";
				continue;
			}

			const folds =
				Math.sin(nx * 20 + ny * 8) * 0.14 +
				Math.cos(nx * 10 - ny * 17) * 0.13 +
				Math.sin((x + y) * 0.46) * 0.06;
			const edge = Math.min(left, right, crown, base) > 0.83;
			const split = centerFold ? -0.28 : 0;
			const stemShade = stem || foot ? -0.22 + (1 - ny) * 0.2 : 0;
			let density = 0.55 - ny * 0.18 + folds + split + stemShade;

			if (edge) density -= 0.18;
			if (halo) density -= 0.46;

			const index = Math.max(
				0,
				Math.min(ASCII_RAMP.length - 1, Math.round(density * (ASCII_RAMP.length - 1))),
			);
			row += ASCII_RAMP[index];
		}

		rows.push(row.trimEnd());
	}

	return rows.join("\n");
}

const signalAsciiArt = buildSignalAsciiBrain() || referenceAsciiArt;

type SignalMemoryArtworkProps = {
	className?: string;
	tone?: "pink" | "blue" | "green";
	compact?: boolean;
};

export function SignalMemoryArtwork({
	className,
	tone = "pink",
	compact = false,
}: SignalMemoryArtworkProps) {
	const accents = {
		pink: {
			gradient: "linear-gradient(135deg, #F02E87 0%, #D9367F 42%, #F7A9CC 100%)",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		blue: {
			gradient: "linear-gradient(135deg, #F02E87 0%, #D9367F 42%, #F7A9CC 100%)",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		green: {
			gradient: "linear-gradient(135deg, #F02E87 0%, #D9367F 42%, #F7A9CC 100%)",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
	}[tone];

	return (
		<div
			aria-hidden="true"
			className={cn(
				"group relative overflow-hidden rounded-[8px] border border-[#171612]/10 bg-[#FFF8FB]",
				className,
			)}
		>
			<style>{`
				.signal-ascii-art {
					transform: translate3d(-50%, -50%, 0) scale(1.04);
					background-position: 42% 50%;
				}

				.group:hover .signal-ascii-art {
					animation:
						signalAsciiHover 980ms cubic-bezier(0.22, 1, 0.36, 1) 1 both,
						signalAsciiGradientPulse 980ms linear 1 both;
				}

				.group:hover .signal-ascii-scan {
					animation: signalAsciiScan 980ms ease-out 1 both;
				}

				@keyframes signalAsciiHover {
					0% { transform: translate3d(-50%, -50%, 0) scale(1.04); filter: saturate(1); }
					34% { transform: translate3d(-50.8%, -50.5%, 0) scale(1.075); filter: saturate(1.2); }
					68% { transform: translate3d(-49.4%, -49.8%, 0) scale(1.055); filter: saturate(1.1); }
					100% { transform: translate3d(-50%, -50%, 0) scale(1.04); filter: saturate(1); }
				}

				@keyframes signalAsciiGradientPulse {
					0% { background-position: 42% 50%; }
					52% { background-position: 100% 50%; }
					100% { background-position: 42% 50%; }
				}

				@keyframes signalAsciiScan {
					0% { transform: translateY(-120%); opacity: 0; }
					12% { opacity: 0.42; }
					55% { opacity: 0.14; }
					100% { transform: translateY(120%); opacity: 0; }
				}

				@media (prefers-reduced-motion: reduce) {
					.signal-ascii-art,
					.signal-ascii-scan {
						animation: none !important;
					}
				}
			`}</style>
			<div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(217,54,127,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,54,127,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div
				className={cn(
					"absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
					compact ? "w-[62%]" : "w-[72%]",
					accents.glow,
				)}
			/>
			<pre
				className={cn(
					"signal-ascii-art pointer-events-none absolute left-1/2 top-1/2 select-none whitespace-pre bg-clip-text font-mono font-semibold leading-[0.78] text-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100",
					compact
						? "text-[2.8px] sm:text-[3.3px] md:text-[3.9px]"
						: "text-[3.7px] sm:text-[4.4px] md:text-[5px]",
				)}
				style={{
					backgroundImage: accents.gradient,
					backgroundSize: "180% 180%",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
				}}
			>
				{signalAsciiArt}
			</pre>
			<div
				className="signal-ascii-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#F05A9D]/18 to-transparent"
			/>
			<div
				className={cn("absolute bottom-6 left-6 h-2 w-2", accents.dot)}
			/>
			<div
				className={cn(
					"absolute right-8 top-8 h-2 w-2",
					accents.dot,
					"opacity-50",
				)}
			/>
		</div>
	);
}
