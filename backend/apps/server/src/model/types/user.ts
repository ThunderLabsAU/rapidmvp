import { z } from "zod/v4";
import {
  insertUserSchema,
  updateUserSchema,
  type User,
  userRoles,
  userRoleSchema,
} from "../db/user";
import { keywordSearchRequestSchema } from "./common/search";

export { userRoles };
export type { User };

export const searchUsersRequestSchema = keywordSearchRequestSchema.extend({
  role: userRoleSchema.optional(),
});
export type SearchUsersRequest = z.infer<typeof searchUsersRequestSchema>;

export const createUserRequestSchema = insertUserSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
  })
  .extend({
    password: z.string().min(8),
  });
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;

export const updateUserRequestSchema = updateUserSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
});
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
