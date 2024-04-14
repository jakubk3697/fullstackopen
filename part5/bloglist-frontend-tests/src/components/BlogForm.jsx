import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <>
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
          />
          <br />
          author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
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
        <button type="submit">Create new blog</button>
      </form>
    </>
  );
};

export default BlogForm;
