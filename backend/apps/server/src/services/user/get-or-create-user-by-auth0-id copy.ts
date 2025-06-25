import { eq } from "drizzle-orm";
import { db } from "../../db";
import { userTable } from "../../schema/user";
import { authManagement } from "../../util/auth/auth-management";
import { createLogger } from "../../util/log/logger";
import { User } from "../../types/user";

const logger = createLogger("user.get-or-create-user-by-auth0-id");

export const getOrCreateUserByAuth0Id = async (
  auth0Id: string
): Promise<User> => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.auth0Id, auth0Id));
  if (!user) {
    logger.info(
      `Logged in user does not exist in DB, syncing with Auth0 for ID ${auth0Id}`
    );
    const roles = await authManagement.roles.getAll();
    const adminRole = roles.data.find(
      (role) => role.name.toLowerCase() === "admin"
    );
    const auth0User = await authManagement.users.get({
      id: auth0Id,
    });
    const userRoles = await authManagement.users.getRoles({
      id: auth0User.data.user_id!,
    });
    const isAdminInAuth0 =
      adminRole && userRoles.data.some((role) => role.id === adminRole.id);
    const [newUser] = await db
      .insert(userTable)
      .values({
        firstName: auth0User.data.given_name,
        lastName: auth0User.data.family_name,
        email: auth0User.data.email,
        auth0Id: auth0User.data.user_id,
        role: isAdminInAuth0 ? "admin" : "user",
      })
      .returning();
    return newUser;
  }
  return user;
};
