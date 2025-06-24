import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";
import { getOrCreateUserByAuth0Id } from "../services/user/get-or-create-user-by-auth0-id copy";
import { getUsers } from "../services/user/get-users";
import { User } from "../types/user";
import { getAuth0Id, getPermissions } from "../util/auth/auth.middleware";

interface AdminRequestContext extends CreateExpressContextOptions {
  auth0Id: string | null;
  user: User | null;
  isAdmin: boolean;
}

export const createAdminRequestContext = async (
  ctx: CreateExpressContextOptions
): Promise<AdminRequestContext> => {
  const auth0Id = getAuth0Id(ctx.req);
  const permissions = getPermissions(ctx.req);
  const isAdmin = permissions.includes("admin");
  let user: User | null = null;
  if (auth0Id) {
    user = await getOrCreateUserByAuth0Id(auth0Id);
  }
  return {
    ...ctx,
    auth0Id,
    user,
    isAdmin,
  };
};

const { router, procedure: baseProcedure } = initTRPC
  .context<AdminRequestContext>()
  .create({
    transformer: superjson,
  });

const procedure = baseProcedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be an administrator to access this resource",
    });
  }

  return opts.next(opts);
});

export const adminApiRouter = router({
  users: router({
    getAll: procedure.query(async () => getUsers()),
  }),
});
