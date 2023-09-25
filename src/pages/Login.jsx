import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";
import { auth, db, provider } from "../firebase";

const Login = ({ isSmallScreen }) => {
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			console.log("Starting Google Sign-In");

			if (isSmallScreen) {
				console.log("Redirecting to Google Sign-In");
				const res = await signInWithRedirect(auth, provider);
				console.log("Redirect successful:", res);
				const displayName = res.user.displayName;
				const photoURL = res.user.photoURL;
				const email = res.user.email;

				const userDocRef = doc(db, "users", res.user.uid);
				const userDocSnapshot = await getDoc(userDocRef);

				if (!userDocSnapshot.exists()) {
					await setDoc(userDocRef, {
						uid: res.user.uid,
						displayName,
						email,
						photoURL,
					});
					console.log("User data added to Firestore successfully");
				}
			} else {
				console.log("Opening Google Sign-In popup");
				const res = await signInWithPopup(auth, provider);
				console.log("Popup sign-in successful:", res);
				const displayName = res.user.displayName;
				const photoURL = res.user.photoURL;
				const email = res.user.email;

				const userDocRef = doc(db, "users", res.user.uid);
				const userDocSnapshot = await getDoc(userDocRef);

				if (!userDocSnapshot.exists()) {
					await setDoc(userDocRef, {
						uid: res.user.uid,
						displayName,
						email,
						photoURL,
					});
					console.log("User data added to Firestore successfully");
				}
			}
		} catch (error) {
			console.error("Google Sign-In Error:", error);
		}
	};

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
						<button className="google-login" onClick={handleGoogleSignIn}>
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
