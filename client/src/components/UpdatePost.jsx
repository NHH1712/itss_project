import { Link } from "react-router-dom";
const UpdatePost = () => {
  return (
    <div className="h-screen w-screen bg-[#e7e5e4]">
      <div className="bg-white h-14 flex items-center justify-between">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="flex mr-10">
          <img src="/social-media.png" alt="user" width={20} height={20}></img>
          <span>Nguyeen Quang Truong</span>
        </div>
      </div>
      <div className="create post w-3/5 h-4/5 mx-auto mt-10">
        <div className="text-3xl">
          Update Post
        </div>
        <div className="h-1 bg-white my-4"></div>
        <div className="h-10 bg-white w-1/2 p-4 mb-4 rounded-lg flex items-center">
          <select>
            <option>Choose tags</option>
            <option value="">test</option>
            <option value="">test1</option>
            <option value="">test2</option>
            <option value="">test3</option>
          </select>
        </div>
        <div className="bg-white h-4/5 p-4">
          <div className="mb-2">
            <span>Title</span><span className="text-red-600 ml-1">*</span>
            <input type="text" className="w-full border border-gray-300 text-gray-400 flex items-center p-2 rounded-lg"></input>
          </div>
          <div className="h-1/2 mb-2">
            <span>Description</span><span className="text-red-600 ml-1">*</span>
            <input type="text" className="w-full border border-gray-300 text-gray-400 flex items-center p-2 h-full rounded-lg"></input>
          </div>
          <div className="border border-[#DAE0E6] mt-10 mb-4 w-1/6 rounded-2xl">
            <button className="w-full"> + Image</button>
          </div>
          <div className="h-1 bg-[#d9d9d9] mb-4"></div>
          <div className="flex items-center text-center justify-end">
            <Link
              to="/"
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePost;
