import express from "express";
import authMiddleware from "../middlewares/jwtauth.js";
import {
  createClass,
  assignSubjectToClass,
  getAllClasses,
  getAllOfferings,
} from "../controllers/admincontroller.js";

const router = express.Router();


router.post("/classes", authMiddleware, createClass);
router.get("/classes", authMiddleware, getAllClasses);

router.post("/subject-offering", authMiddleware, assignSubjectToClass);
router.get("/subject-offering", authMiddleware, getAllOfferings);

export default router;
