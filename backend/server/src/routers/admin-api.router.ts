import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const trpc = initTRPC.context().create({
  transformer: superjson,
});

export const adminApiRouter = trpc.router({
  getUsers: trpc.procedure.query(async () => {
    return [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ];
  }),
});
