import express from "express";
import adminAuth from "../middlewares/adminauth.js";
import {
  // Teacher Management
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  // Student Management
  createStudent,
  getAllStudents,
  assignStudentToClass,
  // Class Management
  createClass,
  getAllClasses,
  // Subject Management
  createSubject,
  getAllSubjects,
  // Subject Offering (Teacher Assignment)
  createSubjectOffering,
  getAllOfferings,
  deleteOffering,
  // Enrollment Management
  createEnrollment,
  getAllEnrollments,
  bulkEnrollStudents,
  deleteEnrollment,
} from "../controllers/admincontroller.js";

const router = express.Router();

// =============================================
// 👨‍🏫 TEACHER ROUTES
// =============================================
router.post("/teachers", adminAuth, createTeacher);
router.get("/teachers", adminAuth, getAllTeachers);
router.put("/teachers/:id", adminAuth, updateTeacher);
router.delete("/teachers/:id", adminAuth, deleteTeacher);

// =============================================
// 👨‍🎓 STUDENT ROUTES
// =============================================
router.post("/students", adminAuth, createStudent);
router.get("/students", adminAuth, getAllStudents);
router.put("/students/assign-class", adminAuth, assignStudentToClass);

// =============================================
// 📚 CLASS ROUTES
// =============================================
router.post("/classes", adminAuth, createClass);
router.get("/classes", adminAuth, getAllClasses);

// =============================================
// 📖 SUBJECT ROUTES
// =============================================
router.post("/subjects", adminAuth, createSubject);
router.get("/subjects", adminAuth, getAllSubjects);

// =============================================
// 🎯 SUBJECT OFFERING ROUTES (Teacher Assignment)
// =============================================
router.post("/offerings", adminAuth, createSubjectOffering);
router.get("/offerings", adminAuth, getAllOfferings);
router.delete("/offerings/:id", adminAuth, deleteOffering);

// =============================================
// 📋 ENROLLMENT ROUTES
// =============================================
router.post("/enrollments", adminAuth, createEnrollment);
router.get("/enrollments", adminAuth, getAllEnrollments);
router.post("/enrollments/bulk", adminAuth, bulkEnrollStudents);
router.delete("/enrollments/:id", adminAuth, deleteEnrollment);

export default router;