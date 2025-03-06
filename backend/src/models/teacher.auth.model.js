import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    Teachingmode: {
      type: [String],
      required: true,
    },
    subjectsTaught: {
      type: [String],
      required: true,
    },
    classesTaught: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    profilePicture: {
      type: String,
    },
    biography: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
