import React from "react";

const Message = () => {
	return (
		<>
		<div className="chats owner">
			<div className="messageAvatar">
				<img
					src="https://source.unsplash.com/random/300×300/?profile"
					alt=""
				/>
			</div>
			<div className="messageInfo">
        <div className="messageContent">
          <p className="chatMessage">Hi. How are you doing</p>
          <p className="chatMessage">Have you heard of this incredible animal. I saw it at the safari!</p>
					<img src="https://source.unsplash.com/random/300×300/?animals" alt="" className="chatMedia"/>
        </div>
        <p className="lastSeen">10 mins ago</p>
      </div>
		</div>
		<div className="chats">
			<div className="messageAvatar">
				<img
					src="https://source.unsplash.com/random/300×300/?profile"
					alt=""
				/>
			</div>
			<div className="messageInfo">
        <div className="messageContent">
          <p className="chatMessage">Wow!</p>
          <p className="chatMessage">I wouldn't see such animal where I am in the city.</p>
					<img src="https://source.unsplash.com/random/300×300/?cities" alt="" className="chatMedia"/>
        </div>
        <p className="lastSeen">10 mins ago</p>
      </div>
		</div>
		</>
	);
};

export default Message;
