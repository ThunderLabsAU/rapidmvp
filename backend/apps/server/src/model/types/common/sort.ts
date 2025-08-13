import { z } from "zod/v4";

export const sortBySchema = z.object({
  column: z.string(),
  direction: z.enum(["asc", "desc"]),
});
export type SortBy = z.infer<typeof sortBySchema>;

export const sortableSchema = z.object({
  sortBy: z.array(sortBySchema).optional(),
});
export type Sortable = z.infer<typeof sortableSchema>;
