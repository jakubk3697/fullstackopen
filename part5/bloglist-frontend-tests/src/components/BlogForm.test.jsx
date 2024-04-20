import { render, fireEvent, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("Check that the form calls the event handler it received as props with the right details when a new blog is created.", () => {
  const createBlog = vi.fn();

  const blogform = render(<BlogForm createBlog={createBlog} />);

  const title = "Test Title";
  const author = "Test Author";
  const url = "http://example.com";

  const titleInput = blogform.container.querySelector("#title");
  const authorInput = blogform.container.querySelector("#author");
  const urlInput = blogform.container.querySelector("#url");

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(authorInput, { target: { value: author } });
  fireEvent.change(urlInput, { target: { value: url } });

  const button = screen.getByText("Create new blog");
  fireEvent.click(button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({ title, author, url });
});
