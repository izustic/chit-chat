import {
	faCircleExclamation,
	faUpload,
	faHourglassStart,
	faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";
import { auth, db, storage } from "../firebase";

const Register = () => {
	const [err, setErr] = useState(false);
	const [uploading, setUploading] = useState(false); 
	const [uploadSuccess, setUploadSuccess] = useState(false);
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
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const { bytesTransferred, totalBytes, state } = snapshot;
					console.log(
						`Upload Progress: ${bytesTransferred} / ${totalBytes}, State: ${state}`
					);
					if (state === "running") {
						setUploading(true);
					} else if (state === "success") {
						setUploading(false);
						setUploadSuccess(true);
					}
				},
				(error) => {
					console.error("Upload Error:", error);
					setErr(true);
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, "users", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
							status: "Available to Chat",
							lastSeen: serverTimestamp(),
						});
						await setDoc(doc(db, "userChats", res.user.uid), {});
						navigate("/");
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
	};
	return (
		<>
			{/* {console.log("RENDER REGISTER PAGE")} */}
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
							{uploading && (
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
											background: "#f5f5f5",
											color: "#000",
											gap: "10px",
											padding: "10px",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "10px",
										}}
									>
										<FontAwesomeIcon icon={faHourglassStart} />
										<p>Uploading image ...</p>
									</div>
								</span>
							)}
							{uploadSuccess && 	<span
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
											background: "#BAEDA9",
											color: "#000",
											gap: "10px",
											padding: "10px",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "10px",
										}}
									>
										<FontAwesomeIcon icon={faCircleCheck} />
										<p>Image Uploaded Successfully!</p>
									</div>
								</span>}
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
											borderRadius: "10px",
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
