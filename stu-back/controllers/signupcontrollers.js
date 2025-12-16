import User from "../models/user.js";
import bcrypt from "bcrypt";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Admin from "../models/admin.js";

const signupcontroller = async (req, res) => {
  try {
    console.log("=== SIGNUP CONTROLLER STARTED ===");
    console.log("Request body:", req.body);

    const { fullName, email, phone, password, confirmPassword, role } = req.body;

    // ✅ Check if user already exists
    console.log("Checking if user exists with email:", email);
    const exist = await User.findOne({ email: email.toLowerCase() });
    
    if (exist) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Verify passwords match (extra safety check)
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // ✅ Hash password
    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // ✅ Save user with HASHED password
    console.log("Creating user in database...");
    const newUser = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
      role: role.toLowerCase(),
    });
    console.log("User created successfully with ID:", newUser._id);

    // ✅ Create role-based profile
    console.log("Creating role-based profile for role:", role);
    
    if (role === "teacher") {
      await Teacher.create({ userId: newUser._id });
      console.log("Teacher profile created");
    } else if (role === "student") {
      await Student.create({ userId: newUser._id });
      console.log("Student profile created");
    } else if (role === "admin") {
      await Admin.create({ userId: newUser._id });
      console.log("Admin profile created");
    }

    // ✅ Success response
    console.log("=== SIGNUP COMPLETED SUCCESSFULLY ===");
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("=== SIGNUP ERROR ===");
    console.error("Error type:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    // Generic server error
    return res.status(500).json({ 
      error: "Server error",
      message: error.message
    });
  }
};

export default signupcontroller;