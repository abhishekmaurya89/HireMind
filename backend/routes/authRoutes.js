import { Login } from "../controllers/LoginController.js";
import { Signup } from "../controllers/SignupController.js";
import express from "express";
const router=express.Router();

router.post("/login",Login);
router.post("/signup",Signup);

export default router;