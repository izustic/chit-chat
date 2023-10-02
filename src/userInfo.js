import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { db } from "./firebase";

const useUserData = () => {
	const [userData, setUserData] = useState(null);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userDocRef = doc(db, "users", currentUser.uid);
				const userDocSnapshot = await getDoc(userDocRef);
				if (userDocSnapshot.exists()) {
					const userData = userDocSnapshot.data();
					setUserData(userData);
				}
			} catch (error) {
				console.error("Error fetching user's data:", error);
			}
		};

		if (currentUser) {
			fetchUserData();
		}
	}, [currentUser]);

	return userData;
};

export default useUserData;
