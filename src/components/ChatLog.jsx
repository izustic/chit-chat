import React, { useState } from "react";
import { userChatData } from './userChatsData'

const ChatLog = ({ userChats, onSelect }) => {
  const [showChat, setShowChat] = useState(false);


  return (
    <div className="chatLogs">
      {userChats.map((chat, index) => (
        <div
          className={`userChat ${chat.active ? "active" : ""}`}
          key={index}
          onClick={() => {
						setShowChat(!showChat);
						onSelect(chat)
					}}
        >
          <img src={chat.profileImage} alt="user" />
          <div className="userChatInfo">
            <div className="userInfo">
              <p className="username">{chat.username}</p>
              <p className="message">{chat.message}</p>
            </div>
            <div className="rightInfo">
              <p className="lastSeen">{chat.lastSeen}</p>
              {chat.unreadCount > 0 && (
                <div>
                  <p className="count">{chat.unreadCount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
