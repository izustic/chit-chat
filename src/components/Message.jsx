import React, {useContext, useRef, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { formatMessageTime } from "./MessageTimeFormat";

const Message = ({message}) => {
	const {currentUser} = useContext(AuthContext)
	const {data} = useContext(ChatContext)
	const ref = useRef()

	useEffect(()=> {
		ref.current?.scrollIntoView({ behavior:"smooth" });
	}, [message])
	
	if (!message) {
    return null;
  }

	return (
		<>
		<div className={`chats ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
			<div className="messageAvatar">
				<img
					src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
					alt=""
				/>
			</div>
			<div className="messageInfo">
        <div className="messageContent">
          <p className="chatMessage">{message.text}</p>
					{message.img && <img src={message.img} alt="" className="chatMedia"/>}
        </div>
        <p className="lastSeen">
					{formatMessageTime(message.date)}
					</p>
      </div>
		</div>
		</>
	);
};

export default Message;
