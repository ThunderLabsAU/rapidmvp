import { z } from "zod/v4";
import {
  insertThingSchema,
  Thing,
  ThingType,
  thingTypes,
  thingTypeSchema,
  updateThingSchema,
} from "../schema/thing";
import { keywordSearchRequestSchema } from "./search";

export { thingTypes };
export type { Thing, ThingType };

export const searchThingsRequestSchema = keywordSearchRequestSchema.extend({
  type: thingTypeSchema.optional(),
});
export type SearchThingsRequest = z.infer<typeof searchThingsRequestSchema>;

export const createThingRequestSchema = insertThingSchema.pick({
  name: true,
  description: true,
  type: true,
});
export type CreateThingRequest = z.infer<typeof createThingRequestSchema>;

export const updateThingRequestSchema = updateThingSchema
  .pick({
    id: true,
    name: true,
    description: true,
    type: true,
  })
  .required({
    id: true,
    name: true,
    type: true,
  });
export type UpdateThingRequest = z.infer<typeof updateThingRequestSchema>;
