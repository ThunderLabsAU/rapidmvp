import { z } from "zod";
import { pageRequestSchema } from "./page";
import { sortableSchema } from "./sort";

export const searchRequestSchema = sortableSchema.merge(pageRequestSchema);

export type SearchRequest = z.infer<typeof searchRequestSchema>;

export const keywordSearchRequestSchema = searchRequestSchema.extend({
  keywords: z.string().optional(),
});
export type KeywordSearchRequest = z.infer<typeof keywordSearchRequestSchema>;
