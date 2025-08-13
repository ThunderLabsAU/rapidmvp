import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";
import { z } from "zod";
import {
  createThingRequestSchema,
  createUserRequestSchema,
  searchThingsRequestSchema,
  searchUsersRequestSchema,
  updateThingRequestSchema,
  updateUserRequestSchema,
  type User,
} from "../model/types";
import { createThing } from "../services/things/create-thing";
import { getThing } from "../services/things/get-thing";
import { searchThings } from "../services/things/search-things";
import { updateThing } from "../services/things/update-thing";
import { createUser } from "../services/users/create-user";
import { getOrCreateUserByAuth0Id } from "../services/users/get-or-create-user-by-auth0-id";
import { getUser } from "../services/users/get-user";
import { searchUsers } from "../services/users/search-users";
import { updateUser } from "../services/users/update-user";
import { getAuth0Id } from "../util/auth/auth.middleware";

interface AdminRequestContext extends CreateExpressContextOptions {
  auth0Id: string | null;
  user: User | null;
  isAdmin: boolean;
}

export const createAdminRequestContext = async (
  ctx: CreateExpressContextOptions
): Promise<AdminRequestContext> => {
  const auth0Id = getAuth0Id(ctx.req);
  let user: User | null = null;
  if (auth0Id) {
    user = await getOrCreateUserByAuth0Id(auth0Id);
  }
  return {
    ...ctx,
    auth0Id,
    user,
    isAdmin: user?.role === "admin",
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
