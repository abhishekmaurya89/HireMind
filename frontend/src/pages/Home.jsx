import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function Home() {
  const [roomId, setRoomId] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/api/rooms/create`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      navigate(`/room/${data.roomId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoinRoom = async (e) => {
    e.preventDefault();

    if (!roomId.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/rooms/join`,
        {
          roomId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      navigate(`/room/${roomId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Room not found");
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          HireMind
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Real-Time Interview Platform
        </p>
        <button
          onClick={handleCreateRoom}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Create Interview Room
        </button>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="px-4 text-slate-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>
        <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
