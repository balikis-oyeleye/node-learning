import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";
import instructorRouter from "./resourses/instructor/instructor.routes.js";
import coursesRouter from "./resourses/course/course.routes.js";
import studentRouter from "./resourses/student/student.routes.js";
import authRouter from "./resourses/auth/auth.routes.js";
import { protect } from "./middlewares/auth.middleware.js";
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
app.use("/api/courses", protect, coursesRouter);
app.use("/api/instructors", protect, instructorRouter);
app.use("/api/students", protect, studentRouter);

/*
 * Port configuration
 */
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  connectDatabase();
});
