import Student from "../models/student.js";
import User from "../models/user.js";
import Enrollment from "../models/enrollment.js";
import Attendance from "../models/attendance.js";
import SubjectOffering from "../models/subjectoffering.js";
import Subject from "../models/subjects.js";
import Teacher from "../models/teacher.js";

// Get student profile
export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const student = await Student.findOne({ userId })
      .populate("userId", "fullName email phone");
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      name: student.userId.fullName,
      email: student.userId.email,
      phone: student.userId.phone,
      regNumber: student.regNumber,
      branch: student.branch,
      semester: student.currentSemester,
      section: student.section,
      dateOfBirth: student.dateOfBirth,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profile", error: error.message });
  }
};

// Get attendance by subject
export const getStudentAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get all enrollments for this student
    const enrollments = await Enrollment.find({ student: student._id, isActive: true })
      .populate({
        path: "subjectOffering",
        populate: [
          { path: "subject", select: "name code" },
        ]
      });

    // For each enrollment, calculate attendance percentage
    const attendanceData = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalClasses = await Attendance.countDocuments({
          subjectOfferingId: enrollment.subjectOffering._id,
          status: { $in: ["PRESENT", "ABSENT", "LEAVE"] }
        });

        const presentClasses = await Attendance.countDocuments({
          subjectOfferingId: enrollment.subjectOffering._id,
          studentId: student._id,
          status: "PRESENT"
        });

        const percentage = totalClasses > 0 
          ? Math.round((presentClasses / totalClasses) * 100)
          : 0;

        return {
          subject: enrollment.subjectOffering.subject.name,
          code: enrollment.subjectOffering.subject.code,
          percentage,
          presentClasses,
          totalClasses
        };
      })
    );

    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error: error.message });
  }
};

// Get enrolled courses
export const getStudentEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const enrollments = await Enrollment.find({ student: student._id, isActive: true })
      .populate({
        path: "subjectOffering",
        populate: [
          { path: "subject", select: "name code credits" },
          { 
            path: "teachers",
            populate: { path: "userId", select: "fullName" }
          }
        ]
      });

    const courses = enrollments.map((enrollment, index) => ({
      id: index + 1,
      code: enrollment.subjectOffering.subject.code,
      name: enrollment.subjectOffering.subject.name,
      credits: enrollment.subjectOffering.subject.credits,
      teachers: enrollment.subjectOffering.teachers.map(t => t.userId.fullName).join(", "),
      status: "Active"
    }));

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
  }
};

// Get performance trend (monthly)
export const getStudentPerformanceTrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Mock performance data - Replace this with actual grades/assessment data
    // when you have an Assessment/Grade schema
    const performanceData = [
      { name: "Jan", performance: 75 },
      { name: "Feb", performance: 78 },
      { name: "Mar", performance: 82 },
      { name: "Apr", performance: 85 },
      { name: "May", performance: 88 },
      { name: "Jun", performance: 92 },
    ];

    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching performance trend", error: error.message });
  }
};

// Get upcoming events (exams, assignments, classes)
export const getStudentUpcomingEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Mock upcoming events - Replace this when you have Event/Assessment schema
    const upcomingEvents = [
      { 
        id: 1, 
        title: "Data Structures Mid Exam", 
        date: "2025-01-15", 
        type: "exam", 
        subject: "Data Structures" 
      },
      { 
        id: 2, 
        title: "Web Dev Project Submission", 
        date: "2025-01-18", 
        type: "assignment", 
        subject: "Web Development" 
      },
      { 
        id: 3, 
        title: "Database Quiz 2", 
        date: "2025-01-20", 
        type: "quiz", 
        subject: "Database Systems" 
      },
      { 
        id: 4, 
        title: "System Design Class", 
        date: "2025-01-22", 
        type: "class", 
        subject: "System Design" 
      },
    ];

    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upcoming events", error: error.message });
  }
};

// Get grades/assessments
export const getStudentGrades = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Mock grades - Replace this when you have Grade/Assessment schema
    const gradesData = [
      { name: "Quiz 1", score: 18, total: 20 },
      { name: "Mid Sem", score: 35, total: 40 },
      { name: "Assignment", score: 9, total: 10 },
      { name: "Project", score: 28, total: 30 },
    ];

    res.json(gradesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades", error: error.message });
  }
};

// Get overall attendance percentage
const getOverallAttendance = async (studentId) => {
  const enrollments = await Enrollment.find({ student: studentId, isActive: true });
  
  let totalPercentage = 0;
  let count = 0;

  for (let enrollment of enrollments) {
    const totalClasses = await Attendance.countDocuments({
      subjectOfferingId: enrollment.subjectOffering,
      status: { $in: ["PRESENT", "ABSENT", "LEAVE"] }
    });

    const presentClasses = await Attendance.countDocuments({
      subjectOfferingId: enrollment.subjectOffering,
      studentId: studentId,
      status: "PRESENT"
    });

    if (totalClasses > 0) {
      totalPercentage += (presentClasses / totalClasses) * 100;
      count++;
    }
  }

  return count > 0 ? Math.round(totalPercentage / count) : 0;
};

// Get dashboard overview
export const getStudentDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId })
      .populate("userId", "fullName email phone");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get enrollment count
    const activeCourses = await Enrollment.countDocuments({
      student: student._id,
      isActive: true
    });

    // Get total credits
    const enrollments = await Enrollment.find({ student: student._id, isActive: true })
      .populate({
        path: "subjectOffering",
        populate: { path: "subject", select: "credits" }
      });

    const totalCredits = enrollments.reduce((sum, e) => sum + (e.subjectOffering.subject.credits || 0), 0);

    // Get overall attendance
    const overallAttendance = await getOverallAttendance(student._id);

    // Mock SGPA and study hours - Replace when you have actual data
    const mockSGPA = 8.45;
    const mockStudyHours = 48;

    res.json({
      name: student.userId.fullName,
      regNumber: student.regNumber,
      branch: student.branch,
      semester: student.currentSemester,
      section: student.section,
      email: student.userId.email,
      phone: student.userId.phone,
      stats: {
        overallAttendance,
        sgpa: mockSGPA,
        activeCourses,
        totalCredits,
        studyHours: mockStudyHours
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard overview", error: error.message });
  }
};