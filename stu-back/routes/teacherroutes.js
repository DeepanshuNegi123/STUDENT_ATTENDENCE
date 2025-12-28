import express from "express";
import authMiddleware from "../middlewares/jwtauth.js";

import {
  getTeacherProfile,
  getTeacherOfferings,
  getOfferingStudents,
  markAttendance,
} from "../controllers/teachercontroller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getTeacherProfile);
router.get("/offerings", authMiddleware, getTeacherOfferings);
router.get("/attendance/students", authMiddleware, getOfferingStudents);
router.post("/attendance", authMiddleware, markAttendance);

export default router;
