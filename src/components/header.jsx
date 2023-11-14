import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="bg-white h-14 flex items-center">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="px-1 py-1.5 ml-20">
          <Link to="" className="bg-[#eeeeee] rounded-lg px-1 py-1.5 text-[#0079D3] font-bold text-[15px]">HOME</Link>
          <Link to="" className="font-bold text-[15px]">VIDEO CALL</Link>
        </div>
        
      </div>
    </>
  );
};
export default Header;
