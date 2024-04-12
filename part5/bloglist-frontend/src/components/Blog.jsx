import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
              likes {blog.likes} <button>like</button>
            </p>
            <p>{blog?.user?.name}</p>
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
