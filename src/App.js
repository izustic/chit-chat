import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";

function App() {
	const { currentUser } = useContext(AuthContext);
	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/" />;
		}
    return children;
	};

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
				<Route
					path="/register"
					element={<Register isSmallScreen={isSmallScreen} />}
				/>
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home isSmallScreen={isSmallScreen} />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
