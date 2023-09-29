import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        const q = query(usersCollection, where("displayName", "==", queryText));
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot", querySnapshot)
        if (querySnapshot.empty) {
          console.log("No matching documents found.");
        } else {
          const matchingUsers = querySnapshot.docs.map((doc) => doc.data());
          console.log("Matching Users:", matchingUsers);
          setFilteredUsers(matchingUsers);
          onSearch(true, matchingUsers);
        }
      } catch (error) {
        console.error("Error searching Firestore:", error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

    // Add debug log
    console.log("Render Search Component:", searchQuery, isLoading, filteredUsers);

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
      <div className="chatLogs">
        {searchQuery && isLoading ? (
          <div>Searching...</div>
        ) : searchQuery && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div className="userChat" key={index}>
              <img src={user.photoURL} alt="user" />
{/* //               <div className="userChatInfo">
//                 <div className="userInfo">
//                   <p className="username">{chat.username}</p>
//                 </div>
//                 <div className="rightInfo">
//                   <p className="lastSeen">{chat.lastSeen}</p>
//                 </div>
//               </div> */}
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




















// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import React, { useState } from "react";
// import { db } from "../firebase";

// const Search = ({ onSearch }) => {
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [filteredChats, setFilteredChats] = useState([]);
// 	const [err, setErr] = useState(false);

//   const handleSearchChange = async (e) => {
//     const queryText = e.target.value;
//     setSearchQuery(queryText);
  
//     if (queryText.trim().length === 0) {
//       setFilteredChats([]);
//       onSearch(false, []);
//       return;
//     }
  
//     const usersRef = collection(db, "users");
//     const q = query(usersRef, where("displayName", ">=", queryText));
  
//     try {
//       const querySnapshot = await getDocs(q);
//       const users = [];
  
//       querySnapshot.forEach((doc) => {
//         const userData = doc.data();
//         users.push(userData);
//       });
  
//       console.log("Query Text:", queryText);
//       console.log("Users:", users);
  
//       setFilteredChats(users);
//       onSearch(true, users);
//     } catch (error) {
//       console.error("Error searching for users:", error);
//       setErr(true);
//     }
//   };

// 	return (
// 		<div className="search">
// 			<div className="searchForm">
// 				<input
// 					type="text"
// 					placeholder="Search"
// 					value={searchQuery}
// 					onChange={handleSearchChange}
// 				/>
// 				<FontAwesomeIcon icon={faSearch} className="search-icon" />
// 			</div>
// 			{err && <span>User not found</span>}

// 			<div className="chatLogs">
// 				{searchQuery && filteredChats.length > 0 ? (
// 					filteredChats.map((user, index) => (
// 						<div className="userChat" key={index}>
// 							<img src={user.profileURL} alt="user" />
// 							<div className="userChatInfo">
// 								<div className="userInfo">
// 									<p className="username">{user.displayName}</p>
// 								</div>
// 								{/* <div className="rightInfo">
//                   <p className="lastSeen">{user.lastSeen}</p>
//                 </div> */}
// 							</div>
// 						</div>
// 					))
// 				) : (
// 					<div></div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Search;








// OLD ONE

// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { userChatData } from "./userChatsData";
// import { collection, query, where } from "firebase/firestore";
// import { db } from "../firebase"

// const Search = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredChats, setFilteredChats] = useState([]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filteredChats = userChatData.filter((chat) =>
//       chat.username.toLowerCase().includes(query.toLowerCase())
//     );

//     setFilteredChats(filteredChats);
//     onSearch(query.trim().length > 0, filteredChats);
//   };

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <FontAwesomeIcon icon={faSearch} className="search-icon" />
//       </div>
//       <div className="chatLogs">
//         {searchQuery && filteredChats.length > 0 ? (
//           filteredChats.map((chat, index) => (
//             <div className="userChat" key={index}>
//               <img src={chat.profileImage} alt="user" />
//               <div className="userChatInfo">
//                 <div className="userInfo">
//                   <p className="username">{chat.username}</p>
//                 </div>
//                 <div className="rightInfo">
//                   <p className="lastSeen">{chat.lastSeen}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;
