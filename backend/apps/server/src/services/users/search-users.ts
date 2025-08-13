import { and, asc, count, eq } from "drizzle-orm";
import { db, DEFAULT_PAGE_SIZE } from "../../db";
import { userTable } from "../../model/db";
import { type SearchUsersRequest } from "../../model/types";
import { keywordSearch } from "../../util/db/keyword-search";
import { orderBy } from "../../util/db/order-by";

export const searchUsers = async (request: SearchUsersRequest) => {
  const { pageSize = DEFAULT_PAGE_SIZE, pageIndex = 0 } = request;

  const whereClause = and(
    request.role ? eq(userTable.role, request.role) : undefined,
    keywordSearch(request.keywords, [
      userTable.email,
      userTable.firstName,
      userTable.lastName,
    ])
  );

  const dataQuery = db
    .select()
    .from(userTable)
    .where(whereClause)
    .orderBy(...orderBy(request, userTable, asc(userTable.lastName)))
    .limit(pageSize)
    .offset(pageIndex * pageSize);

  const countQuery = db
    .select({ count: count() })
    .from(userTable)
    .where(whereClause);

  const [data, [countResult]] = await Promise.all([dataQuery, countQuery]);

  return {
    data,
    total: countResult.count,
    pageIndex,
    pageSize,
  };
};
