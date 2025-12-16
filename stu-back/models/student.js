import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    section: {
      type: String,
      default: "",
    },
    parentName: {
      type: String,
      default: "",
    },
    parentPhone: {
      type: String,
      default: "",
    },
    parentEmail: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);