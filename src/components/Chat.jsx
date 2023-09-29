import {
	faAngleLeft,
	faBellSlash,
	faEllipsis,
	faThumbtack,
	faUser,
	faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import Input from "./Input";
import MenuBar from "./MenuBar";
import Messages from "./Messages";
import Profile from "./Profile";
import { profileData } from "./profileData";
import { AuthContext } from "../context/AuthContext";
import  useUserData from "../userInfo";

const chatMenuItems = [
	{
		label: "About User",
		icon: faUser,
		action: () => {
      console.log("About User action");
    },
	},
	{
		label: "Pin User",
		icon: faThumbtack,
		action: () => {
      console.log("Pin User action");
    },
	},
	{
		label: "Mute User",
		icon: faBellSlash,
		action: () => {
      console.log("Mute User action");
    },
	},
	{
		label: "Block User",
		icon: faUserSlash,
		action: () => {
      console.log("Block User action");
    },
	},
];

const Chat = ({
	selectedChat,
	onChatClose,
	showProfileWindow,
	isSmallScreen,
}) => {
	const [isMenuBarVisible, setIsMenuBarVisible] = useState(false);
	useContext(AuthContext);
  const userData = useUserData();

	const toggleMenuBar = () => {
		setIsMenuBarVisible(!isMenuBarVisible);
	};
	if (!selectedChat || showProfileWindow) {
		return (
			<div className="chat moveDown">
							{console.log('RENDER PROFILE PAGE')}
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
			{console.log("RENDER SELECTED CHAT PAGE!")}
			<div className="chatHead">
				<FontAwesomeIcon icon={faAngleLeft} onClick={onChatClose} />
				<h3>{userData?.displayName}</h3>
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
