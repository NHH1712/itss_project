import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import AuthProvider from "./contexts/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/create-post" element={<CreatePost />} exact />
          <Route path="/update-post/:postId" element={<UpdatePost />} exact />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
