import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    // 👤 Which student
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // 🏫 Which class (branch + semester + section)
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    // 📘 Which subject (offered this semester)
    subjectOffering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectOffering",
      required: true,
    },

    // 🔢 Roll number INSIDE this class only
    rollNumber: {
      type: String,
      required: true,
    },

    // 📅 Academic year
    academicYear: {
      type: String, // e.g. "2024-25"
      required: true,
    },

    // 🔁 Enrollment state
    status: {
      type: String,
      enum: ["active", "dropped"],
      default: "active",
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate enrollments
enrollmentSchema.index(
  { student: 1, subjectOffering: 1, academicYear: 1 },
  { unique: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
