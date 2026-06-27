import { useEffect, useRef } from "react";
function VideoCall() {
  const localVideoRef = useRef(null);
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideoRef.current.srcObject = stream;
      } catch (err) {
        console.error(err);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="bg-slate-900 rounded-lg p-2">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="rounded-lg w-full h-60 object-cover"
      />
    </div>
  );
}

export default VideoCall;
