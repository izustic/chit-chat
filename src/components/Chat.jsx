import { faAngleLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import useUserData from "../userInfo";
import { chatMenuItems } from "./ChatMenuItems";
import Input from "./Input";
import MenuBar from "./MenuBar";
import Messages from "./Messages";
import Profile from "./Profile";

const Chat = ({
	selectedChat,
	onChatClose,
	showProfileWindow,
	isSmallScreen,
}) => {
	const [isMenuBarVisible, setIsMenuBarVisible] = useState(false);
	const { data } = useContext(ChatContext);
	useContext(AuthContext);
	const userData = useUserData();

	const toggleMenuBar = () => {
		setIsMenuBarVisible(!isMenuBarVisible);
	};
	if (!selectedChat || showProfileWindow) {
		return (
			<div className="chat moveDown">
				<Profile
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
				<h3>{data.user?.displayName}</h3>
				<FontAwesomeIcon icon={faEllipsis} onClick={toggleMenuBar} />
			</div>
			{isMenuBarVisible && (
				<MenuBar
					onSelect={() => showProfileWindow}
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
