import { rooms } from "../controllers/room.js";
export const initialiseSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-room", ({ roomId, user }) => {
      if (!rooms[roomId]) {
        console.log("Room not found:", roomId);
        return;
      }
      socket.join(roomId);
      socket.roomId = roomId;
      const role = user.id === rooms[roomId].createdBy ? "host" : "candidate";
      socket.emit("role-assigned", role);
      const exists = rooms[roomId].participants.find(
        (participant) => participant.socketId === socket.id,
      );

      if (!exists) {
        rooms[roomId].participants.push({
          socketId: socket.id,
          userId: user.id,
          name: user.name,
          role,
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
    socket.on("language-change", ({ roomId, language }) => {
      if (!rooms[roomId]) return;

      rooms[roomId].language = language;

      io.to(roomId).emit("receive-language", language);
    });
    socket.on("send-message", ({ roomId, name, message }) => {
      io.to(roomId).emit("receive-message", {
        name,
        message,
      });
    });
    socket.on("leave-room", () => {
      const roomId = socket.roomId;
      if (!roomId || !rooms[roomId]) return;
      rooms[roomId].participants = rooms[roomId].participants.filter(
        (participant) => participant.socketId !== socket.id,
      );
      socket.leave(roomId);
      io.to(roomId).emit("participants-update", rooms[roomId].participants);
      if (rooms[roomId].participants.length === 0) {
        delete rooms[roomId];
      }
    });
    socket.on("end-interview", ({ roomId }) => {
      io.to(roomId).emit("interview-ended");
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
