import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 0,
    // user: { name: "Test User" },
  };

  render(<Blog blog={blog} />);

  // Check that title and author are in the document
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeInTheDocument();

  // Check that URL and likes are not in the document
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
});
