import { useState, useEffect } from "react";
import { UserDataContext } from "./UserContext";
import  axios  from 'axios';
export default function UserProvider({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/current`,
        { withCredentials: true }
      );

      setUserData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCurrentUser();
}, []);

  return (

      <UserDataContext.Provider value={{ serverUrl, userData }}>
        {children}
      </UserDataContext.Provider>

  );
}
