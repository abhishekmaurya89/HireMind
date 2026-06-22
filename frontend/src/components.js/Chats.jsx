import React, { useState } from "react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
function Chats({ chats, setChats }) {
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const { user } = useAppContext();
  console.log(user);
  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("send-message", {
      roomId,
      name: user?.name,
      message,
    });
    console.log(user);
    setMessage("");
  };
  return (
    <div className="h-full flex flex-col bg-slate-900">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chats.map((chat, index) => (
          <div key={index} className="bg-slate-800 p-3 rounded-lg">
            <p className="text-indigo-400 text-sm font-semibold">{chat.name}</p>
            <p className="text-slate-100">{chat.message}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-lg outline-none border border-slate-700"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
export default Chats;
