import winston, { format } from "winston";
import { config } from "../../config";

const logFormat = process.env.LOG_FORMAT || "console";
const logLevel = config.logLevel || "info";

const createConsoleFormat = () =>
  format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, defaultMeta, ...meta }) => {
      const extraParams = meta[Symbol.for("splat")] || [];
      const extra = (extraParams as any).length
        ? ` | ${JSON.stringify(extraParams)}`
        : "";
      return `[${level.toUpperCase()}] [${(defaultMeta as any).service}] ${timestamp}: ${message}${extra}`;
    })
  );

const formatLog =
  logFormat === "console" ? createConsoleFormat() : format.json();

const baseLogger = winston.createLogger({
  level: logLevel,
  transports: [new winston.transports.Console({ format: formatLog })],
});

export const createLogger = (name: string) =>
  baseLogger.child({ defaultMeta: { service: name } });
