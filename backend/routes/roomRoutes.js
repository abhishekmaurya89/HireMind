import express from "express";
import auth from "../middleware/auth.js";
import { createRoom, joinRoom } from "../controllers/roomController.js";
const router = express.Router();
router.post("/create", auth, createRoom);
router.post("/join", auth, joinRoom);

export default router;
