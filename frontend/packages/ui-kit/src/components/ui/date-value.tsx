import { format } from "date-fns";
import * as React from "react";

export const DateValue = ({
  date,
  format: fmt = "date",
  formatPattern,
}: {
  date: Date | null;
  format?: "date" | "date-time";
  formatPattern?: string;
}) => {
  if (!date) {
    return "";
  }
  const formatString =
    formatPattern || (fmt === "date" ? "dd MMM yyyy" : "dd MMM yyyy, HH:mm");
  return <span>{format(date, formatString)}</span>;
};
