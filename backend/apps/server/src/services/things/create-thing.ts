import { db } from "../../db";
import { type Thing, thingTable } from "../../schema";
import { type CreateThingRequest } from "../../types/thing";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("thing.create");

export const createThing = async (
  input: CreateThingRequest
): Promise<Thing> => {
  const [thing] = await db.insert(thingTable).values(input).returning();
  logger.info(`Thing created with ID "${thing.id}"`);
  return thing;
};
