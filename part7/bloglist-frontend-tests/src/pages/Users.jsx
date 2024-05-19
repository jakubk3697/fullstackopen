import React from "react";
import { useQuery } from "@tanstack/react-query";
import userServices from "../services/users";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
