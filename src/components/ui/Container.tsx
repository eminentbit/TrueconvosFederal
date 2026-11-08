import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Centered 1200px page column with the standard 24px gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-6", className)}
      {...props}
    />
  );
}
