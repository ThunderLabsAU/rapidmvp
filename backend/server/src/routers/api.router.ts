import * as trpcExpress from "@trpc/server/adapters/express";
import { Router } from "express";
import { authMiddleware } from "../util/auth/auth.middleware";
import { createLogger } from "../util/log/logger";
import { adminApiRouter, createAdminRequestContext } from "./admin-api.router";

const logger = createLogger("api");

export const apiRouter = Router();

apiRouter.use(
  "/admin",
  authMiddleware,
  trpcExpress.createExpressMiddleware({
    router: adminApiRouter,
    createContext: createAdminRequestContext,
    onError({ error, path, input, ctx, type, req }) {
      logger.error("Error occurred in Admin API:", { error, path });
    },
  })
);
