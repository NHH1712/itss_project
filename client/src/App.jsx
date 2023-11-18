import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} exact/>
        <Route path="/signup" element={<Signup/>} exact/>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/create-post" element={<CreatePost/>} exact/>
        <Route path="/update-post" element={<UpdatePost/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
