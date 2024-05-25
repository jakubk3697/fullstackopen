import { useQuery } from "@apollo/client";
// import { useState } from "react";
import { ALL_BOOKS, ME } from "../queries";

/* eslint-disable react/prop-types */
const Recommended = ({ show }) => {
  const { loading: userLoading, data: userData } = useQuery(ME);
  const favoriteGenre = userData?.me?.favoriteGenre;

  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  });

  if (!show) {
    return null;
  }

  if (userLoading || booksLoading) {
    return <div>loading...</div>;
  }

  const books = booksData.allBooks || [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
