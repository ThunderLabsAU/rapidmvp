import { adminTrpc } from "./admin-api.context";
import { adminUsersApiRouter } from "./users/admin-users-api.router";

export const adminApiRouter = adminTrpc.router({
  users: adminUsersApiRouter,
});
