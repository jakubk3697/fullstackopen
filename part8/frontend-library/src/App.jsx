import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, BOOK_ADDED } from "./queries";
import Recommended from "./components/Recommended";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book multiple times

  const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);

  const dataInStore = cache.readQuery({ query });
  if (!includedIn(dataInStore.allBooks, addedBook)) {
    cache.writeQuery({
      query,
      data: { allBooks: dataInStore.allBooks.concat(addedBook) },
    });
  }
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);
      updateCache(client, ALL_AUTHORS, addedBook);
    },
  });

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
