import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header />
      <div className="w-4/5 flex mt-4 mx-auto">
        <div className="main-view-page w-3/5 mr-10">
          <div className="filter bg-white py-2">
            <div className="flex ml-10">
              <div className="mr-2">
                <button className="bg-[#eeeeee] flex items-center justify-center">
                  <img src="/star.png" alt="Star" className="mr-2"></img>Best
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/fire.png" alt="Fire" className="mr-2"></img>Hot
                </button>
              </div>
              <div className="mr-2">
                <button className="flex items-center justify-center">
                  <img src="/thunder.png" alt="Thunder" className="mr-2"></img>
                  New
                </button>
              </div>
              <div>
                <button className="flex items-center justify-center">
                  <img src="/up.png" alt="Up" className="mr-2"></img>Top
                </button>
              </div>
            </div>
          </div>
          <div className="post-view bg-white mt-4 h-[80vh]">
            <div className="header-post flex items-center">
              <div className="user-icon">
                <img src="/social-media.png" alt="icon" width={20} height={20}></img>
              </div>
              <div className="user-name font-medium text-base">
                <div>Nguyen Quang Truong</div>
              </div>
              <div className="time-post font-light text-xs">
                <div>Posted 1 hour ago</div>
              </div>
              <div className="post-tag">
                
              </div>
            </div>
            <div className="content-post">tes2</div>
            <div className="comment-post">test3</div>
          </div>
        </div>
        <div className="recent-post w-1/5 bg-white p-4 h-[40vh]">
          <div>
            <p className="font-bold text-black">RECENT POST</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
