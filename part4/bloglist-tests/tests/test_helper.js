const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First title",
    author: "John Doe",
    url: "www.google.com",
    likes: 6,
  },
  {
    title: "Second title",
    author: "Jane Doe",
    url: "www.facebook.com",
    likes: 10,
  },
  {
    title: "Third title",
    author: "Fred Lincoln",
    url: "www.example.com",
    likes: 12,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "John Doe",
    url: "www.google.com",
    likes: 6,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
