import express from "express";

import signupcontroller from "../controllers/signupcontrollers.js"
// import logincontroller from "../controllers/logincontrollers.js"

import signupsanitiser from "../middlewares/sanitisesignup.js";
import loginsanitiser from "../middlewares/sanitiselogin.js";


const router = express.Router();

router.post("/signup",signupsanitiser, signupcontroller);
// router.post("/login", loginsanitiser, logincontroller);

export default router;