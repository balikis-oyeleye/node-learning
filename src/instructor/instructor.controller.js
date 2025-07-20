import { ResponseHandler } from "../utils/response-handler.js";
import { validateSchema } from "../utils/validate.js";
import Instructor from "./instructor.model.js";
import { instructorSchema } from "./instructor.schema.js";

export const createInstructor = async (req, res) => {
  try {
    const result = validateSchema(instructorSchema, req.body);
    if (!result.success) {
      return ResponseHandler.send(res, false, result.error, 400);
    }

    const instructorData = result.data;
    const instructor = await Instructor.create(instructorData);

    return ResponseHandler.send(
      res,
      true,
      "Instructor created successfully",
      201,
      instructor
    );
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};
export const getInstructor = (req, res) => {};
export const updateInstructor = (req, res) => {};
export const deleteInstructor = (req, res) => {};
export const getAllInstructors = (req, res) => {};
export const getInstructorCourses = (req, res) => {};
export const removeStudentFromCourse = async (req, res) => {};
