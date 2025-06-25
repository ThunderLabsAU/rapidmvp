import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userRoles = ["admin", "user"] as const;
export const userRole = pgEnum("user_role", userRoles);
export const userRoleSchema = z.enum(userRoles);
export type UserRole = (typeof userRoles)[number];

export const userTable = pgTable(
  "user",
  {
    id: serial().primaryKey(),
    auth0Id: text().notNull(),
    firstName: text(),
    lastName: text(),
    email: text().notNull(),
    role: userRole("user").notNull().default("user"),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (users) => {
    return [
      uniqueIndex("unique_user_email").on(users.email),
      uniqueIndex("unique_user_auth0_id").on(users.auth0Id),
    ];
  }
);

export type User = typeof userTable.$inferSelect;

export const insertUserSchema = createInsertSchema(userTable);
export const updateUserSchema = createUpdateSchema(userTable);
