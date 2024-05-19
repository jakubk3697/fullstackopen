import React from "react";
import { useQuery } from "@tanstack/react-query";
import userServices from "../services/users";
import { useParams } from "react-router-dom";

const Users = ({ users }) => {
  const { id } = useParams();

  const user = users.find((user) => user.id === id);

  if (!user) return null;

  return (
    <>
      <h1>User: {user.username}</h1>

      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
