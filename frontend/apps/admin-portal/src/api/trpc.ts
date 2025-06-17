import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AdminApiRouter } from "@repo/server/api";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AdminApiRouter>();
