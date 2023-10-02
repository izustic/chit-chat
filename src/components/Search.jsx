import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Search = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);
	const [err, setErr] = useState(false);

	const handleSearchChange = async (e) => {
		const queryText = e.target.value;
		setSearchQuery(queryText);
		setIsLoading(true);

		if (queryText.trim().length === 0) {
			setFilteredUsers([]);
			onSearch(false, []);
			setIsLoading(false);
		} else {
			try {
				const usersCollection = collection(db, "users");
				const q = query(usersCollection, where("displayName", ">=", queryText));
				const querySnapshot = await getDocs(q);
				if (querySnapshot.empty) {
				} else {
					const matchingUsers = querySnapshot.docs.map((doc) => doc.data());
					setFilteredUsers(matchingUsers);
					onSearch(true, matchingUsers);
				}
			} catch (error) {
				console.error("Error searching Firestore:", error.message);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleSelect = async (user) => {
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;

		dispatch({ type: "CHANGE_USER", payload: user });

		try {
			const chatDocRef = doc(db, "chats", combinedId);
			const chatDocSnapshot = await getDoc(chatDocRef);

			if (!chatDocSnapshot.exists()) {
				// Create a chat room in Firebase and add both members to it
				await setDoc(chatDocRef, { messages: [] });

				// Update user chats for currentUser
				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId]: {
						date: serverTimestamp(),
						userInfo: {
							uid: user.uid,
							displayName: user.displayName,
							photoURL: user.photoURL,
						},
						unreadCount: 0,
					},
				});

				// Update user chats for the other user
				await updateDoc(doc(db, "userChats", user.uid), {
					[combinedId]: {
						date: serverTimestamp(),
						userInfo: {
							uid: currentUser.uid,
							displayName: currentUser.displayName,
							photoURL: currentUser.photoURL,
						},
						unreadCount: 0,
					},
				});
			}
		} catch (error) {
			console.error("Error handling chat selection:", error);
		}
		setSearchQuery("");
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

			<div className="chatLogs search-block">
				{err && <span>User not found!</span>}
				{searchQuery && isLoading ? (
					<div>Searching...</div>
				) : searchQuery && filteredUsers.length > 0 ? (
					filteredUsers.map((user, index) => (
						<div
							className="userChat"
							key={index}
							onClick={() => handleSelect(user)}
						>
							<img src={user.photoURL} alt="user" />
							<div className="userChatInfo">
								<div className="userInfo">
									<p className="username">{user.displayName}</p>
								</div>
								<div className="rightInfo">
									<p className="lastSeen">{user.status}</p>
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
