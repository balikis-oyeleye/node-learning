import { protectedRoutes } from "../middlewares/auth.middleware.js";
import authRouter from "../resources/auth/auth.routes.js";
import coursesRouter from "../resources/course/course.routes.js";
import instructorRouter from "../resources/instructor/instructor.routes.js";
import studentRouter from "../resources/student/student.routes.js";

const setupRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/courses", protectedRoutes, coursesRouter);
  app.use("/api/instructors", protectedRoutes, instructorRouter);
  app.use("/api/students", protectedRoutes, studentRouter);
};

export default setupRoutes;
