import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";
import cors from "cors";
import { errorHandler } from "./middlewares/global-errors.middleware.js";
import setupRoutes from "./startup/routes.js";

const app = express();

/*
 * Middleware configuration
 */
app.use(express.json());
app.use(helmet());
app.use(cors());
if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

/*
 * Signal handlers
 */
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

/*
 * Routes configuration
 */

setupRoutes(app);

/*
 * Global error handler
 */
app.use(errorHandler);

/*
 * Port configuration
 */
app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}`);
  connectDatabase();
});
