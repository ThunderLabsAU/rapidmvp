import { and, asc, eq } from "drizzle-orm";
import { type Thing, thingTable } from "../../schema";
import { type Page } from "../../types/page";
import { type SearchThingsRequest } from "../../types/thing";
import { keywordSearch } from "../../util/db/keyword-search";
import { paginatedQuery } from "../../util/db/paginated-query";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("thing.search");

export const searchThings = async (
  request: SearchThingsRequest
): Promise<Page<Thing>> => {
  const result = await paginatedQuery(
    thingTable,
    request,
    and(
      request.type ? eq(thingTable.type, request.type) : undefined,
      keywordSearch(request.keywords, [thingTable.name, thingTable.description])
    ),
    asc(thingTable.name)
  );
  logger.debug(`Found ${result.total} things matching request`, {
    request,
  });
  return result as Page<Thing>;
};
