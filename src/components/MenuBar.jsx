import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const MenuBar = ({ user, onSelect }) => {
	// const [showChat, setShowChat] = useState(false);

	console.log("USER!:", user);
	return (
		<div className="menu-bar">
			<div
				className="profileList"
        onClick={() => {
          onSelect()
        }}
			>
				<img src={user.profileImage} alt="user" />
				<div className="profileInfo">
					<p className="username">{user.username}</p>
					<p className="status">{user.status}</p>
				</div>
			</div>
			<div className="signOut">
				<p>Sign Out</p>
				<FontAwesomeIcon icon={faRightFromBracket} />
			</div>
		</div>
	);
};

export default MenuBar;
