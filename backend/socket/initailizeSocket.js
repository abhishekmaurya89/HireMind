export const initialiseSocket = (io) => {
  const participants = {};
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      console.log(socket.id, "joined", roomId);
    });
    socket.on("code-change", ({ roomId, code }) => {
      console.log("received code", roomId);
      socket.to(roomId).emit("receive-code", code);
    });

    socket.on("send-message", ({ roomId, message, sender }) => {
      io.to(roomId).emit("receive-message", {
        sender,
        message,
      });
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
