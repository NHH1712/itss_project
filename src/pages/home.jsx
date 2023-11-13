import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="grid grid-cols-2 h-full">
        <div className="flex items-center justify-between mx-auto">
          <img src='/social-media.png'></img>
        </div>
        <div className="">
          <div className="h-1/3 flex items-center justify-center">
            <div className="text-6xl font-bold ">HedSocial</div>
          </div>
          <div className="h-1/3">
            <div className="text-lg flex items-center justify-center mx-auto">
              HedSocial helps you connect and share with the people in your life.<br/>
            </div>
            <div className="flex">
              <Link to='/login' className="border-gray-200 border xl:py-3 xl:px-12 px-8 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all">Login</Link>
              <Link to='signup' className="border-gray-200 border xl:py-3 xl:px-12 px-8 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   
export default Home;