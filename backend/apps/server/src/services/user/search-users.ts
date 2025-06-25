import { and, asc, eq } from "drizzle-orm";
import { User, userTable } from "../../schema";
import { SearchUsersRequest } from "../../types/user";
import { keywordSearch } from "../../util/db/keyword-search";
import { paginatedQuery } from "../../util/db/paginated-query";
import { Page } from "../../types/page";

export const searchUsers = async (request: SearchUsersRequest) => {
  const result = await paginatedQuery(
    userTable,
    request,
    and(
      request.role ? eq(userTable.role, request.role) : undefined,
      keywordSearch(request.keywords, [
        userTable.email,
        userTable.firstName,
        userTable.lastName,
      ])
    ),
    asc(userTable.lastName)
  );
  return result as Page<User>;
};
