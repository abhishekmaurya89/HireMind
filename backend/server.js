import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import { initialiseSocket } from "./socket/initailizeSocket.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
initialiseSocket(io);
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
} catch (err) {
  console.error(err);
}
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/ai", serviceRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running");
});
