import Chats from "../Chats";
import Particpants from "../Particpants";
import { X } from "lucide-react";
function RightDrawer({
  activeDrawer,
  setActiveDrawer,
  chats,
  setChats,
  participants,
}) {
  if (!activeDrawer) return null;
  return (
    <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
      <div className="h-14 border-b border-slate-800 flex justify-between items-center px-4">
        <h2 className="text-white font-semibold">
          {activeDrawer === "chat" ? "Chat" : "Participants"}
        </h2>
        import {X} from "lucide-react";
        <button
          onClick={() => setActiveDrawer(null)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Close drawer"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeDrawer === "chat" ? (
          <Chats chats={chats} setChats={setChats} />
        ) : (
          <Particpants participants={participants} />
        )}
      </div>
    </aside>
  );
}

export default RightDrawer;
