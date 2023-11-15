import { Link } from "react-router-dom";
import SearchBar from "./layouts/SearchBar";
const Header = () => {
  return (
    <>
      <div className="bg-white h-14 flex items-center">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="w-1/6 px-1 py-1.5 mx-20 flex items-center text-center">
          <Link to="" className="w-1/2 bg-[#eeeeee] rounded-lg px-1 py-1.5 text-[#0079D3] font-bold text-[15px] mr-2">HOME</Link>
          <Link to="" className="w-1/2 font-bold text-[15px]">VIDEO CALL</Link>
        </div>
        <SearchBar/>
      </div>
    </>
  );
};
export default Header;
