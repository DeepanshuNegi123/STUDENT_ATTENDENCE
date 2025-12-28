import express from "express";
import  authMiddleware  from "../middlewares/jwtauth.js"; 

import {

  getStudentProfile,
  getStudentAttendance,
  getStudentEnrolledCourses,
  getStudentPerformanceTrend,
  getStudentUpcomingEvents,
  getStudentGrades,
  getStudentDashboardOverview

} from "../controllers/studentController.js";



const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Main dashboard overview (single endpoint that might fetch multiple aggregated data)
router.get("/dashboard", getStudentDashboardOverview);

// Individual data endpoints
router.get("/profile", getStudentProfile);

router.get("/attendance", getStudentAttendance);

router.get("/enrollments", getStudentEnrolledCourses);

router.get("/performance", getStudentPerformanceTrend);

router.get("/upcoming-events", getStudentUpcomingEvents);

router.get("/grades", getStudentGrades);

export default router;