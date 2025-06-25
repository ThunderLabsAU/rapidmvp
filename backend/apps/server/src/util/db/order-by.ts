import { SQL } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { PgColumn } from "drizzle-orm/pg-core/columns";
import { asc, desc } from "drizzle-orm/sql/expressions";
import type { SortBy } from "../../types/sort";

export const orderBy = (
  table: PgTable<any>,
  sortBy: SortBy[] | undefined | null
): SQL[] => {
  if (!sortBy) {
    return [];
  }

  return sortBy.map(({ column, direction }) => {
    const columnRef = table[column as keyof typeof table] as PgColumn;
    return direction === "desc" ? desc(columnRef) : asc(columnRef);
  });
};
