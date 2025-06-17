"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "../../util/cn";
import { ReactNode } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  column: Column<TData, TValue>;
  title: string | ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center space-x-2 cursor-pointer", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {typeof title === "string" ? <span>{title}</span> : title}
      {column.getIsSorted() === "desc" ? (
        <ChevronDown />
      ) : (
        column.getIsSorted() === "asc" && <ChevronUp />
      )}
    </div>
  );
}
