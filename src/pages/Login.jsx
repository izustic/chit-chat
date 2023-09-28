import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/chit-chat-pink.png";
import { auth, db, provider } from "../firebase";

const Login = ({ isSmallScreen }) => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", res);
      const userDocRef = doc(db, "users", res.user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        console.log("User document exists in Firestore");
        navigate("/home");
      } else {
        setErr(true);
        console.log("User document doesn't exist in Firestore");
      }
    } catch (err) {
      setErr(true);
      console.error("Login Error:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google Sign-In");
      const currentUser = auth.currentUser;
      if (currentUser) {
        console.log("User is already signed in");
        navigate("/home");
        return;
      }

      if (isSmallScreen) {
        console.log("Redirecting to Google Sign-In");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("Opening Google Sign-In popup");
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Google Sign-In Initial Error:", error);
    }
  };

  const handleFirebaseAuthChange = useCallback(async (user) => {
    try {
      if (user) {
        console.log("User is now signed in");
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          const displayName = user.displayName;
          const photoURL = user.photoURL;
          const email = user.email;

          await setDoc(userDocRef, {
            uid: user.uid,
            displayName,
            email,
            photoURL,
          });
          console.log("User data added to Firestore successfully");

          await setDoc(doc(db, "userChats", user.uid), {});
        }
        navigate("/home");
      }
    } catch (error) {
      console.error("Firebase Auth Change Error:", error);
    }
  }, [navigate]);

  const handleGoogleSignInAndFirebaseAuth = async () => {
    await handleGoogleSignIn();
  };

  const goToRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const handleRedirectSignIn = async () => {
      try {
        console.log("Checking for redirect sign-in");
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Redirect sign-in successful");
          navigate("/home");
          await handleFirebaseAuthChange(result.user);
        }
      } catch (error) {
        console.error("Error handling redirect sign-in:", error);
      }
    };

    if (isSmallScreen) {
      handleRedirectSignIn();
    } else {
      console.log("Listening for Firebase Auth state changes");
      const unsubscribe = onAuthStateChanged(auth, handleFirebaseAuthChange);
      return () => unsubscribe(); 
    }
  }, [isSmallScreen, navigate, handleFirebaseAuthChange]);


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
            <button className="google-login" onClick={handleGoogleSignInAndFirebaseAuth}>
              <FontAwesomeIcon icon={faGoogle} className="google" />
              <p>Sign in With Google</p>
            </button>
            <div className="or-separator">
              <hr className="horizontal-line" />
              <p>OR</p>
              <hr className="horizontal-line" />
            </div>

            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Enter email" />
              <input type="password" placeholder="Enter password" />
              <button>Login</button>
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
