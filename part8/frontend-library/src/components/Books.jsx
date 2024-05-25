import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

/* eslint-disable react/prop-types */
const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show || loading) {
    return null;
  }

  const books = data.allBooks || [];

  const genres = books.reduce((acc, book) => {
    book.genres.forEach((g) => {
      if (!acc.includes(g)) {
        acc.push(g);
      }
    });
    return acc;
  }, []);

  const handleGenreClick = (g) => {
    setGenre(g);
    refetch({ genre: g });
  };

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

      <div className="genres-buttons">
        {genres.map((g) => (
          <button key={g} onClick={() => handleGenreClick(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => handleGenreClick(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
