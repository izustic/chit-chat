import {
	faAngleLeft,
	faBellSlash,
	faEllipsis,
	faThumbtack,
	faUser,
	faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Input from "./Input";
import MenuBar from "./MenuBar";
import Messages from "./Messages";
import Profile from "./Profile";
import { profileData } from "./profileData";

const chatMenuItems = [
	{
		label: "About User",
		icon: faUser,
		action: "",
	},
	{
		label: "Pin User",
		icon: faThumbtack,
		action: "",
	},
	{
		label: "Mute User",
		icon: faBellSlash,
		action: "",
	},
	{
		label: "Block User",
		icon: faUserSlash,
		action: "",
	},
];

const Chat = ({
	selectedChat,
	onChatClose,
	showProfileWindow,
	isSmallScreen,
}) => {
	const [isMenuBarVisible, setIsMenuBarVisible] = useState(false);

	// Function to toggle the visibility of MenuBar
	const toggleMenuBar = () => {
		setIsMenuBarVisible(!isMenuBarVisible);
	};
	if (!selectedChat || showProfileWindow) {
		return (
			<div className="chat moveDown">
				<Profile
					user={profileData[0]}
					setShowProfileWindow={showProfileWindow}
					isSmallScreen={isSmallScreen}
				/>
			</div>
		);
	}

	return (
		<div className="chat moveDown">
			<div className="chatHead">
				<FontAwesomeIcon icon={faAngleLeft} onClick={onChatClose} />
				<h3>{selectedChat.username}</h3>
				<FontAwesomeIcon icon={faEllipsis} onClick={toggleMenuBar} />
			</div>
			{isMenuBarVisible && (
				<MenuBar
					user={profileData[0]}
					onSelect={showProfileWindow}
					menuItems={chatMenuItems}
				/>
			)}
			{isMenuBarVisible && (
				<div className="menuBarOverlay" onClick={toggleMenuBar} />
			)}
			{isMenuBarVisible && <div className="menuBarSpacer" />}
			{isMenuBarVisible && <div className="menuBarBackdrop" />}
			<Messages messages={selectedChat.messages} />
			<Input />
		</div>
	);
};

export default Chat;
