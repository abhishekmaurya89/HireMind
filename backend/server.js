import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app=express();
app.use(cors());
app.use(express.json());
const server=http.createServer(app);
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
} catch (err) {
  console.error(err);
} 
app.use("/api/auth",authRoutes);
app.use("/api/rooms", roomRoutes);


server.listen(5000,()=>{
    console.log("server running on port 5000")
})