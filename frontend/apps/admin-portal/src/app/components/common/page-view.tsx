import { Button } from "@repo/ui-kit/components/ui/button";
import { Spinner } from "@repo/ui-kit/components/ui/spinner";
import { cn } from "@repo/ui-kit/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";
import { H1 } from "./h1";

interface Props extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode | ReactNode[];
  backTo?: {
    label: string;
    href: LinkProps["to"];
  };
  isLoading?: boolean;
}

export const PageView = ({
  title,
  subtitle,
  children,
  actions,
  isLoading,
  backTo,
}: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-8 py-4">
      {backTo && (
        <Button variant="link" asChild className="-ml-4 text-muted-foreground">
          <Link to={backTo.href}>
            <ArrowLeftIcon className="w-4 h-4" />
            {backTo.label}
          </Link>
        </Button>
      )}
      <div
        className={cn(
          "flex justify-between items-center mt-2 h-14",
          subtitle ? "mb-1" : "mb-2"
        )}
      >
        <H1>{title}</H1>
        {actions}
      </div>
      {subtitle && <div className="text-muted-foreground mb-4">{subtitle}</div>}
      <div>{children}</div>
    </div>
  );
};
