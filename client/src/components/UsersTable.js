import { React } from "react";
import { UsersTableModel } from "./UsersTableModel";
import { useUsersContext } from "../contexts/UsersContext";
import { Header } from "./Header";

export const UsersTable = () => {
  const { usersList, setUsersList } = useUsersContext();
  return (
    <div>
      {usersList.length > 0 ? (
        <div>
          <Header title="Records" />
          <UsersTableModel users={usersList} />
        </div>
      ) : (
        <text>There are no users in the database</text>
      )}
    </div>
  );
};
