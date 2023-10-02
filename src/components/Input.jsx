import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Timestamp,
	arrayUnion,
	doc,
	increment,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";

const Input = () => {
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (file || image) {
			const storageRef = ref(storage, uuid());
			if (file) {
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
					},
					(error) => {
						console.error("Upload Error:", error);
					},
					() => {
						getDownloadURL(storageRef).then(async (downloadURL) => {
							await updateDoc(doc(db, "chats", data.chatId), {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									fileUrl: downloadURL,
								}),
							});
						});
					}
				);
			} else if (image) {
				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
					},
					(error) => {
						console.error("Upload Error:", error);
					},
					() => {
						getDownloadURL(storageRef).then(async (downloadURL) => {
							await updateDoc(doc(db, "chats", data.chatId), {
								messages: arrayUnion({
									id: uuid(),
									text,
									senderId: currentUser.uid,
									date: Timestamp.now(),
									img: downloadURL,
								}),
							});
						});
					}
				);
			}
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}
		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
			[data.chatId + ".unreadCount"]: increment(0),
		});
		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
			[data.chatId + ".unreadCount"]: increment(1),
		});
		setText("");
		setFile(null);
		setImage(null);
	};

	return (
		<div className="chatFooter">
			<input
				type="text"
				placeholder="Type something..."
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<input
				style={{ display: "none" }}
				type="file"
				id="file"
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<input
				type="file"
				id="image"
				style={{ display: "none" }}
				accept="image/*"
				onChange={(e) => setImage(e.target.files[0])}
			/>
			<div className="sendIcons">
				<label htmlFor="image">
					<FontAwesomeIcon icon={faImage} />
				</label>
				<label htmlFor="file">
					<FontAwesomeIcon icon={faPaperclip} />
				</label>
				<p className="sendBtn" onClick={handleSend}>
					Send
				</p>
			</div>
		</div>
	);
};

export default Input;
