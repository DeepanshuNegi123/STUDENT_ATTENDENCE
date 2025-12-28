import Teacher from "../models/teacher.js";
import User from "../models/user.js";
import SubjectOffering from "../models/subjectoffering.js";
import Enrollment from "../models/enrollment.js";
import Attendance from "../models/attendance.js";

/**
 * 👨‍🏫 Teacher Profile
 */
export const getTeacherProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await Teacher.findOne({ userId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    const user = await User.findById(userId).select("fullName email phone");

    res.status(200).json({
      success: true,
      profile: {
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        department: teacher.department,
        experience: teacher.experience,
        qualifications: teacher.qualifications,
        joinedAt: teacher.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 📘 Teacher → Subject Offerings
 */
export const getTeacherOfferings = async (req, res) => {
  try {
    const userId = req.user.id;

    // First find the teacher profile
    const teacher = await Teacher.findOne({ userId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    const teacherId = teacher._id;

    const offerings = await SubjectOffering.find({
      teachers: teacherId,
      isActive: true,
    })
      .populate("subject", "code name semester")
      .populate("classId", "classCode branch semester section academicYear");

    console.log("📋 Found offerings:", offerings.map(o => ({ id: o._id, subject: o.subject?.code })));

    res.status(200).json({
      success: true,
      offerings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 👥 Students of an Offering (for attendance)
 */
export const getOfferingStudents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { offeringId } = req.query;

    console.log("🔍 Request userId:", userId);
    console.log("🔍 Request offeringId:", offeringId);

    if (!offeringId) {
      return res.status(400).json({ message: "offeringId is required" });
    }

    // Find teacher profile
    const teacher = await Teacher.findOne({ userId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    console.log("✅ Teacher found:", teacher._id);

    // Check if offering exists first
    const offeringExists = await SubjectOffering.findById(offeringId);
    console.log("📋 Offering exists:", offeringExists ? "YES" : "NO");
    if (offeringExists) {
      console.log("📋 Offering teachers array:", offeringExists.teachers);
      console.log("📋 Is teacher in array?", offeringExists.teachers.includes(teacher._id));
    }

    // Ensure teacher is assigned
    const offering = await SubjectOffering.findOne({
      _id: offeringId,
      teachers: teacher._id,
      isActive: true,
    });

    if (!offering) {
      return res.status(403).json({
        message: "You are not assigned to this subject offering",
      });
    }

    const enrollments = await Enrollment.find({
      subjectOffering: offeringId,
      isActive: true,
    })
      .populate({
        path: "student",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .lean();

    console.log("✅ Enrollments found:", enrollments.length);

    const students = enrollments
      .filter((en) => en.student && en.student.userId)
      .map((en) => ({
        enrollmentId: en._id,
        studentId: en.student._id,
        registrationNumber: en.registrationNumber,
        name: en.student.userId.fullName,
        email: en.student.userId.email,
      }));

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

/**
 * 📝 Mark Attendance
 */
export const markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { offeringId, date, attendance } = req.body;

    if (!offeringId || !date || !attendance?.length) {
      return res.status(400).json({
        message: "invalid payload",
      });
    }

    // Find teacher profile
    const teacher = await Teacher.findOne({ userId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    const offering = await SubjectOffering.findOne({
      _id: offeringId,
      teachers: teacher._id,
      isActive: true,
    });

    if (!offering) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const records = attendance.map((item) => ({
      subjectOfferingId: offeringId,
      studentId: item.studentId,
      date,
      status: item.status,
      markedBy: teacher._id,
    }));

    await Attendance.insertMany(records);

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};