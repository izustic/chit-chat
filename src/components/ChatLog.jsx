import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { formatChatTime } from "./ChatTimeFormat";

const ChatLog = ({ onSelect }) => {
	const [showChat, setShowChat] = useState(false);
	const [chats, setChats] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const docRef = doc(db, "userChats", currentUser.uid);
			const unsub = onSnapshot(docRef, (doc) => {
				try {
					if (doc.exists()) {
						setChats(doc.data());
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

	const handleSelect = async (user, chat) => {
		dispatch({ type: "CHANGE_USER", payload: user });

		const chatId = chat[0];
		const chatData = chat[1];

		if (chatData.unreadCount > 0) {
			await updateDoc(doc(db, "userChats", currentUser.uid), {
				[`${chatId}.unreadCount`]: 0,
			});
		}
	};

	return (
		<div className="chatLogs">
			{Object.entries(chats)
				?.sort((b, a) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						className={`userChat ${chat.active ? "active" : ""}`}
						key={chat[0]}
						onClick={() => {
							setShowChat(!showChat);
							onSelect(chat);
							handleSelect(chat[1].userInfo, chat);
						}}
					>
						<img src={chat[1].userInfo.photoURL} alt="user" />
						<div className="userChatInfo">
							<div className="userInfo">
								<p className="username">{chat[1].userInfo.displayName}</p>
								<p className="message">
									{chat[1].lastMessage?.text.length > 15
										? `${chat[1].lastMessage?.text.slice(0, 15)}...`
										: chat[1].lastMessage?.text}
								</p>
							</div>
							<div className="rightInfo">
								<p className="lastSeen">{formatChatTime(chat[1].date)}</p>
								{chat[1].unreadCount > 0 && (
									<p className="count">{chat[1].unreadCount}</p>
								)}
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default ChatLog;
