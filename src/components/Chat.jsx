import React from "react";
import { faAngleLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";
import Messages from "./Messages";
import Profile from "./Profile"
import { profileData } from "./profileData";


const Chat = ({ selectedChat, onChatClose }) => {
  if (!selectedChat) {
    return (
      <div className="chat moveDown">
        <Profile user={profileData[0]}/>
      </div>
    );
  }

  return (
    <div className="chat moveDown">
      <div className="chatHead">
        <FontAwesomeIcon icon={faAngleLeft} onClick={onChatClose} />
        <h3>{selectedChat.username}</h3>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <Messages messages={selectedChat.messages} />
      <Input />
    </div>
  );
};

export default Chat;


