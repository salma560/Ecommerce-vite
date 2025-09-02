import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    function logout() {
    localStorage.removeItem("token");  
    setToken(null);                    
    }
   const [token,setToken]= useState(localStorage.getItem("token"))


  return <UserContext.Provider value={{token,setToken,logout}}>{children}</UserContext.Provider>;
}
