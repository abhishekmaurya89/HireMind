import express from "express";
import { getFeedback } from "../controllers/aiController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/feedback", auth, getFeedback);

export default router;
