import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    subjectOfferingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectOffering",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LEAVE"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate attendance
attendanceSchema.index(
  { subjectOfferingId: 1, studentId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);
