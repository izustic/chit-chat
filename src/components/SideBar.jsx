import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatLog from "./ChatLog";
import MenuBar from "./MenuBar";
import Search from "./Search";

const SideBar = ({
	isSmallScreen,
	selectedChat,
	onChatSelect,
	showProfileWindow,
}) => {
	const [isSearching, setIsSearching] = useState(false);
	const [isMenuBarVisible, setIsMenuBarVisible] = useState(false);

	const profileMenuItems = [{}];

	const handleSearch = (searching, chats) => {
		setIsSearching(searching);
	};

	// Function to toggle the visibility of MenuBar
	const toggleMenuBar = () => {
		setIsMenuBarVisible(!isMenuBarVisible);
	};

	if (!isSmallScreen) {
		return (
			<div className={`side-bar moveUp`}>
				<h2>Chats</h2>
				<Search onSearch={handleSearch} />
				{!isSearching && <ChatLog onSelect={onChatSelect} />}
			</div>
		);
	}

	return (
		<div className={`side-bar moveUp ${!isSmallScreen ? "show" : ""}`}>
			<div className="sideHead">
				<h2>Chats</h2>
				<FontAwesomeIcon icon={faEllipsis} onClick={toggleMenuBar} />
			</div>
			{isMenuBarVisible && (
				<MenuBar
					onSelect={showProfileWindow}
					menuItems={profileMenuItems}
					isSmallScreen={isSmallScreen}
				/>
			)}
			{isMenuBarVisible && (
				<div className="menuBarOverlay" onClick={toggleMenuBar} />
			)}
			{isMenuBarVisible && <div className="menuBarSpacer" />}
			{isMenuBarVisible && <div className="menuBarBackdrop" />}

			<Search onSearch={handleSearch} />
			{!isSearching && !selectedChat && <ChatLog onSelect={onChatSelect} />}
		</div>
	);
};

export default SideBar;
