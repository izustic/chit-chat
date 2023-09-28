import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const SignOut = () => {
	return (
		<div className="signOut" onClick={() => signOut(auth)}>
			<div className="label">
				<p>Sign Out</p>
			</div>
			<div className="icon">
				<FontAwesomeIcon icon={faRightFromBracket} />
			</div>
		</div>
	);
};

export default SignOut;
