import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";

const Register = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="formContainer">
				<div className="registerLeftWrap">
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
				<div className="registerRightWrap">
					<div className="logoSmallTxt">
						<img src={Logo} alt="logo" />
						<h1 className="logo">Chit Chat</h1>
					</div>
					<div className="auth-wrap">
						<h2 className="title">Register</h2>
						<form>
							<input type="email" placeholder="Enter email" />
							<input type="password" placeholder="Enter password" />
							<input type="password" placeholder="Confirm password" />
							<input style={{ display: "none" }} type="file" id="file" />
							<label htmlFor="file">
								<FontAwesomeIcon icon={faUpload} />
								<span>Add an avatar</span>
							</label>
							<button>Sign up</button>
						</form>
					</div>
					<p onClick={() => navigate("/")}>Already have an account? Login</p>
				</div>
			</div>
			<div className="wave"></div>
		</>
	);
};

export default Register;
