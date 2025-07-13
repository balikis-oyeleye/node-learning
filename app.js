import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import coursesRouter from "./modules/courses/courses.routes.js";

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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
