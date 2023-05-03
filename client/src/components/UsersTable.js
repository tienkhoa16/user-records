import React from "react";
import "./users-table.css";

export const UsersTable = ({ users }) => {
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
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, age, gender, occupation, interests }) => (
          <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{occupation}</td>
            <td>{interests}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
