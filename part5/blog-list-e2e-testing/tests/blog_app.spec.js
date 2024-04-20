const {
  test,
  expect,
  beforeEach,
  describe,
  getByRole,
} = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "admin",
        username: "admin",
        password: "admin",
      },
    });

    await page.goto("/");
    await await page.click('[data-testid="login-button"]');
  });

  test("Login form is shown", async ({ page }) => {
    const h1Text = await page.locator("h1").innerText();
    const username = await page.getByTestId("username-input");
    const password = await page.getByTestId("password-input");

    expect(h1Text).toBe("Login");
    expect(username).not.toBeNull();
    expect(password).not.toBeNull();
  });

  describe("when logged in", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("admin");
      await page.getByTestId("password-input").fill("admin");
      await page.getByTestId("login-submit").click();

      const blogs = await page.getByTestId("blogs").count();
      expect(blogs).toBe(0);
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("admin");
      await page.getByTestId("password-input").fill("wrong");
      await page.getByTestId("login-submit").click();

      await page.waitForSelector('[data-testid="error"]');
      const error = await page.getByTestId("error").innerText();

      expect(error).toBe("wrong username or password");
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId("username-input").fill("admin");
        await page.getByTestId("password-input").fill("admin");
        await page.getByTestId("login-submit").click();
      });

      test("a new blog can be created", async ({ page }) => {
        await page.locator(".newBlog").click();
        const title = "playwright test blog title";
        const author = "playwright test blog author";
        const url = "www.playwright.com";

        await page.getByTestId("title-input").fill(title);
        await page.getByTestId("author-input").fill(author);
        await page.getByTestId("url-input").fill(url);
        await page.getByTestId("create-blog-submit").click();

        await expect(page.getByText(`${title} ${author}`)).not.toBeNull();
      });

      test("a blog can be liked", async ({ page }) => {
        await page.locator(".newBlog").click();
        const title = "playwright test blog title";
        const author = "playwright test blog author";
        const url = "www.playwright.com";

        await page.getByTestId("title-input").fill(title);
        await page.getByTestId("author-input").fill(author);
        await page.getByTestId("url-input").fill(url);
        await page.getByTestId("create-blog-submit").click();

        await page.getByTestId("view-blog").click();
        await page.getByTestId("like-blog").click();

        await expect(page.getByTestId("likes")).toContainText("1");
      });
    });
  });
});
