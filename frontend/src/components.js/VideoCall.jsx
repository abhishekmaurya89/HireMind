import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import VideoStrip from "./room/VideoStrip";
function VideoCall() {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
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
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        socket.emit("video-ready", {
          roomId,
        });
      } catch (err) {
        console.log(err);
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
  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  };
  const toggleCamera = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (!videoTrack) return;
    videoTrack.enabled = !videoTrack.enabled;
    setCameraOn(videoTrack.enabled);
  };
  return (
    <VideoStrip
      localVideoRef={localVideoRef}
      remoteStreams={remoteStreams}
      micOn={micOn}
      cameraOn={cameraOn}
      toggleMic={toggleMic}
      toggleCamera={toggleCamera}
    />
  );
}
export default VideoCall;
