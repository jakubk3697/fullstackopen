import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [notification, setNotification] = useState({
    message: null,
    color: "green",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: null, color: "green" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ message: "wrong username or password", color: "red" });
      console.log("wrong credentials");
    }
  };
  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        color: "green",
      });
    } catch (exception) {
      setNotification({ message: "error adding blog", color: "red" });
    }
  };

  const loginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        {notification.message && (
          <p style={{ color: notification.color }}>{notification.message}</p>
        )}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        {notification.message && (
          <p style={{ color: notification.color }}>{notification.message}</p>
        )}
        <p>{user.name} logged in</p>
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            setUser(null);
          }}
        >
          logout
        </button>

        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />{" "}
            <br />
            author:
            <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />{" "}
            <br />
            url:
            <input
              type="text"
              value={newBlog.url}
              name="Url"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </div>
          <button type="submit">create</button>
        </form>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return <>{user === null ? loginForm() : blogForm()}</>;
};

export default App;
