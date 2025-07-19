import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "./course.controller";

const coursesRouter = express.Router();

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:courseId", getCourse);

coursesRouter.post("/", createCourse);

coursesRouter.put("/:courseId", updateCourse);

coursesRouter.delete("/:courseId", deleteCourse);

export default coursesRouter;
