import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    courses: {
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

instructorSchema.virtual("instructorId").get(function () {
  return this._id.toString();
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
