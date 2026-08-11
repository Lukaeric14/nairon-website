import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export function Loader({ className }: { className?: string }) {
	return (
		<LoaderCircle className={cn("h-6 w-6 animate-spin text-muted-foreground", className)} />
	);
}
