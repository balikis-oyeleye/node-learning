import mongoose from "mongoose";

export class StudentService {
  static async isValidStudentId(studentId) {
    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return ResponseHandler.send(res, false, "Invalid Student ID", 400);
    }

    return true;
  }
}
