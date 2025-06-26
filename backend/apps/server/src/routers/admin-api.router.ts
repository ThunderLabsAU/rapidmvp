import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";
import { z } from "zod";
import { createThing } from "../services/thing/create-thing";
import { getThing } from "../services/thing/get-thing";
import { searchThings } from "../services/thing/search-things";
import { updateThing } from "../services/thing/update-thing";
import { createUser } from "../services/user/create-user";
import { getOrCreateUserByAuth0Id } from "../services/user/get-or-create-user-by-auth0-id copy";
import { getUser } from "../services/user/get-user";
import { searchUsers } from "../services/user/search-users";
import { updateUser } from "../services/user/update-user";
import {
  createThingRequestSchema,
  searchThingsRequestSchema,
  updateThingRequestSchema,
} from "../types/thing";
import {
  createUserRequestSchema,
  searchUsersRequestSchema,
  updateUserRequestSchema,
  type User,
} from "../types/user";
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
  if (!ctx.auth0Id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

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
    get: procedure.input(z.number()).query(async ({ input }) => getUser(input)),
    search: procedure
      .input(searchUsersRequestSchema)
      .query(async ({ input }) => searchUsers(input)),
    create: procedure
      .input(createUserRequestSchema)
      .mutation(async ({ input }) => createUser(input)),
    update: procedure
      .input(updateUserRequestSchema)
      .mutation(async ({ input }) => updateUser(input)),
  }),
  things: router({
    get: procedure
      .input(z.number())
      .query(async ({ input }) => getThing(input)),
    search: procedure
      .input(searchThingsRequestSchema)
      .query(async ({ input }) => searchThings(input)),
    create: procedure
      .input(createThingRequestSchema)
      .mutation(async ({ input }) => createThing(input)),
    update: procedure
      .input(updateThingRequestSchema)
      .mutation(async ({ input }) => updateThing(input)),
  }),
});
