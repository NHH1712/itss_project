import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { message } from 'antd';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authInfo = useAuth();
  const { login } = authInfo ? authInfo : { login: (values) => Boolean };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/login/?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          login(data);
        } else {
          message.error('Login failed');
        }
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      message.error('Error:', error);
    }
  }
  const [user, setUser] = useState([]);
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/`)
        if (response.ok) {
          const data = await response.json();
          setDataUsers(data);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  },[]);
  const usernameUsers = dataUsers.map((user) => user.username);
  const signupWithGoogle = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          username: data.email,
          password: data.email,
          avatar_url: data.picture,
          cover_image_url: data.picture,
          google_id: data.google_id,
        })
      });
      if (response.ok) {
        console.log(data);
      } else {
        message.error("Signup failed");
      }
    } catch (error) {
      message.error("Error:", error);
    }
  }
  useEffect(() => {
    if (user && user.access_token) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
        .then((res) => {
          const userInfo = {
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
            google_id: res.data.id,
          };
          if(usernameUsers.includes(res.data.email)){
            login(userInfo)
            return;
          }
          signupWithGoogle(userInfo)
          setTimeout(() => {
            login(userInfo)
          }, 2000)
        })
        .catch((err) => console.log(err));
    }
  },[user]);
  return (
    <form onSubmit={handleSubmit}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-4/5 mx-auto h-12 mb-8">
            <p>Password</p>
            <div className="border rounded-lg py-2 flex">
              <input
                type="password"
                placeholder="Enter your Password"
                className="ml-2 flex-grow outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          <div>
            {/* {profile ? (
              <div>
                <img src={profile.picture} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br />
                <button onClick={logoutGoogle}>Log out</button>
              </div>
            ) : (
              <button 
                className="border border-gray-500 px-4 py-2.5 w-1/4 mx-auto flex items-center justify-center"
                style={{ color: 'black', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => loginGoogle()}>
                  <img src="./google.png" width={24} height={24}></img>
                  <p className="pl-1">Sign in with Google </p>
                </button>
            )} */}
            <button
              className="border border-gray-500 px-4 py-2.5 w-1/4 mx-auto flex items-center justify-center"
              style={{ color: 'black', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => loginGoogle()}>
              <img src="./google.png" width={24} height={24}></img>
              <p className="pl-1">Sign in with Google </p>
            </button>
          </div>
        </div>

      </div>
    </form>
  );
};
export default Login;
