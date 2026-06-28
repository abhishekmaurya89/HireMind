function VideoCard({
  stream,
  videoRef,
  name,
  isLocal = false,
}) {
  return (
    <div className="relative w-48 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
      {isLocal ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          autoPlay
          playsInline
          ref={(video) => {
            if (video && stream) {
              video.srcObject = stream;
            }
          }}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1">
        <p className="text-xs text-white font-medium truncate">
          {name}
        </p>
      </div>
      {isLocal && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full">
          You
        </div>
      )}
    </div>
  );
}

export default VideoCard;