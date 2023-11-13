import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
