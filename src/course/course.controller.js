import mongoose from "mongoose";
import { ResponseHandler } from "../utils/response-handler";
import { validateSchema } from "../utils/validate";
import Course from "./course.model";
import { courseSchema } from "./course.schema";

export const createCourse = async (req, res) => {
  try {
    const result = validateSchema(courseSchema, req.body);
    if (!result.success) {
      return ResponseHandler(res, false, result.error, 400);
    }

    const courseData = result.data;
    const course = await Course.create(courseData);

    if (!course) {
      return ResponseHandler(res, false, "Course creation failed", 500);
    }

    return ResponseHandler(
      res,
      true,
      "Course created successfully",
      201,
      course
    );
  } catch (error) {
    return ResponseHandler(res, false, "Internal Server Error", 500);
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return ResponseHandler(res, false, "Invalid Course ID", 400);
    }

    const course = await Course.findById(courseId).populate("instructorId");
    if (!course) {
      return ResponseHandler(res, false, "Course not found", 404);
    }

    return ResponseHandler(
      res,
      true,
      "Course retrieved successfully",
      200,
      course
    );
  } catch (error) {
    return ResponseHandler(res, false, "Internal Server Error", 500);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return ResponseHandler(res, false, "Invalid Course ID", 400);
    }

    const result = validateSchema(courseSchema, req.body);
    if (!result.success) {
      return ResponseHandler(res, false, result.error, 400);
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return ResponseHandler(res, false, "Course not found", 404);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      result.data,
      {
        new: true,
      }
    );

    if (!updatedCourse) {
      return ResponseHandler(res, false, "Course update failed", 500);
    }

    return ResponseHandler(
      res,
      true,
      "Course updated successfully",
      200,
      updatedCourse
    );
  } catch (error) {
    return ResponseHandler(res, false, "Internal Server Error", 500);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return ResponseHandler(res, false, "Invalid Course ID", 400);
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return ResponseHandler(res, false, "Course not found", 404);
    }

    await Course.findByIdAndDelete(courseId);

    return ResponseHandler(res, true, "Course deleted successfully", 200);
  } catch (error) {
    return ResponseHandler(res, false, "Internal Server Error", 500);
  }
};

export const getAllCourses = async (_, res) => {
  try {
    const courses = await Course.find().populate("instructorId");

    return ResponseHandler(
      res,
      true,
      courses.length > 0
        ? "Courses retrieved successfully"
        : "No courses found",
      200,
      courses
    );
  } catch (error) {
    return ResponseHandler(res, false, "Internal Server Error", 500);
  }
};
