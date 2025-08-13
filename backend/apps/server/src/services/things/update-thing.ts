import { eq } from "drizzle-orm";
import { db } from "../../db";
import { type Thing, thingTable } from "../../model/db";
import { type UpdateThingRequest } from "../../model/types";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("thing.update");

export const updateThing = async (
  input: UpdateThingRequest
): Promise<Thing> => {
  const [thing] = await db
    .update(thingTable)
    .set(input)
    .where(eq(thingTable.id, input.id))
    .returning();
  logger.info(`Updated Thing with ID "${thing.id}"`);
  return thing;
};
