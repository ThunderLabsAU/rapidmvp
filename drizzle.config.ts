import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "./apps/server/.env") });

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

export default defineConfig({
  out: "./backend/apps/server/migrations",
  schema: "./backend/apps/server/src/model/db/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://${username}:${password}@${host}:${port}/${db}`,
  },
  verbose: true,
  strict: true,
  casing: "snake_case",
});
