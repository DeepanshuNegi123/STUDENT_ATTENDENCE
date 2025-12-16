import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      default: ["manage_users", "manage_classes"],
    },
    department: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);