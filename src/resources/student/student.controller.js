import Student from "./student.model.js";
import { ResponseHandler } from "../../utils/response-handler.js";
import { StudentService } from "./student.service.js";

export const getStudentCourses = async (req, res) => {
  const studentId = req.params.studentId;

  StudentService.isValidStudentId(studentId);

  const student = await Student.findById(studentId).populate("courses");

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  return ResponseHandler.send(
    res,
    true,
    "Student courses retrieved successfully",
    200,
    student.courses
  );
};

export const getStudent = async (req, res) => {
  const studentId = req.params.studentId;

  StudentService.isValidStudentId(studentId);

  const student = await Student.findById(studentId).populate("user");

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  return ResponseHandler.send(
    res,
    true,
    "Student retrieved successfully",
    200,
    student
  );
};
