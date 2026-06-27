import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";
function VideoCall() {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const [remoteStreams, setRemoteStreams] = useState([]);
  const createPeer = (socketId) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    localStreamRef.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStreamRef.current);
    });
    peer.ontrack = (event) => {
      setRemoteStreams((prev) => {
        const exists = prev.find((s) => s.socketId === socketId);

        if (exists) return prev;

        return [
          ...prev,
          {
            socketId,
            stream: event.streams[0],
          },
        ];
      });
    };
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          target: socketId,
          candidate: event.candidate,
        });
      }
    };
    peersRef.current[socketId] = peer;
    return peer;
  };
  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
        socket.emit("video-ready", {
          roomId,
        });
      } catch (err) {
        console.error(err);
      }
    };
    start();
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
    };
  }, [roomId]);
  useEffect(() => {
    const handleUserJoined = async ({ socketId }) => {
      const peer = createPeer(socketId);
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit("offer", {
        roomId,
        target: socketId,
        offer,
      });
    };
    const handleOffer = async ({ sender, offer }) => {
      const peer = createPeer(sender);
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("answer", {
        roomId,
        target: sender,
        answer,
      });
    };
    const handleAnswer = async ({ sender, answer }) => {
      const peer = peersRef.current[sender];
      if (!peer) return;
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    };
    const handleIceCandidate = async ({ sender, candidate }) => {
      const peer = peersRef.current[sender];
      if (!peer) return;
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    };
    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
    };
  }, [roomId]);

  return (
    <div className="space-y-3">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="w-full rounded-lg border border-slate-700"
      />

      {remoteStreams.map(({ socketId, stream }) => (
        <video
          key={socketId}
          autoPlay
          playsInline
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          className="w-full rounded-lg border border-slate-700"
        />
      ))}
    </div>
  );
}

export default VideoCall;
