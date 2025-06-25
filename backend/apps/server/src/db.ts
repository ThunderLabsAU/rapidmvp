import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "./config";
import * as schema from "./schema/index";
import fs from "fs";

const { username, password, host, port, database, ssl } = config.db;

const connection = postgres({
  host,
  username,
  password,
  database,
  port,
  max: 10,
  ssl: ssl
    ? {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./rds.pem").toString(),
      }
    : undefined,
});

export type DbType = ReturnType<typeof drizzle<typeof schema>>;
export type TransactionType = Parameters<DbType["transaction"]>[0] extends (
  tx: infer T
) => any
  ? T
  : never;

export const db: DbType = drizzle(connection, {
  schema,
  casing: "snake_case",
});

export const migrateDb = async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
};

export const DEFAULT_PAGE_SIZE = 50;
