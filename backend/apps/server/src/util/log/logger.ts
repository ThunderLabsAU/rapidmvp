import winston, { format } from "winston";
import { config } from "../../config";

const logFormat = process.env.LOG_FORMAT || "console";
const logLevel = config.logLevel || "info";

const createConsoleFormat = () =>
  format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(
      ({ timestamp, level, message, defaultMeta, stack, ...meta }) => {
        const extraParams = (meta[Symbol.for("splat")] as any[]) || [];
        const service = (defaultMeta as any)?.service || "unknown";

        let logMessage = `[${level.toUpperCase()}] [${service}] ${timestamp}: ${message}`;

        // Add extra parameters if they exist
        if (extraParams.length > 0) {
          logMessage += ` | ${JSON.stringify(extraParams)}`;
        }

        // Add stack trace if it exists
        if (stack) {
          logMessage += `\n${stack}`;
        }

        return logMessage;
      }
    )
  );

const formatLog =
  logFormat === "console" ? createConsoleFormat() : format.json();

const baseLogger = winston.createLogger({
  level: logLevel,
  transports: [new winston.transports.Console({ format: formatLog })],
});

export const createLogger = (name: string) =>
  baseLogger.child({ defaultMeta: { service: name } });
