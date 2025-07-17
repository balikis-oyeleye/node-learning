import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import coursesRouter from "./modules/courses/courses.routes.js";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

/*
 * Routes configuration
 */
app.use("/courses", coursesRouter);

/*
 * Port configuration
 */
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  connectDatabase();
});
