import { count, SQL } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { db, DEFAULT_PAGE_SIZE } from "../../db";
import type { Page } from "../../types/page";
import type { SearchRequest } from "../../types/search";
import { orderBy } from "./order-by";

// todo still some tweaks on types needed here to make it accept the table it returns
export const paginatedQuery = async <T>(
  table: PgTable,
  request: SearchRequest,
  whereClause: SQL | undefined,
  defaultOrderBy: SQL
): Promise<Page<T>> => {
  const { pageSize = DEFAULT_PAGE_SIZE, pageIndex = 0 } = request;
  const orderByClause =
    request.sortBy && request.sortBy.length > 0
      ? orderBy(table, request.sortBy)
      : [defaultOrderBy];
  const query = db
    .select()
    .from(table)
    .where(whereClause)
    .limit(pageSize)
    .offset(pageIndex * pageSize)
    .orderBy(...orderByClause);
  const data = await query;
  const total = (
    await db.select({ count: count() }).from(table).where(whereClause)
  )[0].count;

  return {
    data: data as T[],
    total,
    pageIndex,
    pageSize,
  };
};
