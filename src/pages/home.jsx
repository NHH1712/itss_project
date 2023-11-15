import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header />
      <div>
        <div className="filter bg-white w-3/5 overflow-y-auto mx-auto mt-4">
          <div className="flex">
            <div className="">
              <button>
                <img src="/star.png" alt="Star"></img>
                Best
              </button>
            </div>
            <div>
              <button>
                <img src="/fire.png" alt="Fire"></img>Hot
              </button>
            </div>
            <div>
              <button>
                <img src="/thunder.png" alt="Thunder"></img>New
              </button>
            </div>
            <div>
              <button>
                <img src="/up.png" alt="Up"></img>Top
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
