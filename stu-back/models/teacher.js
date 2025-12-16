import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  department: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  qualifications: {
    type: [String],
    default: [],
  },

  experience: {
    type: Number,
    default: 0,
  },

  profilePicture: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },



}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
