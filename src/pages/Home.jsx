import React, { useState , useEffect} from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const Home = ({isSmallScreen}) => {
	const [selectedChat, setSelectedChat] = useState(null);
	const [showProfileWindow, setShowProfileWindow] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

	const handleChatSelect = (chat) => {
		setSelectedChat(chat);
	};

	if (!shouldRender) {
    return null;
  }

	return (
		<div className={`home ${isSmallScreen ? "small-screen" : ""}`}>
			{/* {console.log('RENDER HOME PAGE')} */}
			<div
				style={{
					position: "absolute",
					top: 0, 
					left: 0,
					width: "100vw",
					display: "inline",
				}}
				className="ornamentWave"
			>
				<svg
					preserveAspectRatio="none"
					viewBox="0 0 1200 300"
					xmlns="http://www.w3.org/2000/svg"
					style={{ fill: "#E24FA0", width: "100%", height: "100%" }}
				>
					<path
						d="M 0 250 C 200 300 100 150 150 100 C 200 50 250 100 300 0 L 50 0 L 50 0 L 0 0 L 0 150 L 0 250 "
						opacity=".8"
					/>
					<path
						d="M 0 300 C 100 300 50 200 150 100 C 250 50 300 150 400 0 L 50 0 L 50 0 L 0 0 "
						opacity=".5"
					/>
				</svg>
			</div>

			<div className="container">
				{!isSmallScreen ? (
					<>
						<SideBar
							isSmallScreen={isSmallScreen}
							selectedChat={selectedChat}
							onChatSelect={handleChatSelect}
						/>
						<Chat
							selectedChat={selectedChat}
							onChatClose={() => setSelectedChat(null)}
						/>
					</>
				) : (
					<>
         {!selectedChat && !showProfileWindow && ( 
              <SideBar
                isSmallScreen={isSmallScreen}
                selectedChat={selectedChat}
                onChatSelect={handleChatSelect}
                showProfileWindow={() => setShowProfileWindow(true)}
              />
            )}
						{selectedChat && (
							<Chat
								selectedChat={selectedChat}
								onChatClose={() => setSelectedChat(null)}
							/>
						)}
						{showProfileWindow && (
							<Chat
								selectedChat={selectedChat}
								onChatClose={() => setSelectedChat(null)}
								showProfileWindow={() => setShowProfileWindow(false)}
								isSmallScreen={isSmallScreen}
							/>
						)}
					</>
				)}
			</div>

			<div
				style={{
					position: "absolute",
					bottom: -10,
					left: 0,
					width: "100vw", 
					display: "inline",
					overflow: "hidden",
				}}
				className="ornamentWave"
			>
				<svg
					preserveAspectRatio="none"
					viewBox="0 0 1200 300"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					style={{
						fill: "#6b2667",
						transform: "scale(-1, 1)",
					}}
				>
					<path
						d="M 0 50 C 200 0 100 150 150 200 C 200 250 250 200 300 300 L 50 300 L 50 300 L 0 300 L 0 150 L 0 50 "
						opacity=".8"
					/>
					<path
						d="M 0 0 C 100 0 50 100 150 200 C 250 250 300 100 400 300 L 50 300 L 50 300 L 0 300 "
						opacity=".5"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Home;
