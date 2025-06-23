import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { getUsers } from "../services/user/get-users";

export const { router, procedure } = initTRPC.context().create({
  transformer: superjson,
});

export const adminApiRouter = router({
  users: router({
    getAll: procedure.query(async () => getUsers()),
  }),
});
