import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    // 🎓 Academic identity
    branch: {
      type: String,           // CSE, IT, ME
      required: true,
      trim: true,
    },

    semester: {
      type: Number,           // 1,2,3...
      required: true,
    },

    section: {
      type: String,           // A, B, C
      required: true,
      uppercase: true,
      trim: true,
    },

    academicYear: {
      type: String,           // 2024-25
      required: true,
    },

    // 🏷️ Display name (auto / manual)
    classCode: {
      type: String,           // CSE-S3-A
      required: true,
      unique: true,
      uppercase: true,
    },

    // 🔁 Lifecycle
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);
