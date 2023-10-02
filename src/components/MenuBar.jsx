import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useUserData from "../userInfo";
import SignOut from "./SignOut";

const MenuBar = ({ onSelect, menuItems, isSmallScreen }) => {
	const { currentUser } = useContext(AuthContext);
	const userData = useUserData();

	return (
		<div className="menu-bar">
			<div
				className="profileList"
				onClick={() => {
					onSelect();
				}}
			>
				<img src={currentUser.photoURL} alt="user" />
				<div className="profileInfo">
					<p className="username">{userData?.displayName}</p>
					<p className="status">{userData?.status}</p>
				</div>
			</div>
			{!isSmallScreen && (
				<div className="menu-Info">
					{menuItems.map((item, index) => (
						<div key={index} className="menu-item" onClick={item.action}>
							<div className="icon">
								<FontAwesomeIcon icon={item.icon} />
							</div>
							<div className="label">
								<p>{item.label}</p>
							</div>
						</div>
					))}
				</div>
			)}
			<SignOut />
		</div>
	);
};

export default MenuBar;
