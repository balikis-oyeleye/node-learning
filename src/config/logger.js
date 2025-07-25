import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: "src/error-logs/error.log",
      level: "error",
    }),
  ],

  exceptionHandlers: [
    new transports.File({ filename: "src/error-logs/exceptions.log" }),
  ],

  rejectionHandlers: [
    new transports.File({ filename: "src/error-logs/rejections.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}
