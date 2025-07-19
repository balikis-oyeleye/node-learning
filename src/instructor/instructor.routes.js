import express from "express";
import {
  createInstructor,
  deleteInstructor,
  getAllInstructors,
  getInstructor,
  getInstructorCourses,
  removeStudentFromCourse,
  updateInstructor,
} from "./instructor.controller";

const instructorRouter = express.Router();

instructorRouter.post("/", createInstructor);

instructorRouter.get("/", getAllInstructors);
instructorRouter.get("/:instructorId", getInstructor);
instructorRouter.get("/:instructorId/courses", getInstructorCourses);

instructorRouter.put("/:instructorId", updateInstructor);

instructorRouter.delete("/:instructorId", deleteInstructor);
instructorRouter.delete(
  "/:instructorId/students/:studentId/courses/:courseId/remove",
  removeStudentFromCourse
);

export default instructorRouter;
