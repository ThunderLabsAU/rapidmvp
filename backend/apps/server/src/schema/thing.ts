import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const thingTypes = [
  "thingamabob",
  "whatchamacallit",
  "doohickey",
] as const;
export const thingType = pgEnum("thing_type", thingTypes);
export const thingTypeSchema = z.enum(thingTypes);
export type ThingType = (typeof thingTypes)[number];

export const thingTable = pgTable("thing", {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  type: thingType("thingamabob").notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export type Thing = typeof thingTable.$inferSelect;

export const insertThingSchema = createInsertSchema(thingTable);
export const updateThingSchema = createUpdateSchema(thingTable);
