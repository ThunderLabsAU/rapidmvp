import { and, asc, count, eq } from "drizzle-orm";
import { db, DEFAULT_PAGE_SIZE } from "../../db";
import { type Thing, thingTable } from "../../model/db";
import { type Page } from "../../model/types";
import { type SearchThingsRequest } from "../../model/types";
import { keywordSearch } from "../../util/db/keyword-search";
import { orderBy } from "../../util/db/order-by";
import { createLogger } from "../../util/log/logger";

export const searchThings = async (
  request: SearchThingsRequest
): Promise<Page<Thing>> => {
  const { pageSize = DEFAULT_PAGE_SIZE, pageIndex = 0 } = request;

  const whereClause = and(
    request.type ? eq(thingTable.type, request.type) : undefined,
    keywordSearch(request.keywords, [thingTable.name, thingTable.description])
  );

  const dataQuery = db
    .select()
    .from(thingTable)
    .where(whereClause)
    .orderBy(...orderBy(request, thingTable, asc(thingTable.name)))
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  const countQuery = db
    .select({ count: count() })
    .from(thingTable)
    .where(whereClause);

  const [data, [countResult]] = await Promise.all([dataQuery, countQuery]);

  return {
    data,
    total: countResult.count,
    pageIndex,
    pageSize,
  };
};
