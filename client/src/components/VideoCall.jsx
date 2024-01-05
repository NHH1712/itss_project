import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
const VideoCall = () => {
  const { user } = useAuth();
  const [peer, setPeer] = useState(null);
  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const newPeer = new Peer({ initiator: true, trickle: false, stream });
      newPeer.on('signal', (data) => {
        sendSignalToPeer2(data);
      });
      newPeer.on('data', (data) => {
        console.log('Received data:', data);
      });

      newPeer.on('error', (err) => {
        console.error('Peer connection error:', err);
      });
      setPeer(newPeer);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const sendSignalToPeer2 = (signalData) => {
    const socket = new WebSocket('ws://localhost:5174');
    socket.send(JSON.stringify(signalData));
  };
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header/>
      <div className="flex flex-row w-4/5 mx-auto gap-4 mt-4">
        <div className="person-1 w-1/2 h-[40%]">
          <div className="webcam1">
            <WebRTCComponent/>
          </div>
          <div className="info-person1 flex items-center justify-center my-2">
            <div className="mr-2">
              <img src={user?.avatar_url ? user.avatar_url : "/social-media.png"} alt="icon" width={36} height={36}></img>
            </div>
            <div>
              <span>{user.name}</span><br/>
              <span>Lớp: {user.classname} - {user.grade}</span>
            </div> 
          </div>
          <div className="next btn flex items-center justify-center">
            <button className="text-3xl text-red-500" 
              style={{backgroundColor: "#50B58D", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}
              onClick={handleStartCall}>
              <span>Start</span>
            </button>
          </div>
        </div>
        <div className="person-2 w-1/2 h-[40%]">
          <div className="webcam2">
            <WebRTCComponent/>
          </div>
          <div className="info-person2 flex items-center justify-center my-2">
            <div className="mr-2">
              <img src={user?.avatar_url ? user.avatar_url : "/social-media.png"} alt="icon" width={36} height={36}></img>
            </div>
            <div>
              <span>{user.name}</span><br/>
              <span>Lớp: {user.classname} - {user.grade}</span>
            </div> 
          </div>
          <div className="stop btn flex items-center justify-center">
            <button className="text-3xl text-red-500" 
              style={{backgroundColor: "#D57658", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <span>Stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};
export default VideoCall;

const WebRTCComponent = () => {
  const videoRef = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
          console.log('Signal data:', data);
        });
        peer.on('data', (data) => {
          console.log('Received data:', data);
        });
        peer.on('error', (err) => {
          console.error('Peer connection error:', err);
        });
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }, []);
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};
