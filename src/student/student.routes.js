import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  getStudentCourses,
  updateStudent,
} from "./student.controller.js";

const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.post("/:studentId/courses/:courseId/register", (req, res) => {});

studentRouter.get("/", getAllStudents);
studentRouter.get("/:studentId", getStudent);
studentRouter.get("/:studentId/courses", getStudentCourses);

studentRouter.put("/:studentId", updateStudent);
studentRouter.put(
  "/:studentId/courses/:courseId/mark-as-completed",
  (req, res) => {}
);

studentRouter.delete("/:studentId", deleteStudent);
studentRouter.delete(
  "/:studentId/courses/:courseId/unregister",
  (req, res) => {}
);

export default studentRouter;
