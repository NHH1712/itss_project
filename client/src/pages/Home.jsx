import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-y-auto ">
      <Header />
      <div className="w-3/5 flex mt-4 mx-auto ">
        <div className="main-view-page w-2/3 mr-10">
          <div className="h-14 bg-white p-2 mb-4 flex">
            <img src="/social-media.png" alt="icon" className="mx-2"></img>
            <Link 
              className="w-full border border-gray-300 text-gray-400 flex items-center p-2"
              to='/create-post'
            >
              Create Post
            </Link>
          </div>
          <div className="filter bg-white py-2 sticky top-[72px] z-10">
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
          <div className="post-view bg-white mt-4 z-0">
            <div className="h-[60vh] p-4">

            <div className="header-post flex items-center h-[10%]">
              <div className="user-icon">
                <img src="/social-media.png" alt="icon" width={20} height={20}></img>
              </div>
              <div className="user-name font-medium text-base">
                <div>Nguyen Quang Truong</div>
              </div>
              <div className="time-post font-light text-xs">
                <div>Posted 1 hour ago</div>
              </div>
              <div className="post-tag flex">
                <img src="/social-media.png" alt="test post" width={20} height={20}></img>
                <img src="/social-media.png" alt="test post" width={20} height={20}></img>
                <img src="/social-media.png" alt="test post" width={20} height={20}></img>
              </div>
            </div>
            <div className="content-post h-[65%] flex">
              <div className="w-[10%] mr-6">
                updown
              </div>
              <div className="w-[85%]">
                <div className="post-title">
                  Title
                </div>
                <div className="description">
                  Description
                </div>
                <div className="image">
                  Image
                </div>
                <div className="comment">
                  Comment
                </div>
              </div>
            </div>
            <div className="comment-post h-[25%]">
              <div className="comment header flex">
                <div>Username</div>
                <div>time comment</div>
              </div>
              <div className="comment content">
                test Comment
              </div>
              <div className="vote">
                updown
              </div>
              <div className="text comment">
                enter comment
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="recent-post w-1/3 bg-white p-4 h-[40vh] sticky top-[72px]">
          <div>
            <p className="font-bold text-black">RECENT POST</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
