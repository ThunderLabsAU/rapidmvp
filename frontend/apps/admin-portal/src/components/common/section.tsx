import { cn } from "@repo/ui-kit/util/cn";
import type { PropsWithChildren } from "react";

export const Section = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-md p-4 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};
