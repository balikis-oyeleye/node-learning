import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "./course.controller.js";

const coursesRouter = express.Router();

coursesRouter.route("/").get(getAllCourses).post(createCourse);

coursesRouter
  .route("/:courseId")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

export default coursesRouter;
