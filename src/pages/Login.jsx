import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";

const Login = () => {
	const navigate = useNavigate();
	const goToRegister = () => {
		navigate("/register");
	};
	return (
		<>
			<div className="formContainer">
				<div className="loginLeftWrap">
					<div className="logoSmallTxt">
						<img src={Logo} alt="logo" />
						<h1 className="logo">Chit Chat</h1>
					</div>
					<div className="auth-wrap">
						<h2 className="title">Login</h2>
						<button className="google-login">
							<FontAwesomeIcon icon={faGoogle} className="google" />
							<p>Sign in With Google</p>
						</button>
						<div className="or-separator">
							<hr className="horizontal-line" />
							<p>OR</p>
							<hr className="horizontal-line" />
						</div>

						<form>
							<input type="email" placeholder="Enter email" />
							<input type="password" placeholder="Enter password" />
							<button>Login</button>
						</form>
					</div>
					<p onClick={goToRegister}>Don't have an account? Register</p>
				</div>
				<div className="loginRightWrap">
					<div className="logoWrap">
						<div className="logoImg">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<div className="logoTxt">
							<h1 className="logo">Chit Chat</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="wave"></div>
		</>
	);
};

export default Login;
