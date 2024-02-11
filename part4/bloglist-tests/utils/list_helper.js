const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const dummy = () => {
  return 1;
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  return blogs.find(blog => blog.likes === maxLikes);
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author] ? acc[blog.author] + 1 : 1;
    return acc;
  }, {});

  const mostBlogsAuthor = Object.entries(counts).reduce((max, author) => {
    return author[1] > max.blogs ? { author: author[0], blogs: author[1] } : max;
  }, { author: "", blogs: 0 });

  return mostBlogsAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}