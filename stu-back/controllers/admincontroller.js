import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Class from "../models/classes.js";
import Subject from "../models/subjects.js";
import SubjectOffering from "../models/subjectoffering.js";
import bcrypt from "bcrypt";

// =============================================
// 👨‍🏫 TEACHER MANAGEMENT
// =============================================

export const createTeacher = async (req, res) => {
  try {
    const { fullName, email, phone, department, experience, qualifications } = req.body;

    // Check if user exists
    const exist = await User.findOne({ email: email.toLowerCase() });
    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Teacher@123", salt);

    const newUser = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
      role: "teacher",
    });

    // Create teacher profile
    const newTeacher = await Teacher.create({
      userId: newUser._id,
      department: department || "Not Assigned",
      phone: phone.trim(),
      experience: experience || 0,
      qualifications: qualifications || [],
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher: {
        id: newTeacher._id,
        name: newUser.fullName,
        email: newUser.email,
        department: newTeacher.department,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create teacher" });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("userId", "fullName email phone");

    res.json({
      success: true,
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { department, experience, qualifications, phone } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { department, experience, qualifications, phone },
      { new: true }
    ).populate("userId", "fullName email");

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update teacher" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Also delete user
    await User.findByIdAndDelete(teacher.userId);

    res.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

// =============================================
// 👨‍🎓 STUDENT MANAGEMENT
// =============================================

export const createStudent = async (req, res) => {
  try {
    const { fullName, email, phone, registrationNumber, classId } = req.body;

    // Check if user exists
    const exist = await User.findOne({ email: email.toLowerCase() });
    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Student@123", salt);

    const newUser = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
      role: "student",
    });

    // Create student profile
    const newStudent = await Student.create({
      userId: newUser._id,
      registrationNumber: registrationNumber.trim(),
      classId: classId || null,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: {
        id: newStudent._id,
        name: newUser.fullName,
        email: newUser.email,
        registrationNumber: newStudent.registrationNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create student" });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userId", "fullName email phone")
      .populate("classId", "classCode branch semester");

    res.json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const assignStudentToClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { classId },
      { new: true }
    ).populate("userId", "fullName email").populate("classId", "classCode branch");

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student assigned to class successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign student" });
  }
};

// =============================================
// 📚 CLASS MANAGEMENT
// =============================================

export const createClass = async (req, res) => {
  try {
    const { classCode, branch, semester, section, academicYear } = req.body;

    const newClass = await Class.create({
      classCode,
      branch,
      semester,
      section,
      academicYear,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create class" });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true });

    res.json({
      success: true,
      count: classes.length,
      classes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

// =============================================
// 📖 SUBJECT MANAGEMENT
// =============================================

export const createSubject = async (req, res) => {
  try {
    const { code, name, credits, semester } = req.body;

    const newSubject = await Subject.create({
      code,
      name,
      credits,
      semester,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: newSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create subject" });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// =============================================
// 🎯 SUBJECT OFFERING (Teacher Assignment)
// =============================================

export const createSubjectOffering = async (req, res) => {
  try {
    const { classId, subject, teacherId, academicYear, semester } = req.body;

    const newOffering = await SubjectOffering.create({
      classId,
      subject,
      teachers: [teacherId], // Store as array
      academicYear,
      semester,
      isActive: true,
    });

    const populated = await newOffering.populate([
      { path: "classId" },
      { path: "subject" },
      { path: "teachers" },
    ]);

    res.status(201).json({
      success: true,
      message: "Subject assigned to teacher successfully",
      offering: populated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create offering" });
  }
};

export const getAllOfferings = async (req, res) => {
  try {
    const offerings = await SubjectOffering.find({ isActive: true })
      .populate("classId", "classCode branch semester")
      .populate("subject", "code name credits")
      .populate("teachers", "userId");

    res.json({
      success: true,
      count: offerings.length,
      offerings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch offerings" });
  }
};

export const deleteOffering = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SubjectOffering.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Offering not found" });
    }

    res.json({
      success: true,
      message: "Subject offering deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete offering" });
  }
};

