import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../components.js/CodeEditor";
import Chats from "../components.js/Chats";
import Particpants from "../components.js/Particpants";
import socket from "../socket/socket";
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
  });
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
    return () => {
      socket.emit("leave-room");
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
    <div className="h-screen flex">
      <div className="w-1/4 bg-slate-900 flex flex-col border-r border-slate-800">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-white font-semibold">Room: {roomId}</h1>
          <button
            onClick={handleLeaveRoom}
            className="bg-red-600 hover:bg-red-700 px-3 mx-2 py-2 rounded text-white"
          >
            Leave
          </button>
          {role === "host" && (
            <button
              onClick={handleEndInterview}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              End Interview
            </button>
          )}
        </div>

        <Particpants participants={participants} />

        <Chats chats={chats} setChats={setChats} />
      </div>
      <div className="flex-1">
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
    </div>
  );
}

export default Room;
