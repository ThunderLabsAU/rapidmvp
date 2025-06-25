import { eq } from "drizzle-orm";
import { db } from "../../db";
import { Thing, thingTable } from "../../schema";

export const getThing = async (id: number): Promise<Thing> => {
  const [thing] = await db
    .select()
    .from(thingTable)
    .where(eq(thingTable.id, id));
  if (!thing) {
    throw new Error("Thing not found");
  }
  return thing;
};
