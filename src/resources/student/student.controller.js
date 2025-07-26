import Student from "./student.model.js";

export const getStudentCourses = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    return ResponseHandler.send(res, false, "Invalid Student ID", 400);
  }

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

export const getStudent = (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    return ResponseHandler.send(res, false, "Invalid Student ID", 400);
  }

  const student = Student.findById(studentId).populate("user");

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
