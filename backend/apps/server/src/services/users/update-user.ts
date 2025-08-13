import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { userTable } from "../../model/db";
import { type UpdateUserRequest } from "../../model/types";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("user.update-user");

export const updateUser = async (request: UpdateUserRequest) => {
  if (!request.id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: " User ID is required",
    });
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, request.id),
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  const updatedUser = await db
    .update(userTable)
    .set(request)
    .where(eq(userTable.id, request.id));
  logger.info(`Updated user with ID ${request.id}`);
  return updatedUser;
};
