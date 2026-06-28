import VideoCard from "./VideoCard";
import VideoControls from "./VideoControls";

function VideoStrip({
  localVideoRef,
  remoteStreams,
  micOn,
  cameraOn,
  toggleMic,
  toggleCamera,
  handleLeaveRoom,
}) {
  return (
    <div className="h-32 bg-slate-900 border-b border-slate-800 px-4">
      <div className="h-full flex items-center">
        <div className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide">
          <VideoCard videoRef={localVideoRef} name="You" isLocal />
          {remoteStreams.map(({ socketId, stream }) => (
            <VideoCard key={socketId} stream={stream} name={`Participant`} />
          ))}
        </div>
        <div className="ml-6 shrink-0">
          <VideoControls
            micOn={micOn}
            cameraOn={cameraOn}
            toggleMic={toggleMic}
            toggleCamera={toggleCamera}
            handleLeaveRoom={handleLeaveRoom}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoStrip;
