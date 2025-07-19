import express from "express";
import {
  createInstructor,
  deleteInstructor,
  getAllInstructors,
  getInstructor,
  getInstructorCourses,
  updateInstructor,
} from "./instructor.controller";

const instructorRouter = express.Router();

instructorRouter.post("/", createInstructor);
instructorRouter.get("/", getAllInstructors);

instructorRouter.get("/:instructorId", getInstructor);
instructorRouter.put("/:instructorId", updateInstructor);
instructorRouter.delete("/:instructorId", deleteInstructor);

instructorRouter.get("/:instructorId/courses", getInstructorCourses);

export default instructorRouter;
