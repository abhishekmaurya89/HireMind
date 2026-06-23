import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CodeEditor from "../components.js/CodeEditor";
import Chats from "../components.js/Chats";
import Particpants from "../components.js/Particpants";

import socket from "../socket/socket";
import { useAppContext } from "../Contexts/AppContext";

function Room() {
  const { roomId } = useParams();
  const { user } = useAppContext();

  const [code, setCode] = useState("");
  const [chats, setChats] = useState([]);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    if (!user) return;

    socket.emit("join-room", {
      roomId,
      user,
    });

    return () => {
      socket.off("join-room");
    };
  }, [roomId, user]);

  useEffect(() => {
    const handleCode = (newCode) => {
      setCode(newCode);
    };

    socket.on("receive-code", handleCode);

    return () => {
      socket.off("receive-code", handleCode);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (messageData) => {
      setChats((prev) => [...prev, messageData]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleParticipants = (participantsList) => {
      setParticipants(participantsList);
    };

    socket.on("participants-update", handleParticipants);

    return () => {
      socket.off("participants-update", handleParticipants);
    };
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-1/4 bg-slate-900 flex flex-col border-r border-slate-800">
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
