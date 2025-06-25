import { db } from "../../db";
import { userTable } from "../../schema/user";
import { CreateUserRequest } from "../../types";
import { authManagement } from "../../util/auth/auth-management";
import { createLogger } from "../../util/log/logger";

const logger = createLogger("user.create");

export const createUser = async (request: CreateUserRequest) => {
  const auth0Users = await authManagement.usersByEmail.getByEmail({
    email: request.email,
  });
  let auth0User;
  if (auth0Users.data.length > 0) {
    auth0User = auth0Users.data[0];
    logger.info(
      `Found existing Auth0 account for user (email "${request.email}") with Auth0 ID ${auth0User.user_id}`
    );
  } else {
    auth0User = (
      await authManagement.users.create({
        email: request.email,
        given_name: request.firstName ?? undefined,
        family_name: request.lastName ?? undefined,
        password: request.password,
        connection: "Username-Password-Authentication",
      })
    ).data;
    logger.info(
      `Created Auth0 account for user (email "${request.email}") with Auth0 ID ${auth0User.user_id}`
    );
  }

  if (request.role === "admin") {
    const roles = await authManagement.roles.getAll();
    const adminRole = roles.data.find(
      (role) => role.name.toLowerCase() === "admin"
    );
    if (!adminRole) {
      throw new Error("Admin role not found");
    }

    // Assign the admin role to the user
    await authManagement.users.assignRoles(
      { id: auth0User.user_id! },
      { roles: [adminRole.id!] }
    );

    logger.info(`Assigned admin role to user ${auth0User.user_id}`);
  }

  const [user] = await db
    .insert(userTable)
    .values({ ...request, auth0Id: auth0User.user_id })
    .returning();
  logger.info(`Created  user with ID ${user.id}`);
  return user.id;
};
