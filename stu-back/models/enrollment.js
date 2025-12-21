import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subjectOffering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectOffering",
      required: true,
    },

    registrationNumber: {
      type: String,
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

enrollmentSchema.index(
  { student: 1, subjectOffering: 1, academicYear: 1 },
  { unique: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);