import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../components.js/CodeEditor";
import Chats from "../components.js/Chats";
import Particpants from "../components.js/Particpants";
import socket from "../socket/socket";
import VideoCall from "../components.js/VideoCall";
import { Code2, MessageSquare, Users, LogOut, PhoneOff } from "lucide-react";
import { useAppContext } from "../Contexts/AppContext";
function Room() {

  const navigate = useNavigate();
  const { roomId } = useParams();
  const [role, setRole] = useState("");
  const { user } = useAppContext();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [problem, setProblem] = useState("");
  const [chats, setChats] = useState([]);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [participants, setParticipants] = useState([]);
  const handleLeaveRoom = () => {
    socket.emit("leave-room");
    navigate("/");
  };
  const handleEndInterview = () => {
    socket.emit("end-interview", {
      roomId,
    });
  };
  useEffect(() => {
    socket.on("role-assigned", (role) => {
      setRole(role);
    });
    return () => {
      socket.off("role-assigned");
    };
  }, []);
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
    const handleProblem = (newProblem) => {
      setProblem(newProblem);
    };
    socket.on("receive-problem", handleProblem);
    return () => {
      socket.off("receive-problem", handleProblem);
    };
  }, []);
  useEffect(() => {
    socket.on("receive-language", (newLanguage) => {
      setLanguage(newLanguage);
    });
    return () => {
      socket.off("receive-language");
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

  useEffect(() => {
    socket.on("interview-ended", () => {
      navigate(`/feedback/${roomId}`);
    });
    return () => {
      socket.off("interview-ended");
    };
  }, []);
  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      <div className="h-32 bg-slate-900 border-b border-slate-800">
        <VideoCall />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            problem={problem}
            setProblem={setProblem}
            role={role}
          />
        </div>
        {activeDrawer && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
            <div className="h-14 px-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-white font-semibold">
                {activeDrawer === "chat" ? "Chat" : "Participants"}
              </h2>
              <button
                onClick={() => setActiveDrawer(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {activeDrawer === "chat" ? (
                <Chats chats={chats} setChats={setChats} />
              ) : (
                <Particpants participants={participants} />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8">
        <h1 className="text-xl font-bold text-white">HireMind</h1>
        <div className="flex items-center gap-10">
          <button
            onClick={() => setActiveDrawer(null)}
            className="flex flex-col items-center text-slate-300 hover:text-white"
          >
            <Code2 size={22} />
            <span className="text-xs">Code</span>
          </button>

          <button
            onClick={() => setActiveDrawer("chat")}
            className={`flex flex-col items-center ${
              activeDrawer === "chat" ? "text-indigo-400" : "text-slate-300"
            }`}
          >
            <MessageSquare size={22} />
            <span className="text-xs">Chat</span>
          </button>
          <button
            onClick={() => setActiveDrawer("participants")}
            className={`flex flex-col items-center ${
              activeDrawer === "participants"
                ? "text-indigo-400"
                : "text-slate-300"
            }`}
          >
            <Users size={22} />
            <span className="text-xs">Participants</span>
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleLeaveRoom}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            <LogOut size={18} />
            Leave
          </button>

          {role === "host" && (
            <button
              onClick={handleEndInterview}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
            >
              <PhoneOff size={18} />
              End
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Room;
