import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatLog from "./ChatLog";
import MenuBar from "./MenuBar"; // Import the MenuBar component
import Search from "./Search";
import { profileData } from "./profileData";
import { userChatData } from "./userChatsData";

const SideBar = ({ isSmallScreen, selectedChat, onChatSelect, showProfileWindow }) => {
	const [isSearching, setIsSearching] = useState(false);
	const [filteredChats, setFilteredChats] = useState([]);
	const [isMenuBarVisible, setIsMenuBarVisible] = useState(false);


	const profileMenuItems = [
		{
		},
	];
	



	const handleSearch = (searching, chats) => {
		setIsSearching(searching);
		setFilteredChats(chats);
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
				{!isSearching && (
					<ChatLog userChats={userChatData} onSelect={onChatSelect} />
				)}
			</div>
		);
	}

	return (
		<div className={`side-bar moveUp ${!isSmallScreen ? "show" : ""}`}>
			<div className="sideHead">
				<h2>Chats</h2>
				<FontAwesomeIcon icon={faEllipsis} onClick={toggleMenuBar} />
			</div>
			{isMenuBarVisible && <MenuBar user={profileData[0]} onSelect={showProfileWindow} menuItems={profileMenuItems} isSmallScreen={isSmallScreen}/>}
			{isMenuBarVisible && (
				<div className="menuBarOverlay" onClick={toggleMenuBar} />
			)}
			{isMenuBarVisible && <div className="menuBarSpacer" />}
			{isMenuBarVisible && <div className="menuBarBackdrop" />}
			<Search onSearch={handleSearch} />

			{!isSearching && !selectedChat && (
				<ChatLog userChats={userChatData} onSelect={onChatSelect} />
			)}
		</div>
	);
};

export default SideBar;
