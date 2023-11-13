import {Link} from "react-router-dom"
const Login = () => {
  return (
    <div className="h-screen w-screen bg-[#e7e5e4] flex justify-center items-center">
      <div className="bg-white w-3/5 h-4/5 rounded">
        <div className="font-bold text-3xl text-center mt-16 mb-8">LOGIN</div>
        <div className="w-4/5 mx-auto h-12 mb-8">
          <p>Username</p>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter your Username"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>
        <div className="w-4/5 mx-auto h-12 mb-8">
          <p>Password</p>
          <div className="border rounded-lg py-2 flex">
            <input
              type="text"
              placeholder="Enter your Password"
              className="ml-2 flex-grow outline-none"
            />
          </div>
        </div>
        <div className="pt-4">
          <button className="w-4/5 mx-auto bg-[#0e64d2] rounded-lg h-12 flex items-center justify-center text-white font-bold mb-4">Login</button>
        </div>
        <div className="w-3/5 mx-auto flex items-center justify-center pb-2">
            <p>Don’t have an account?</p>
            <button className="ml-2 font-bold">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
      </div>
    </div>
  );
};
export default Login;
