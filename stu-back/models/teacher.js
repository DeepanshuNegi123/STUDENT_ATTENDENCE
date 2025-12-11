import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({

  // personal information 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    default: "",
  },

  profilePicture: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },



  // professional information 
  experience: {
    type: Number,
    default: 0,
  },
  qualifications: {
    type: [String],
    default: [],
  },
  department: {
    type: String,
    default: "",
  },

}, { timestamps: true });


export default mongoose.model("Teacher", teacherSchema);
