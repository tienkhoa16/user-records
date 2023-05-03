import React from "react";
import "./users-table-model.css";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { useUsersContext } from "../contexts/UsersContext";

export const UsersTableModel = ({ users }) => {
  const { setShouldFetchUsers } = useUsersContext();

  const handleDelete = async (userId) => {
    console.log("Send delete request of user id " + userId);
    try {
      let res = await axios.delete(
        "http://localhost:8000/delete",
        { data: { id: userId } },
        { timeout: 5000 }
      );
      if (res.status === 200) {
        setShouldFetchUsers(true);
        alert("Deleted user ID " + userId);
      } else {
        alert("Error deleting from server");
      }
    } catch (err) {
      console.log("Error submitting the form " + err);
    }
  };

  const handleModify = async (id, name, age, gender, occupation, interests) => {

  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col">Occupation</th>
          <th scope="col">Interests</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, age, gender, occupation, interests }) => (
          <tr key={id}>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{occupation}</td>
            <td>{interests}</td>
            <td className="action-button">
              <IconButton
                onClick={() => handleModify(id, name, age, gender, occupation, interests)}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(id)}>
                <CloseIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
