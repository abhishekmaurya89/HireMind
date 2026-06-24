import { v4 as uuidv4 } from "uuid";
import { rooms } from "./room.js";
export const createRoom = async (req, res) => {
  try {
    const roomId = uuidv4().slice(0, 8);
    rooms[roomId] = {
      roomId,
      createdBy: req.user.id,
      hostId: req.user.id,
      participants: [],
      code: "",
      problem: "",
      language: "cpp",
      createdAt: new Date(),
    };
    res.status(201).json({
      success: true,
      roomId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
