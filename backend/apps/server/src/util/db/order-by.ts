import { SQL } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { PgColumn } from "drizzle-orm/pg-core/columns";
import { asc, desc } from "drizzle-orm/sql/expressions";
import type { SortBy } from "../../types/sort";

export const orderBy = (
  {
    sortBy,
  }: {
    sortBy?: SortBy[];
  },
  table: PgTable<any>,
  defaultOrderBy?: SQL
) => {
  if (!sortBy) {
    return defaultOrderBy ? [defaultOrderBy] : [];
  }
  return sortBy.map(({ column, direction }) => {
    const columnRef = table[column as keyof typeof table] as PgColumn;
    return direction === "desc" ? desc(columnRef) : asc(columnRef);
  });
};
