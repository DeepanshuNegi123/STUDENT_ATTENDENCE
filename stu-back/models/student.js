import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔐 Auth link (ONLY REQUIRED FIELD)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 🎓 Academic identity (Admin fills later)
    regNumber: {
      type: String,
      default: null,
    },

    branch: {
      type: String, // CSE, IT, ME
      default: null, // ❌ not required at signup
    },

    currentSemester: {
      type: Number,
      default: null, // ❌ not required at signup
    },

    className: {
      type: String, // CSE-304
      default: null,
    },

    section: {
      type: String,
      default: null,
    },

    // 👨‍👩‍👧 Parent details (student fills later)
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

    // 🧍 Personal info (profile page)
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

    // 🏫 System fields
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
