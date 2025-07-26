import express from "express";
import { getStudent, getStudentCourses } from "./student.controller.js";

const studentRouter = express.Router();

studentRouter.get("/:studentId", getStudent);
studentRouter.get("/:studentId/courses", getStudentCourses);

export default studentRouter;
