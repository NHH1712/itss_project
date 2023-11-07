import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact></Route>
        <Route path="/logout/*"></Route>
        <Route path="/" element={<Home/>} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
