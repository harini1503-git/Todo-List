import React, { createContext, useState, useContext } from "react";

//Firstly i am creating Context
const AppContext = createContext();

//creating custom hook to use the context
export const useAppContext = () => useContext(AppContext);

//creating Context provider
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);

return(
    <AppContext.Provider value={{user, setUser}}>{children}</AppContext.Provider>
)}