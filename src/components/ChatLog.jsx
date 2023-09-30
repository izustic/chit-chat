import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { userChatData } from './userChatsData'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext'
import { formatChatTime } from "./TimeFormat";



const ChatLog = ({ userChats, onSelect }) => {
  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const getChats = () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const unsub = onSnapshot(docRef, (doc) => {
        try {
          if (doc.exists()) {
            setChats(doc.data());
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.error("Error updating chat data:", error);
        }
      });
  
      return () => {
        unsub();
      };
    };
  
    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);
  
  console.log("Chats:", Object.entries(chats));



  return (
    <div className="chatLogs">
      {Object.entries(chats)?.map((chat) => (
        
        <div
          className={`userChat ${chat.active ? "active" : ""}`}
          key={chat[0][0]}
          onClick={() => {
						setShowChat(!showChat);
						onSelect(chat)
					}}
        >
          <img src={chat[1].userInfo.photoURL} alt="user" />
          <div className="userChatInfo">
            <div className="userInfo">
              <p className="username">{chat[1].userInfo.displayName}</p>
              <p className="message">{chat[1].userInfo.lastMessage?.text}</p>
            </div>
            <div className="rightInfo">
              <p className="lastSeen">{formatChatTime(chat[1].date)}</p>
              {chat[1].unreadCount > 0 && (
                <div>
                  <p className="count">{chat[1].userInfo.unreadCount}</p>
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
