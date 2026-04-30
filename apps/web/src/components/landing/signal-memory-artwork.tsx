import { cn } from "@/lib/utils";

const asciiBrainFrameA = String.raw`
                  .:-=+**##%%%%##**+=-:.
              .-=*#%@@@%%%%%%%%%%%%@@@%#*=-.
           .-+%@@%#*+=--::::::::::--=+*#%@@%+-.
         .+%@%+-:.   .:-=++****++=-:.   .:-+%@%+.
        -%@#=.    .-+*#%%@@@@@@@@%%#*+-.    .=#@%-
      .+@%=.    .+%@@%#*+=----=+*#%@@%+.    .=%@+.
      *@#:     :%@#=.  .-======-.  .=#@%:     :#@*
     -@%=     .%@*   :*%@@%%%%@@%*:   *@%.     =%@-
     *@#      =@%   +@@#=:....:=#@@+   %@=      #@*
     %@*      #@+  :@@+  .:--:.  +@@:  +@#      *@%
     %@*      #@+  #@#  -#%%%%#-  #@#  +@#      *@%
     *@#      =@%  +@@:  .=##=.  :@@+  %@=      #@*
     -@%=     .%@*  -#@%+=-::-=+%@#-  *@%.     =%@-
      *@#:     :%@#=. :+*#%%%%#*+: .=#@%:     :#@*
      .+@%=.    .+%@%#*+=----=+*#%@%+.    .=%@+.
        -%@#=.     .-=+*#%%%%#*+=-.     .=#@%-
         .+%@%+-:.     .:----:.     .:-+%@%+.
           .-+%@@%*+=--::....::--=+*%@@%+-.
              .-=*#%%@@%%%%%%%%@@%%#*=-.
                 .:-=+**##%%##**+=-:.
                        .-#@@#-.
                         .#@@#.
`;

const asciiBrainFrameB = String.raw`
                  .:-=+**##%%%%##**+=-:.
              .-=*#%@@@%%%%%%%%%%%%@@@%#*=-.
           .-+%@@%#*+=--::::::::::--=+*#%@@%+-.
         .+%@%+-:.   .:-=++****++=-:.   .:-+%@%+.
        -%@#=.    .-+*#%%@@@@@@@@%%#*+-.    .=#@%-
      .+@%=.    .+%@@%#*+=----=+*#%@@%+.    .=%@+.
      *@#:     :%@#=.  .:-====-:.  .=#@%:     :#@*
     -@%=     .%@*   -*%@@%##%@@%*-   *@%.     =%@-
     *@#      =@%   *@%+-..  ..-+%@*   %@=      #@*
     %@*      #@+  =@@:  .+**+.  :@@=  +@#      *@%
     %@*      #@+  #@#  :%@@@@%:  #@#  +@#      *@%
     *@#      =@%  =@@-  .+**+.  -@@=  %@=      #@*
     -@%=     .%@*  +%@#=-:..:-=#@%+  *@%.     =%@-
      *@#:     :%@#=. -+*#%%%%#*+- .=#@%:     :#@*
      .+@%=.    .+%@%#*+=----=+*#%@%+.    .=%@+.
        -%@#=.     .-=+*#%%%%#*+=-.     .=#@%-
         .+%@%+-:.     .:----:.     .:-+%@%+.
           .-+%@@%*+=--::....::--=+*%@@%+-.
              .-=*#%%@@%%%%%%%%@@%%#*=-.
                 .:-=+**##%%##**+=-:.
                        .-#@@#-.
                         .#@@#.
`;

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
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		blue: {
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		green: {
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
	}[tone];

	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative overflow-hidden rounded-[8px] border border-[#171612]/10 bg-[#FFF8FB]",
				className,
			)}
		>
			<style>{`
				@keyframes signalAsciiBreathe {
					0%, 100% { transform: translate3d(-50%, -50%, 0) scale(0.985); }
					50% { transform: translate3d(-50%, -50%, 0) scale(1.025); }
				}

				@keyframes signalAsciiFrameA {
					0%, 46% { opacity: 1; }
					47%, 96% { opacity: 0; }
					97%, 100% { opacity: 1; }
				}

				@keyframes signalAsciiFrameB {
					0%, 46% { opacity: 0; }
					47%, 96% { opacity: 1; }
					97%, 100% { opacity: 0; }
				}

				@keyframes signalAsciiScan {
					0% { transform: translateY(-120%); opacity: 0; }
					12% { opacity: 0.5; }
					55% { opacity: 0.16; }
					100% { transform: translateY(120%); opacity: 0; }
				}

				@media (prefers-reduced-motion: reduce) {
					.signal-ascii-brain,
					.signal-ascii-frame-a,
					.signal-ascii-frame-b,
					.signal-ascii-scan {
						animation: none !important;
					}

					.signal-ascii-frame-a { opacity: 1 !important; }
					.signal-ascii-frame-b { opacity: 0 !important; }
				}
			`}</style>
			<div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(217,54,127,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,54,127,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div
				className={cn(
					"absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
					compact ? "w-[58%]" : "w-[68%]",
					accents.glow,
				)}
			/>
			<div
				className={cn(
					"signal-ascii-brain absolute left-1/2 top-1/2 flex items-center justify-center",
					compact ? "w-[96%]" : "w-[108%]",
				)}
				style={{
					animation: "signalAsciiBreathe 4.8s ease-in-out infinite",
				}}
			>
				<pre
					className={cn(
						"signal-ascii-frame-a select-none whitespace-pre font-mono font-semibold leading-[0.72]",
						compact
							? "text-[6px] sm:text-[6.8px] md:text-[7.4px]"
							: "text-[7px] sm:text-[8px] md:text-[8.8px]",
						accents.text,
						accents.shadow,
					)}
					style={{
						animation: "signalAsciiFrameA 1.15s steps(1, end) infinite",
					}}
				>
					{asciiBrainFrameA}
				</pre>
				<pre
					className={cn(
						"signal-ascii-frame-b absolute select-none whitespace-pre font-mono font-semibold leading-[0.72]",
						compact
							? "text-[6px] sm:text-[6.8px] md:text-[7.4px]"
							: "text-[7px] sm:text-[8px] md:text-[8.8px]",
						accents.text,
						accents.shadow,
					)}
					style={{
						animation: "signalAsciiFrameB 1.15s steps(1, end) infinite",
					}}
				>
					{asciiBrainFrameB}
				</pre>
			</div>
			<div
				className="signal-ascii-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#F05A9D]/18 to-transparent"
				style={{
					animation: "signalAsciiScan 4.8s ease-in-out infinite",
				}}
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
