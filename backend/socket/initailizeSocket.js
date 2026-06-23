import { rooms } from "../controllers/RoomController.js";
export const initialiseSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);
      socket.roomId = roomId;

      if (!rooms[roomId]) {
        rooms[roomId] = {
          participants: [],
          code: "",
        };
      }
      const exists = rooms[roomId].participants.find(
        (participant) => participant.socketId === socket.id,
      );
      if (!exists) {
        rooms[roomId].participants.push({
          socketId: socket.id,
          name: user.name,
          code:rooms[roomId].code
        });
      }
      io.to(roomId).emit("participants-update", rooms[roomId].participants);
      socket.emit("receive-code", rooms[roomId].code);
      console.log(socket.id, "joined", roomId);
    });
    socket.on("code-change", ({ roomId, code }) => {
      if (!rooms[roomId]) return;
      rooms[roomId].code = code;
      socket.to(roomId).emit("receive-code", code);
    });
    socket.on("send-message", ({ roomId, name, message }) => {
      io.to(roomId).emit("receive-message", {
        name,
        message,
      });
    });
    socket.on("disconnect", () => {
      const roomId = socket.roomId;
      if (!roomId || !rooms[roomId]) {
        return;
      }
      rooms[roomId].participants = rooms[roomId].participants.filter(
        (participant) => participant.socketId !== socket.id,
      );
      io.to(roomId).emit("participants-update", rooms[roomId].participants);
      if (rooms[roomId].participants.length === 0) {
        delete rooms[roomId];
      }
      console.log("User disconnected:", socket.id);
    });
  });
};
