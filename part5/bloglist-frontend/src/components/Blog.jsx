import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = () => {
    setUpdatedBlog((prevBlog) => {
      const newBlog = { ...prevBlog, likes: prevBlog.likes + 1 };
      updateBlog(newBlog);
      return newBlog;
    });
  };

  return (
    <>
      <div style={blogStyle}>
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
          </div>
        )}

        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
    </>
  );
};

export default Blog;
