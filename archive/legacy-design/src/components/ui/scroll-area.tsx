import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

type ScrollMask = "none" | "vertical" | "horizontal";

type ScrollAreaProps = React.ComponentPropsWithoutRef<
	typeof ScrollAreaPrimitive.Root
> & {
	mask?: ScrollMask;
	viewportClassName?: string;
	scrollbarClassName?: string;
	thumbClassName?: string;
};

const ScrollArea = React.forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
	ScrollAreaProps
>(
	(
		{
			className,
			children,
			mask = "vertical",
			viewportClassName,
			scrollbarClassName,
			thumbClassName,
			...props
		},
		ref,
	) => {
		const viewportRef =
			React.useRef<React.ElementRef<typeof ScrollAreaPrimitive.Viewport>>(null);
		const [overflow, setOverflow] = React.useState({
			top: false,
			bottom: false,
			left: false,
			right: false,
		});

		const updateOverflow = React.useCallback(() => {
			const node = viewportRef.current;
			if (!node) return;

			const threshold = 1;
			const canScrollY = node.scrollHeight - node.clientHeight > threshold;
			const canScrollX = node.scrollWidth - node.clientWidth > threshold;
			const next = {
				top: canScrollY && node.scrollTop > threshold,
				bottom:
					canScrollY &&
					node.scrollTop + node.clientHeight < node.scrollHeight - threshold,
				left: canScrollX && node.scrollLeft > threshold,
				right:
					canScrollX &&
					node.scrollLeft + node.clientWidth < node.scrollWidth - threshold,
			};

			setOverflow((current) =>
				current.top === next.top &&
				current.bottom === next.bottom &&
				current.left === next.left &&
				current.right === next.right
					? current
					: next,
			);
		}, []);

		React.useEffect(() => {
			const node = viewportRef.current;
			if (!node) return;

			updateOverflow();
			node.addEventListener("scroll", updateOverflow, { passive: true });
			window.addEventListener("resize", updateOverflow);

			const resizeObserver =
				typeof ResizeObserver !== "undefined"
					? new ResizeObserver(updateOverflow)
					: null;
			resizeObserver?.observe(node);
			if (node.firstElementChild) {
				resizeObserver?.observe(node.firstElementChild);
			}

			return () => {
				node.removeEventListener("scroll", updateOverflow);
				window.removeEventListener("resize", updateOverflow);
				resizeObserver?.disconnect();
			};
		}, [updateOverflow]);

		return (
			<ScrollAreaPrimitive.Root
				ref={ref}
				className={cn("relative overflow-hidden", className)}
				{...props}
			>
				<ScrollAreaPrimitive.Viewport
					ref={viewportRef}
					className={cn(
						"h-full w-full rounded-[inherit] scrollbar-thin",
						mask === "vertical" && "scroll-mask-y",
						mask === "horizontal" && "scroll-mask-x",
						viewportClassName,
					)}
					data-overflow-top={overflow.top || undefined}
					data-overflow-bottom={overflow.bottom || undefined}
					data-overflow-left={overflow.left || undefined}
					data-overflow-right={overflow.right || undefined}
				>
					{children}
				</ScrollAreaPrimitive.Viewport>
				<ScrollBar className={scrollbarClassName} thumbClassName={thumbClassName} />
				<ScrollAreaPrimitive.Corner />
			</ScrollAreaPrimitive.Root>
		);
	},
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
		thumbClassName?: string;
	}
>(({ className, thumbClassName, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
				"h-full w-2 border-l border-l-transparent p-[2px]",
			orientation === "horizontal" &&
				"h-2 flex-col border-t border-t-transparent p-[2px]",
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb
			className={cn("relative flex-1 rounded-full bg-border/80", thumbClassName)}
		/>
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
