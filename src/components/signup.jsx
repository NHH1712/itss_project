import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="h-screen w-screen bg-[#e7e5e4] flex justify-center items-center">
      <div className="bg-white w-3/5 h-fit rounded">
        <div className="font-bold text-3xl text-center my-4">Signup</div>
        <div className="w-4/5 mx-auto mb-2">
          <div>Name <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter your Name"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>
        
        <div className="w-4/5 mx-auto mb-2">
          <div>Grade <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter Grade"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>
        
        <div className="w-4/5 mx-auto mb-2">
          <div>Class <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter Class"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>

        <div className="w-4/5 mx-auto mb-2">
          <div>Username <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter your Username"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>

        <div className="w-4/5 mx-auto mb-2">
          <div>Password <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter Your Password"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>

        <div className="w-4/5 mx-auto mb-2">
          <div>Confirm Password <span className="text-red-600">*</span></div>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter Your Confirm Password"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button className="w-4/5 mx-auto bg-[#0e64d2] rounded-lg flex items-center justify-center text-white font-bold mb-2">
            Signup
          </button>
        </div>
        <div className="w-3/5 mx-auto flex items-center justify-center pb-2">
          <p>Already have an account?</p>
          <button className="ml-2  font-bold">
            <Link to="/login">Login Here</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
