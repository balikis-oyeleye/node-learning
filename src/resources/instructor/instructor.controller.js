import { ResponseHandler } from "../../utils/response-handler.js";
import Instructor from "./instructor.model.js";

export const getCoursesByInstructor = async (req, res) => {
  const instructorId = req.params.instructorId;

  if (!instructorId || !mongoose.Types.ObjectId.isValid(instructorId)) {
    return ResponseHandler.send(res, false, "Invalid Instructor ID", 400);
  }

  const instructor = await Instructor.findById(instructorId).populate(
    "courses"
  );

  if (!instructor) {
    return ResponseHandler.send(res, false, "Instructor not found", 404);
  }

  return ResponseHandler.send(
    res,
    true,
    "Courses retrieved successfully",
    200,
    instructor.courses
  );
};

export const getInstructor = async (req, res) => {
  const instructorId = req.params.instructorId;

  if (!instructorId || !mongoose.Types.ObjectId.isValid(instructorId)) {
    return ResponseHandler.send(res, false, "Invalid Instructor ID", 400);
  }

  const instructor = await Instructor.findById(instructorId);

  if (!instructor) {
    return ResponseHandler.send(res, false, "Instructor not found", 404);
  }

  return ResponseHandler.send(
    res,
    true,
    "Instructor retrieved successfully",
    200,
    instructor
  );
};
