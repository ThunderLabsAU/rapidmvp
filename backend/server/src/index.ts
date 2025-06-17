import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { config } from "./config";
import { createLogger } from "./util/log/logger";
import { apiRouter } from "./routers/api.router";

const logger = createLogger("server");

logger.info("Starting server");

export const createServer = async (): Promise<Express> => {
  // await migrateDb();

  const app = express();

  app
    .disable("x-powered-by")
    .use(helmet())
    .use(
      cors({
        origin: [config.portals.adminPortalUrl],
        credentials: true,
      })
    );

  app.use("/api", apiRouter);
  return app;
};

createServer().then((app) => {
  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`);
  });
  app.on("error", (err: Error | unknown) => logger.error(err));

  process.on("uncaughtException", (err) => {
    logger.error(err.stack);
    logger.info("Node NOT exiting after error...");
  });
});
