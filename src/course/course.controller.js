import { validateSchema } from "./utils/validate.js";
import courseSchema from "./schemas/course.schema.js";

let courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

export const getCourses = (_, res) => {
  res.send(courses);
};

export const getCourse = (req, res) => {
  const courseId = req.params.courseId;

  const course = courses.find((c) => c.id === parseInt(courseId));
  if (!course) {
    return res.status(404).send({ error: "Course not found" });
  }

  res.send(course);
};

export const addCourse = (req, res) => {
  const result = validateSchema(courseSchema, req.body, res);
  if (!result.success) return;

  const newCourse = {
    id: courses.length + 1,
    name: result.data.name,
  };

  courses.push(newCourse);
  res.status(201).send(newCourse);
};

export const updateCourse = (req, res) => {
  const courseId = parseInt(req.params.courseId);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).send({ error: "Course not found" });
  }

  const result = validateSchema(courseSchema, req.body, res);
  if (!result.success) return;

  course.name = result.data.name;
  courses = courses.map((c) => (c.id === course.id ? course : c));

  res.send(course);
};

export const deleteCourse = (req, res) => {
  const courseId = parseInt(req.params.courseId);

  const courseIndex = courses.findIndex((c) => c.id === courseId);
  if (courseIndex === -1) {
    return res.status(404).send({ error: "Course not found" });
  }

  courses = courses.splice(courseIndex, 1);

  res.status(200).send({ status: true });
};
