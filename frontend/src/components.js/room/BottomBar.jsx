function BottomBar({ activeDrawer, setActiveDrawer }) {
  return (
    <footer className="h-16 bg-slate-900 border-t border-slate-800 flex justify-center items-center gap-12">
      <button
        onClick={() => setActiveDrawer(null)}
        className="flex flex-col items-center text-slate-400 hover:text-white"
      >
        <Code2 size={20} />
        <span className="text-xs">Code</span>
      </button>
      <button
        onClick={() => setActiveDrawer("chat")}
        className={`flex flex-col items-center ${
          activeDrawer === "chat" ? "text-indigo-400" : "text-slate-400"
        }`}
      >
        <MessageSquare size={20} />
        <span className="text-xs">Chat</span>
      </button>
      <button
        onClick={() => setActiveDrawer("participants")}
        className={`flex flex-col items-center ${
          activeDrawer === "participants" ? "text-indigo-400" : "text-slate-400"
        }`}
      >
        <Users size={20} />
        <span className="text-xs">Participants</span>
      </button>
    </footer>
  );
}
export default BottomBar;
