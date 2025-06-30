import express from "express";
import { getCourse, getCourses } from "./courses.controller.js";

const coursesRouter = express.Router();

coursesRouter.get("/", getCourses);

coursesRouter.get("/:courseId", getCourse);

coursesRouter.post("/", addCourse);

coursesRouter.put("/:courseId", updateCourse);

coursesRouter.delete("/:courseId", deleteCourse);

export default coursesRouter;
