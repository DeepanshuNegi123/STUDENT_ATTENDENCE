import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔐 Auth link
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 🎓 Academic identity
    Regnumber: {
      type: Number,
      default: "",
    },

    branch: {
      type: String, // CSE, IT, ME, etc.
      required: true,
    },

    currentSemester: {
      type: Number,
      required: true,
    },

    // ⚠️ TEMPORARY (will later move to Enrollment)
    className: {
      type: String, // e.g. CSE-304
      default: "",
    },

    section: {
      type: String,
      default: "",
    },

    // 👨‍👩‍👧 Parent details
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

    // 🧍 Personal info
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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
