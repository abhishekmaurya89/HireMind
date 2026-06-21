import React from "react";
function Participants({ participants }) {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Participants</h2>
      <div className="space-y-2">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="bg-slate-800 text-slate-200 p-2 rounded-md"
          >
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Participants;
