import { React } from "react";
import { UsersTableModel } from "./UsersTableModel";
import { Header } from "./Header";
import { useUsersContext } from "../common/contexts/UsersContext";

export const UsersTable = () => {
  const { usersList } = useUsersContext();
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
