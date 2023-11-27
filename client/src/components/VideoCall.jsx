import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
const VideoCall = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header/>
      <div className="flex flex-row w-4/5 mx-auto bg-white gap-4 mt-4">
        <div className="person-1 w-1/2">
          <div className="webcam1">

          </div>
          <div className="info-person1">
            <img src="/social-media.png" alt="icon" width={30} height={30}></img>
            <span>{user.name}</span><br/>
            <span>Lớp: {user.classname} - {user.grade}</span>
          </div>
          <div className="next btn">

          </div>
        </div>
        <div className="person-2 w-1/2">
          <div className="webcam2">

          </div>
          <div className="info-person2">

          </div>
          <div className="stop btn">

          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoCall;
