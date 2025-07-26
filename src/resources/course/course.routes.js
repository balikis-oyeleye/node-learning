import express from "express";
import {
  createCourse,
  deleteCourse,
  enrollStudentToCourse,
  getAllCourses,
  getCourse,
  removeStudentFromCourse,
  updateCourse,
} from "./course.controller.js";

const coursesRouter = express.Router();

coursesRouter.route("/").get(getAllCourses).post(createCourse);

coursesRouter
  .route("/:courseId")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

coursesRouter.delete(
  "/:courseId/students/:studentId/remove",
  removeStudentFromCourse
);

coursesRouter.post(
  "/:courseId/students/:studentId/enroll",
  enrollStudentToCourse
);

export default coursesRouter;
