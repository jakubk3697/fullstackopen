import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import NotificationContext from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState, useAuthDispatch } from "./AuthContext";

const App = () => {
  const { username, password, user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [loginVisible, setLoginVisible] = useState(false);

  const { notification, dispatchNotification } =
    useContext(NotificationContext);

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatchNotification({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification.message, dispatchNotification]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_USERNAME", payload: "" });
      dispatch({ type: "SET_PASSWORD", payload: "" });
    } catch (exception) {
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: "wrong username or password",
        color: "red",
      });
      console.log("wrong credentials");
    }
  };

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.setQueryData(["blogs"], (oldData) => [...oldData, blog]);
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: `a new blog ${blog.title} by ${blog.author} added`,
        color: "green",
      });
    },
    onError: (error) => {
      console.log(error);
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: "error adding blog",
        color: "red",
      });
    },
  });

  const addBlog = async (blogObject) => {
    addBlogMutation.mutate(blogObject);
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      queryClient.setQueryData(["blogs"], (oldData) =>
        oldData.map((b) => (b.id !== blog.id ? b : blog)),
      );
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: `blog ${blog.title} updated`,
        color: "green",
      });
    },
    onError: (error) => {
      console.log(error);
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: "error updating blog",
        color: "red",
      });
    },
  });

  const updateBlog = async (blogObject) => {
    updateBlogMutation.mutate(blogObject);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["blogs"], (oldData) =>
        oldData.filter((b) => b.id !== variables),
      );
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: `blog deleted`,
        color: "green",
      });
    },
    onError: (error) => {
      console.log(error);
      dispatchNotification({
        type: "SET_NOTIFICATION",
        message: "error deleting blog",
        color: "red",
      });
    },
  });

  const deleteBlog = async (blog) => {
    deleteBlogMutation.mutate(blog.id);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    if (result.isLoading) {
      return <div>Loading...</div>;
    }

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
            handleUsernameChange={({ target }) => {
              dispatch({ type: "SET_USERNAME", payload: target.value });
            }}
            handlePasswordChange={({ target }) => {
              dispatch({ type: "SET_PASSWORD", payload: target.value });
            }}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
          {notification.message && (
            <p style={{ color: notification.color }}>{notification.message}</p>
          )}
        </div>
      </>
    );
  };

  if (result.isLoading) return <div>Loading...</div>;
  if (result.isError) return <div>Error: {result.error.message}</div>;
  const blogs = result?.data;

  return (
    <>
      {!user && loginForm()}
      {user && (
        <>
          <h2>Blogs</h2>
          {notification.message && (
            <p style={{ color: notification.color }}>{notification.message}</p>
          )}
          <p>{user.username} logged in</p>
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              dispatch({ type: "SET_USER", payload: null });
            }}
          >
            logout
          </button>

          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      )}
    </>
  );
};

export default App;
