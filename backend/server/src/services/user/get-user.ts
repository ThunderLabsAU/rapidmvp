import { eq } from "drizzle-orm";
import { db } from "../../db";
import { userTable } from "../../schema/user";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("user.get-user");

export const getUser = async (id: number) => {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, id));
  logger.debug(`Found user ${user.firstName} ${user.lastName} for ID ${id}`);
  return user;
};
