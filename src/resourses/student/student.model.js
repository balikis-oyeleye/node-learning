import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    classLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    activeCourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
    },
    completedCourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual("studentId").get(function () {
  return this._id.toString();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
