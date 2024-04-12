const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(result);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const existingBlog = await Blog.findOne({ title: body.title });
  if (existingBlog) {
    return response.status(400).json({ error: "blog already exists" });
  }

  const blog = new Blog({
    ...body,
    user: user.id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "unauthorized user" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  console.log(body);

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
