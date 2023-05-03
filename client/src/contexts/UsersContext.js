import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext);

export const UsersContextProvider = ({ children }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    try {
      console.log("Fetching users list from database ");

      const fetchUsers = async () => {
        let res = await axios.get("http://localhost:8000/view", { timeout: 5000 });
        if (res.data !== null) {
          console.log("Users in database: " + JSON.stringify(res.data));
          setUsersList(res.data);
        } else {
          console.log("There's no user in database.");
        }
      };
      fetchUsers();
    } catch (err) {
      console.log("Error getting users list " + err);
    }
  }, []);

  return (
    <UsersContext.Provider value={{ usersList, setUsersList }}>{children}</UsersContext.Provider>
  );
};
