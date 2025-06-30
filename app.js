import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import coursesRouter from "./modules/courses/courses.routes.js";

dotenv.config();

const app = express();

// Debugging setup
const debugLogger = debug("app:startup");

app.use(express.json());
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.log("Morgan enabled...");
  debugLogger("Debugging is enabled...");
}

/*
 * Routes configuration starts here
 */
app.use("/courses", coursesRouter);

/*
 * Port configuration starts here
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
