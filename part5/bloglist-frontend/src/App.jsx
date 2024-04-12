import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    color: "green",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        color: "green",
      });
    } catch (exception) {
      console.log(exception);
      setNotification({ message: "error adding blog", color: "red" });
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
          {notification.message && (
            <p style={{ color: notification.color }}>{notification.message}</p>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {!user && loginForm()}
      {user && (
        <>
          <h2>Blogs</h2>
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

          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default App;
