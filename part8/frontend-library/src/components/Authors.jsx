import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";

/* eslint-disable react/prop-types */
const Authors = (props) => {
  const allAuthors = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show || allAuthors.loading) {
    return null;
  }

  const authors = allAuthors.data.allAuthors;

  const updateAuthor = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const setBornTo = parseInt(event.target[1].value);

    editAuthor({ variables: { name, setBornTo } });
  };

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={updateAuthor}>
          <select>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <input type="number" />
          <button type="submit">Update author</button>
        </form>
      </div>
    </>
  );
};

export default Authors;
