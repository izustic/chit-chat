import {
	faCircleExclamation,
	faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";
import { auth, db, storage } from "../firebase";

const Register = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const confirmPass = e.target[3].value;
		const file = e.target[4].files[0];

		if (password !== confirmPass) {
			setErr(true);
			return;
		}

		try {
			console.log("Before createUserWithEmailAndPassword");
			const res = await createUserWithEmailAndPassword(auth, email, password);
			console.log("After createUserWithEmailAndPassword", res);
			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const { bytesTransferred, totalBytes, state } = snapshot;
					console.log(`Upload Progress: ${bytesTransferred} / ${totalBytes}, State: ${state}`);
				},
				(error) => {
					console.error("Upload Error:", error);
					setErr(true); 
				},
				async () => {
					console.log("Upload completed successfully");
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						console.log("Download URL:", downloadURL);
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						console.log("Profile updated successfully");
						await setDoc(doc(db, "users", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});
						console.log("User data added to Firestore successfully");
					} catch (error) {
						console.error("Firebase or Firestore Error:", error);
						setErr(true); 
					}
				}
			);
			

		} catch (err) {
			console.error("Registration Error:", err);
			setErr(true);
		}
		console.log("After catch block");
	};
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
						<form onSubmit={handleSubmit}>
							<input type="text" placeholder="Enter username" />
							<input type="email" placeholder="Enter email" />
							<input type="password" placeholder="Enter password" />
							<input type="password" placeholder="Confirm password" />
							<input style={{ display: "none" }} type="file" id="file" />
							<label htmlFor="file">
								<FontAwesomeIcon icon={faUpload} />
								<span>Add an avatar</span>
							</label>
							<button>Sign up</button>
							{err && (
								<span
									style={{
										width: "100%",
										background: "transparent",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<div
										style={{
											display: "flex",
											width: "70%",
											background: "red",
											color: "#fff",
											gap: "10px",
											padding: "10px",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "10px"
										}}
									>
										<FontAwesomeIcon icon={faCircleExclamation} />
										<p>Something went wrong</p>
									</div>
								</span>
							)}
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
