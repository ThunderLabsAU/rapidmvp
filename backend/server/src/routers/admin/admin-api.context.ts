import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const adminTrpc = initTRPC.context().create({
  transformer: superjson,
});
