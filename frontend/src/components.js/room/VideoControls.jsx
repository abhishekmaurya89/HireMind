import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
} from "lucide-react";

function VideoControls({
  micOn,
  cameraOn,
  toggleMic,
  toggleCamera,
  handleLeaveRoom,
}) {
  return (
    <div className="flex items-center gap-3 px-4">
      <button
        onClick={toggleMic}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
          micOn
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {micOn ? (
          <Mic className="w-5 h-5 text-white" />
        ) : (
          <MicOff className="w-5 h-5 text-white" />
        )}
      </button>
      <button
        onClick={toggleCamera}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
          cameraOn
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {cameraOn ? (
          <Video className="w-5 h-5 text-white" />
        ) : (
          <VideoOff className="w-5 h-5 text-white" />
        )}
      </button>
      <button className="w-11 h-11 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition">
        <MonitorUp className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={handleLeaveRoom}
        className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition"
      >
        <PhoneOff className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}

export default VideoControls;
