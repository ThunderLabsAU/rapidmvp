import { z } from "zod";
import { User, userRoleSchema } from "../schema/user";
import { keywordSearchRequestSchema } from "./search";

export type { User };

export const searchUsersRequestSchema = keywordSearchRequestSchema.extend({
  role: userRoleSchema.optional(),
});
export type SearchUsersRequest = z.infer<typeof searchUsersRequestSchema>;
