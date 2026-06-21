import { v4 as uuidv4 } from "uuid";
export const rooms = {};
export const createRoom = async (req, res) => {
  try {
    const roomId = uuidv4().slice(0, 8);
    rooms[roomId] = {
      roomId,
      createdBy: req.user.id,
      participants: [req.user.id],
      code: "",
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

export const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = rooms[roomId];

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (!room.participants.includes(req.user.id)) {
      room.participants.push(req.user.id);
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
