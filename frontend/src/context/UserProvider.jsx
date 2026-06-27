import { userDataContext } from "./userContext";
export default function UserProvider({ children }) {
  const serverUrl = "http://localhost:8000";

  return (
    <div>
      <userDataContext.Provider value={{ serverUrl }}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}
