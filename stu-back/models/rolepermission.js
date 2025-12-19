const rolePermissionSchema = new mongoose.Schema({
  role: {
    type: String, // admin, sub-admin
    required: true,
  },

  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    }
  ]
});

export default mongoose.model("RolePermission", rolePermissionSchema);
