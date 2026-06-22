import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components.js/CodeEditor";
import Chats from "../components.js/Chats";
import Particpants from "../components.js/Particpants";
import { useEffect } from "react";
import socket from "../socket/socket";

function Room() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [chats, setChats] = useState([]);
  const [participants, setParticipants] = useState([]);
  console.log(socket)
  useEffect(() => {
  if (!socket) return;
  socket.emit("join-room", roomId);
}, [roomId]);
  useEffect(() => {
 socket.on("receive-code", (newCode) => {
  console.log("received", newCode);

  setCode(newCode);
});
  return () => {
    socket.off("receive-code");
  };
}, []);
useEffect(() => {
  socket.on("receive-message", (messageData) => {
    setChats((prev) => [
      ...prev,
      messageData,
    ]);
  });

  return () => {
    socket.off("receive-message");
  };
}, []);
  return (
    <div className="h-screen flex">
      <div className="w-1/4 bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-white font-semibold">Room: {roomId}</h1>
        </div>

        <Particpants participants={participants} />

        <Chats chats={chats} setChats={setChats} />
      </div>

      <div className="flex-1">
        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
}

export default Room;
