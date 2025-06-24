import * as trpcExpress from "@trpc/server/adapters/express";
import { Router } from "express";
import { createLogger } from "../util/log/logger";
import { adminApiRouter, createAdminRequestContext } from "./admin-api.router";

const logger = createLogger("api");

export const apiRouter = Router();

apiRouter.use(
  "/admin",
  trpcExpress.createExpressMiddleware({
    router: adminApiRouter,
    createContext: createAdminRequestContext,
    onError({ error, path, input, ctx, type, req }) {
      logger.error("Error occurred in Admin API:", { error, path });
    },
  })
);
