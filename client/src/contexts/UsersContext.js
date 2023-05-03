import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext({
  usersList: [],
  setShouldFetchUsers: () => {},
  formName: "",
  formAge: "",
  formGender: "",
  formOccupation: "",
  formInterests: "",
  setFormName: () => {},
  setFormAge: () => {},
  setFormGender: () => {},
  setFormOccupation: () => {},
  setFormInterests: () => {},
});

export const useUsersContext = () => useContext(UsersContext);

export const UsersContextProvider = ({ children }) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);
  const [usersList, setUsersList] = useState(false);

  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formOccupation, setFormOccupation] = useState("");
  const [formInterests, setFormInterests] = useState("");

  const fetchUsers = async () => {
    let res = await axios.get("http://localhost:8000/view", { timeout: 5000 });
    if (res.data !== null) {
      console.log("Users in database: " + JSON.stringify(res.data));
      setUsersList(res.data);
    } else {
      console.log("There's no user in database.");
    }
  };

  useEffect(() => {
    if (shouldFetchUsers) {
      try {
        console.log("Fetching users list from database ");
        fetchUsers();
        setShouldFetchUsers(false);
      } catch (err) {
        console.log("Error getting users list " + err);
      }
    }
  }, [shouldFetchUsers]);

  let values = {
    usersList,
    setShouldFetchUsers,
    formName,
    setFormName,
    formAge,
    setFormAge,
    formGender,
    setFormGender,
    formOccupation,
    setFormOccupation,
    formInterests,
    setFormInterests,
  };

  return <UsersContext.Provider value={values}>{children}</UsersContext.Provider>;
};
