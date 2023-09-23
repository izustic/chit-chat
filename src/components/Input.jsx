import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Input = () => {
	return (
		<div className="chatFooter">
			<input type="text" placeholder="Type something..." />
			<input style={{ display: "none" }} type="file" id="file" />
			<input
				type="file"
				id="image"
				style={{ display: "none" }}
				accept="image/*"
			/>
			<div className="sendIcons">
				<label htmlFor="image">
					<FontAwesomeIcon icon={faImage} />
				</label>
				<label htmlFor="file">
					<FontAwesomeIcon icon={faPaperclip} />
				</label>
				<p className="sendBtn">Send</p>
			</div>
		</div>
	);
};

export default Input;
