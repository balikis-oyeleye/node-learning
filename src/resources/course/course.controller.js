import mongoose from "mongoose";
import { ResponseHandler } from "../../utils/response-handler.js";
import { validateSchema } from "../../utils/validate.js";
import Course from "./course.model.js";
import { courseSchema } from "./course.schema.js";
import Instructor from "../instructor/instructor.model.js";
import Student from "../student/student.model.js";

export const createCourse = async (req, res) => {
  const result = validateSchema(courseSchema, req.body);

  const { userId, userType } = req.user;

  if (!result.success) {
    return ResponseHandler.send(res, false, result.error, 400);
  }

  const courseData = result.data;

  if (userType !== "instructor") {
    return ResponseHandler.send(res, false, "User is not an instructor", 403);
  }

  const course = await Course.create({
    ...courseData,
    instructorId: userId,
  });

  if (!course) {
    return ResponseHandler.send(res, false, "Course creation failed", 500);
  }

  await Instructor.updateOne(
    { userId: userId },
    { $push: { courses: course.courseId } }
  );

  return ResponseHandler.send(
    res,
    true,
    "Course created successfully",
    201,
    course
  );
};

export const getCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  const course = await Course.findById(courseId).populate("instructorId");
  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  return ResponseHandler.send(
    res,
    true,
    "Course retrieved successfully",
    200,
    course
  );
};

export const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const { userId, userType } = req.user;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  if (userType !== "instructor") {
    return ResponseHandler.send(res, false, "User is not an instructor", 403);
  }

  const result = validateSchema(courseSchema, req.body);
  if (!result.success) {
    return ResponseHandler.send(res, false, result.error, 400);
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  if (userId !== course.instructorId.toString()) {
    return ResponseHandler.send(
      res,
      false,
      "You are not authorized to update this course",
      403
    );
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, result.data, {
    new: true,
  });

  if (!updatedCourse) {
    return ResponseHandler.send(res, false, "Course update failed", 500);
  }

  return ResponseHandler.send(
    res,
    true,
    "Course updated successfully",
    200,
    updatedCourse
  );
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const { userId, userType } = req.user;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  if (userType !== "instructor") {
    return ResponseHandler.send(res, false, "User is not an instructor", 403);
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  if (userId !== course.instructorId.toString()) {
    return ResponseHandler.send(
      res,
      false,
      "You are not authorized to delete this course",
      403
    );
  }

  const result = await Course.findByIdAndDelete(courseId);

  if (!result) {
    return ResponseHandler.send(res, false, "Course deletion failed", 500);
  }

  await Instructor.updateOne(
    { userId: userId },
    { $pull: { courses: courseId } }
  );

  return ResponseHandler.send(res, true, "Course deleted successfully", 200);
};

export const getAllCourses = async (_, res) => {
  const courses = await Course.find().populate("instructorId");

  return ResponseHandler.send(
    res,
    true,
    courses.length > 0 ? "Courses retrieved successfully" : "No courses found",
    200,
    courses
  );
};

export const removeStudentFromCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const studentId = req.params.studentId;

  const { userId, userType } = req.user;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  if (userType !== "instructor") {
    return ResponseHandler.send(res, false, "User is not an instructor", 403);
  }

  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    return ResponseHandler.send(res, false, "Invalid Student ID", 400);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  if (userId !== course.instructorId.toString()) {
    return ResponseHandler.send(
      res,
      false,
      "You are not authorized to remove a student from this course",
      403
    );
  }

  const student = await Student.findById(studentId);

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  if (!student.activeCourses.includes(courseId)) {
    return ResponseHandler.send(
      res,
      false,
      "Student is not enrolled in this course",
      404
    );
  }

  await Student.updateOne(
    { _id: studentId },
    { $pull: { activeCourses: courseId } }
  );

  return ResponseHandler.send(
    res,
    true,
    "Student removed from course successfully",
    200
  );
};

export const enrollStudentToCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const { userType, userId } = req.user;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  if (userType !== "student") {
    return ResponseHandler.send(res, false, "User is not an student", 403);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  const student = await Student.findOne({ user: userId });

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  if (student.activeCourses.includes(courseId)) {
    return ResponseHandler.send(
      res,
      false,
      "Student is already enrolled in this course",
      409
    );
  }

  await Student.updateOne(
    { user: userId },
    { $addToSet: { activeCourses: courseId } }
  );

  await Course.updateOne(
    { _id: courseId },
    { $addToSet: { students: student._id } }
  );

  return ResponseHandler.send(
    res,
    true,
    "Student enrolled to course successfully",
    200
  );
};

export const unEnrollStudentFromCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const { userType, userId } = req.user;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  if (userType !== "student") {
    return ResponseHandler.send(res, false, "User is not an student", 403);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  const student = await Student.findOne({ user: userId });

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  if (!student.activeCourses.includes(courseId)) {
    return ResponseHandler.send(
      res,
      false,
      "Student is not enrolled in this course",
      404
    );
  }

  await Student.updateOne(
    { _id: student._id },
    { $pull: { activeCourses: courseId } }
  );

  await Course.updateOne(
    { _id: courseId },
    { $pull: { students: student._id } }
  );

  return ResponseHandler.send(
    res,
    true,
    "Student unenrolled from course successfully",
    200
  );
};

export const markCourseAsCompleted = async (req, res) => {
  const courseId = req.params.courseId;

  const { userId, userType } = req.user;

  if (userType !== "student") {
    return ResponseHandler.send(res, false, "User is not a student", 404);
  }

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return ResponseHandler.send(res, false, "Invalid Course ID", 400);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return ResponseHandler.send(res, false, "Course not found", 404);
  }

  const student = await Student.findOne({ user: userId }).populate("user");

  if (!student) {
    return ResponseHandler.send(res, false, "Student not found", 404);
  }

  if (!student.activeCourses.includes(courseId)) {
    return ResponseHandler.send(
      res,
      false,
      "Student is not enrolled in this course",
      404
    );
  }

  await Student.updateOne(
    { user: userId },
    { $addToSet: { completedCourses: courseId } }
  );

  await Student.updateOne(
    { user: userId },
    { $pull: { activeCourses: courseId } }
  );

  return ResponseHandler.send(
    res,
    true,
    "Course marked as completed successfully",
    200
  );
};
