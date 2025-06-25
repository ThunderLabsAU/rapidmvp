import { z } from "zod/v4";

export interface Page<T> {
  data: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export const pageRequestSchema = z.object({
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});
export type PageRequest = z.infer<typeof pageRequestSchema>;
