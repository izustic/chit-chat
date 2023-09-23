import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatLog from "./ChatLog";
import Search from "./Search";
import { userChatData } from "./userChatsData";

const SideBar = ({ isSmallScreen, selectedChat, onChatSelect }) => {
	const [isSearching, setIsSearching] = useState(false);
	const [filteredChats, setFilteredChats] = useState([]);

	const handleSearch = (searching, chats) => {
		setIsSearching(searching);
		setFilteredChats(chats);
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
				<FontAwesomeIcon icon={faEllipsis} />
			</div>
			<Search onSearch={handleSearch} />
			{!isSearching && !selectedChat && (
				<ChatLog userChats={userChatData} onSelect={onChatSelect} />
			)}
		</div>
	);
};

export default SideBar;
