
import express, { Router } from "express";
import { getTeacherProfile }
    from "../controllers/teachercontroller.js";
import authMiddleware from "../middlewares/jwtauth.js";
const router = express.Router();

router.get("/profile", authMiddleware, getTeacherProfile);


export default router