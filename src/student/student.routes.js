import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  getStudentCourses,
  updateStudent,
} from "./student.controller";

const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.get("/", getAllStudents);

studentRouter.get("/:instructorId", getStudent);
studentRouter.put("/:instructorId", updateStudent);
studentRouter.delete("/:instructorId", deleteStudent);

studentRouter.get("/:instructorId/courses", getStudentCourses);

export default studentRouter;
