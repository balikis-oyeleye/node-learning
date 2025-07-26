import express from "express";
import {
  getCoursesByInstructor,
  getInstructor,
} from "./instructor.controller.js";

const instructorRouter = express.Router();

instructorRouter.get("/:instructorId/courses", getCoursesByInstructor);
instructorRouter.get("/:instructorId", getInstructor);

export default instructorRouter;
