import { useState, useEffect, useContext } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userServices from "./services/users";
import Blogs from "./components/Blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import NotificationContext from "./NotificationContext";
import Users from "./pages/Users";
import User from "./pages/User";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState, useAuthDispatch } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

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

  const usersData = useQuery({
    queryKey: ["users"],
    queryFn: userServices.getAll,
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

  if (result.isLoading || usersData.isLoading) return <div>Loading...</div>;
  if (result.isError || usersData.isError)
    return <div>Error: {result.error.message}</div>;
  const blogs = result?.data;
  const users = usersData?.data;

  return (
    <Container>
      {!user && loginForm()}
      {user && (
        <>
          <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
              >
                <Nav className="mr-auto">
                  <Link className="nav-link" to="/">
                    blogs
                  </Link>
                  <Link className="nav-link" to="/users">
                    users
                  </Link>
                </Nav>
                <div>
                  <Navbar.Text>
                    Signed in as: <a href="#login">{user.username}</a>
                  </Navbar.Text>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      window.localStorage.removeItem("loggedBlogappUser");
                      dispatch({ type: "SET_USER", payload: null });
                    }}
                  >
                    logout
                  </Button>
                </div>
              </Navbar.Collapse>
            </Navbar>
            <nav></nav>
            <h2>Blogs</h2>
            {notification.message && (
              <p style={{ color: notification.color }}>
                {notification.message}
              </p>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Togglable buttonLabel="new blog">
                      <BlogForm createBlog={addBlog} />
                    </Togglable>

                    <Blogs
                      blogs={blogs}
                      updateBlog={updateBlog}
                      deleteBlog={deleteBlog}
                    />
                  </>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    blogs={blogs}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                  />
                }
              />
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<User users={users} />} />
            </Routes>
          </Router>
        </>
      )}
    </Container>
  );
};

export default App;
