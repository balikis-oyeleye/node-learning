import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/courses")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("could not cannot to mongodb"));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 4 },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack"],
    
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    // tags: ["frontend", "angular"],
    isPublished: true,
    price: 10,
    category: "backend",
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

console.log(createCourse());

async function getCourses() {
  const courses = await Course.find({
    author: "Mosh",
  }).limit(1);
  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Balikis";

  const result = await course.save();
  console.log(result);
}

// updateCourse("6875fa919c23b0be2d3e15b2");
