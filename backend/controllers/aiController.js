import { rooms } from "./room.js";
import { generateFeedback } from "../services/gemini.js";
export const getFeedback = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = rooms[roomId];
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    const feedback = await generateFeedback(
      room.problem,
      room.language,
      room.code,
    );
    res.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
