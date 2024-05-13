import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);

  const blogStyle = {
    padding: 8,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBtnStyle = {
    backgroundColor: "red",
    color: "white",
    borderRadius: 5,
    padding: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: 5,
  };

  const handleLikeClick = () => {
    setUpdatedBlog((prevBlog) => {
      const newBlog = { ...prevBlog, likes: prevBlog.likes + 1 };
      updateBlog(newBlog);
      return newBlog;
    });
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLikeClick}>like</button>
          </p>
          <p>{updatedBlog?.user?.name}</p>
          <button style={deleteBtnStyle} onClick={handleDeleteClick}>
            remove
          </button>
        </div>
      )}

      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
