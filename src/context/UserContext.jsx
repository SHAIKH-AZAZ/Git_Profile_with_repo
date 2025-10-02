// src/context/UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
