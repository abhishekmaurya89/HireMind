import { LogOut, PhoneOff, Video } from "lucide-react";

function Header({ roomId, role, handleLeaveRoom, handleEndInterview }) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">HireMind</h1>

        <p className="text-sm text-slate-400">Room: {roomId}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-green-400">
          <Video size={18} />
          <span>Live Interview</span>
        </div>
        <button
          onClick={handleLeaveRoom}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
        >
          <LogOut size={18} />
          Leave
        </button>
        {role === "host" && (
          <button
            onClick={handleEndInterview}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
          >
            <PhoneOff size={18} />
            End Interview
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
