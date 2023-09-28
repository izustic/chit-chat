import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SignOut from "./SignOut";

const MenuBar = ({ user, onSelect, menuItems, isSmallScreen }) => {
	return (
		<div className="menu-bar">
			<div
				className="profileList"
				onClick={() => {
					onSelect();
				}}
			>
				<img src={user.profileImage} alt="user" />
				<div className="profileInfo">
					<p className="username">{user.username}</p>
					<p className="status">{user.status}</p>
				</div>
			</div>
			{!isSmallScreen && (
				<div className="menu-Info">
					{menuItems.map((item, index) => (
						<div key={index} className="menu-item" onClick={item.action}>
							<div className="label">
								<p>{item.label}</p>
							</div>
							<div className="icon">
								<FontAwesomeIcon icon={item.icon} />
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
