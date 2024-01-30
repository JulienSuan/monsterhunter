import React, { createContext, useEffect, useState } from 'react';
import axios from "axios"

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
    isConnected()
  }, []);

  const isConnected = async () => {
    const isConnected = await axios.get("http://localhost:3001/api/mhgu/v1/isConnected", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    console.log(isConnected.data)
    if (!isConnected.data.success) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }

  return (
    <UserContext.Provider value={{ user, isConnected: isConnected }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
