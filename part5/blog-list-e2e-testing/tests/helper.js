const loginWith = async (page, username, password) => {
  await page.getByTestId("username-input").fill(username);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("login-submit").click();
};

const createBlog = async (page, title, author, url) => {
  await page.locator(".newBlog").click();
  await page.getByTestId("title-input").fill(title);
  await page.getByTestId("author-input").fill(author);
  await page.getByTestId("url-input").fill(url);
  await page.getByTestId("create-blog-submit").click();
  // await page.getByText(`${title} ${author}`).waitFor();
};

export { loginWith, createBlog };
