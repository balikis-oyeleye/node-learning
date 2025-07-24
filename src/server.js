import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";
import instructorRouter from "./resources/instructor/instructor.routes.js";
import coursesRouter from "./resources/course/course.routes.js";
import studentRouter from "./resources/student/student.routes.js";
import authRouter from "./resources/auth/auth.routes.js";
import { protectedRoutes } from "./middlewares/auth.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

/*
 * Routes configuration
 */
app.use("/api/auth", authRouter);
app.use("/api/courses", protectedRoutes, coursesRouter);
app.use("/api/instructors", protectedRoutes, instructorRouter);
app.use("/api/students", protectedRoutes, studentRouter);

/*
 * Port configuration
 */
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  connectDatabase();
});
