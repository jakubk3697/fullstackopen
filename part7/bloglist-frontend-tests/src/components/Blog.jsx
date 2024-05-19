import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  const [updatedBlog, setUpdatedBlog] = useState(blog);

  const blogStyle = {
    marginTop: 24,
    marginBottom: 24,
    padding: 8,
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

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    await blogService.createComment(blog.id, comment);
    setUpdatedBlog((prevBlog) => {
      const newBlog = {
        ...prevBlog,
        comments: prevBlog.comments.concat(comment),
      };
      return newBlog;
    });
    event.target.comment.value = "";
  };

  return (
    <div className="blog" style={blogStyle}>
      <h2>{updatedBlog.title}</h2>
      <div>
        <a href={updatedBlog.url}>{updatedBlog.url}</a>
        <p>
          {updatedBlog.likes} likes{" "}
          <button onClick={handleLikeClick}>like</button>
        </p>
        <p>added by {updatedBlog.user?.username}</p>
        <button style={deleteBtnStyle} onClick={handleDeleteClick}>
          remove
        </button>

        <h3>comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {updatedBlog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
