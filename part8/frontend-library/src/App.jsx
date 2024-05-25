import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setPage("authors");
    }
  }, [token]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_AUTHORS });
    if (!includedIn(dataInStore.allAuthors, addedBook)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedBook) },
      });
    }
  };

  if (page === "login") {
    return (
      <>
        <button onClick={() => setPage("books")}>back</button>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={setErrorMessage} />
      </>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors setError={setErrorMessage} show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook
        setError={setErrorMessage}
        updateCacheWith={updateCacheWith}
        show={page === "add"}
      />
      <Recommended show={page === "recommend"} />
    </div>
  );
};

export default App;
