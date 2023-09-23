import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { userChatData } from "./userChatsData"; 

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter userChatData based on the username
    const filteredChats = userChatData.filter((chat) =>
      chat.username.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredChats(filteredChats);

    // Call the onSearch function to notify the parent component
    onSearch(query.trim().length > 0, filteredChats);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="chatLogs">
        {searchQuery && filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <div className="userChat" key={index}>
              <img src={chat.profileImage} alt="user" />
              <div className="userChatInfo">
                <div className="userInfo">
                  <p className="username">{chat.username}</p>
                </div>
                <div className="rightInfo">
                  <p className="lastSeen">{chat.lastSeen}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Search;






// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";

// const Search = () => {
// 	return (
// 		<div className="search">
// 			<div className="searchForm">
// 				<input type="text" placeholder="Search" />
// 				<FontAwesomeIcon icon={faSearch} className="search-icon" />
// 			</div>
// 			<div className="chatLogs">
// 				<div className="userChat">
// 					<img
// 						src="https://source.unsplash.com/random/300×300/?profile"
// 						alt="user"
// 					/>
// 					<div className="userChatInfo">
// 						<div className="userInfo">
// 							<p className="username">John Jane</p>
// 						</div>
// 						<div className="rightInfo">
// 							<p className="lastSeen">10 mins ago</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Search;
