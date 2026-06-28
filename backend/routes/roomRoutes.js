import express from "express";
import auth from "../middleware/auth.js";
import { createRoom } from "../controllers/RoomController.js";
const router = express.Router();
router.post("/create", auth, createRoom);
export default router;
 