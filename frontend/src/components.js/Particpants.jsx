import React from "react";
import socket from "../socket/socket";
import { useEffect } from "react";
function Participants({ participants }) {
  return (
    <div className="p-4 border-b border-slate-800">
      <h2 className="text-white font-semibold mb-3">Participants</h2>
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.socketId}
            className="bg-slate-800 text-white px-3 py-2 rounded-lg"
          >
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Participants;
