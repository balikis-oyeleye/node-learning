import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categories: {
      type: [String],
      required: [true, "At least one category is required"],
      enum: [
        "Programming",
        "Design",
        "Marketing",
        "Business",
        "Data Science",
        "Other",
      ],
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.virtual("courseId").get(function () {
  return this._id.toString();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
