import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Profile = ({ user }) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = (event) => {
		event.preventDefault();
		setIsEditing(!isEditing);
	};

	console.log("user data:", user);
	console.log("isEditing:", isEditing);

	return (
		<div className="profile">
			<svg
				id="wave"
				style={{ transform: "rotate(180deg)", transition: "0.3s" }}
				viewBox="0 0 1440 490"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
						<stop stop-color="rgba(137, 76, 139, 1)" offset="0%"></stop>
						<stop stop-color="rgba(232, 80, 159, 1)" offset="100%"></stop>
					</linearGradient>
				</defs>
				<path
					style={{ transform: "translate(0, 0px)", opacity: 1 }}
					fill="url(#sw-gradient-0)"
					d="M0,294L40,253.2C80,212,160,131,240,147C320,163,400,278,480,285.8C560,294,640,196,720,171.5C800,147,880,196,960,179.7C1040,163,1120,82,1200,49C1280,16,1360,33,1440,98C1520,163,1600,278,1680,277.7C1760,278,1840,163,1920,106.2C2000,49,2080,49,2160,49C2240,49,2320,49,2400,40.8C2480,33,2560,16,2640,32.7C2720,49,2800,98,2880,98C2960,98,3040,49,3120,81.7C3200,114,3280,229,3360,285.8C3440,343,3520,343,3600,351.2C3680,359,3760,376,3840,343C3920,310,4000,229,4080,204.2C4160,180,4240,212,4320,228.7C4400,245,4480,245,4560,236.8C4640,229,4720,212,4800,212.3C4880,212,4960,229,5040,212.3C5120,196,5200,147,5280,138.8C5360,131,5440,163,5520,212.3C5600,261,5680,327,5720,359.3L5760,392L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"
				></path>
				<defs>
					<linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
						<stop stop-color="rgba(137, 76, 139, 1)" offset="0%"></stop>
						<stop stop-color="rgba(232, 80, 159, 1)" offset="100%"></stop>
					</linearGradient>
				</defs>
				<path
					style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
					fill="url(#sw-gradient-1)"
					d="M0,147L40,155.2C80,163,160,180,240,220.5C320,261,400,327,480,294C560,261,640,131,720,130.7C800,131,880,261,960,294C1040,327,1120,261,1200,253.2C1280,245,1360,294,1440,302.2C1520,310,1600,278,1680,236.8C1760,196,1840,147,1920,122.5C2000,98,2080,98,2160,130.7C2240,163,2320,229,2400,285.8C2480,343,2560,392,2640,392C2720,392,2800,343,2880,318.5C2960,294,3040,294,3120,269.5C3200,245,3280,196,3360,204.2C3440,212,3520,278,3600,318.5C3680,359,3760,376,3840,359.3C3920,343,4000,294,4080,245C4160,196,4240,147,4320,138.8C4400,131,4480,163,4560,220.5C4640,278,4720,359,4800,343C4880,327,4960,212,5040,147C5120,82,5200,65,5280,122.5C5360,180,5440,310,5520,351.2C5600,392,5680,343,5720,318.5L5760,294L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"
				></path>
			</svg>
			<h2 className="profileTitle">Profile</h2>
			<input
				type="file"
				id="image"
				style={{ display: "none" }}
				accept="image/*"
			/>
			<div className="profileImg">
				<img src={user.profileImage} alt="profile_image" />
				<label htmlFor="image">
					{isEditing && <FontAwesomeIcon icon={faCamera} className="camera" />}
				</label>
			</div>
			<div className="profileInfo">
				<form>
					<div className="field-group">
						<label htmlFor="username">Username</label>
						{isEditing ? (
							<input type="text" id="username" defaultValue={user.username} />
						) : (
							<p>{user.username}</p>
						)}
					</div>

					<div className="field-group">
						<label htmlFor="status">Status</label>
						{isEditing ? (
							<input type="text" id="status" defaultValue={user.status} />
						) : (
							<p>{user.status}</p>
						)}
					</div>

					<div className="field-group">
						<label htmlFor="email">Email</label>
						{isEditing ? (
							<input type="email" id="email" defaultValue={user.email} />
						) : (
							<p>{user.email}</p>
						)}
					</div>

					{isEditing ? (
						<button className="profileBtn save" type="submit">
							Save changes
						</button>
					) : (
						<button className="profileBtn edit" onClick={toggleEdit}>
							Edit profile
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default Profile;
