import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { test } from "vitest";

const blog = {
  title: "Test Blog",
  author: "Test Author",
  url: "http://example.com",
  likes: 0,
};

test("Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.", () => {
  render(<Blog blog={blog} />);

  // Check that title and author are in the document
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeInTheDocument();

  // Check that URL and likes are not in the document
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
});

test("Check that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.", async () => {
  const mockHandler = vi.fn();

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const button = screen.getByText("view", { exact: false });
  await userEvent.click(button);

  expect(screen.getByText(blog.url)).toBeInTheDocument();
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
});
