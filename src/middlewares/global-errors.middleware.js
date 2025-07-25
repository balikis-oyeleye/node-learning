import { ResponseHandler } from "../utils/response-handler.js";
import { logger } from "../config/logger.js";

export const errorHandler = (err, _req, res, _next) => {
  logger.error(`${err.message} - ${err.stack}`);

  return ResponseHandler.send(res, false, "Internal Server Error", 500);
};
