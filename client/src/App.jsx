import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} exact/>
        <Route path="/signup" element={<Signup/>} exact/>
        <Route path="/" element={<Home/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
