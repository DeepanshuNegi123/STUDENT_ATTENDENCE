const permissionSchema = new mongoose.Schema({
  key: {
    type: String, // CREATE_CLASS, ASSIGN_TEACHER
    unique: true,
    required: true,
  },

  description: {
    type: String,
  }
});

export default mongoose.model("Permission", permissionSchema);
