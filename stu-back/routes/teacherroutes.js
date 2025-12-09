import express from "express";
import {

getProfile, updateProfile, getDashboard, getTodaysclasses, 
getUpcomingclasses , getClassesbysemester, getClassesbydate
}  from "../controllers/teachercontrollers.js";

const router = express.Router();

