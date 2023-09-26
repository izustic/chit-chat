import React, { useState, useEffect, useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home";
import './style.scss'
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext)

  console.log(currentUser)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login isSmallScreen={isSmallScreen} />} />
        <Route path="/register" element={<Register isSmallScreen={isSmallScreen} />} />
        <Route path="/home" element={<Home isSmallScreen={isSmallScreen} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
