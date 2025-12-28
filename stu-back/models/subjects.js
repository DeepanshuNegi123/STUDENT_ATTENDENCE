import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,           // CSE-304, PSY-101
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,           // Database Management Systems
      required: true,
      trim: true,
    },

    semester: {
      type: Number,           // 1,2,3...
      required: true,
    },

    isElective: {
      type: Boolean,
      default: false,
    },

    branchesAllowed: [
      {
        type: String,         // CSE, IT, ME, ARTS
        trim: true,
      }
    ],

    credits: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
