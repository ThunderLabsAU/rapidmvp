import { PgColumn } from "drizzle-orm/pg-core/columns";
import { and, ilike, or } from "drizzle-orm/sql/expressions";

export const keywordSearch = (
  keywords: string | null | undefined,
  columns: PgColumn[]
) => {
  if (keywords && keywords.trim().length > 0) {
    const terms = keywords.split(" ");
    return and(
      ...terms.map((term) => {
        return or(
          ...columns.map((column) => {
            return ilike(column, `%${term}%`);
          })
        );
      })
    );
  }
  return undefined;
};
