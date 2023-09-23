import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home";
import './style.scss'
function App() {
  return (
    <BrowserRouter >
    <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
