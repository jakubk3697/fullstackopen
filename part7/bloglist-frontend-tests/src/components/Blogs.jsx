import { Link } from "react-router-dom";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  const blogStyle = {
    padding: 8,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {" "}
          <Link to={`/blogs/${blog.id}`}>
            <p style={blogStyle}>{blog.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blogs;
