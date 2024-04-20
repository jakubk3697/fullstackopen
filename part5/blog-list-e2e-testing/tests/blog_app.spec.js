const {
  test,
  expect,
  beforeEach,
  describe,
  getByRole,
} = require("@playwright/test");

const { loginWith, createBlog } = require("./helper");

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
      await loginWith(page, "admin", "admin");

      const blogs = await page.getByTestId("blogs").count();
      expect(blogs).toBe(0);
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "admin", "wrongpassword");

      await page.waitForSelector('[data-testid="error"]');
      const error = await page.getByTestId("error").innerText();

      expect(error).toBe("wrong username or password");
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "admin", "admin");
      });

      test("a new blog can be created", async ({ page }) => {
        const title = "playwright test blog title";
        const author = "playwright test blog author";
        const url = "www.playwright.com";

        await createBlog(page, title, author, url);
        await expect(page.getByText(`${title} ${author}`)).not.toBeNull();
      });

      test("a blog can be liked", async ({ page }) => {
        const title = "playwright test blog title";
        const author = "playwright test blog author";
        const url = "www.playwright.com";

        await createBlog(page, title, author, url);

        await page.getByTestId("view-blog").click();
        await page.getByTestId("like-blog").click();

        await expect(page.getByTestId("likes")).toContainText("1");
      });

      test("a blog can be deleted", async ({ page }) => {
        const title = "playwright test blog title";
        const author = "playwright test blog author";
        const url = "www.playwright.com";

        await createBlog(page, title, author, url);
        await page.getByTestId("create-blog-submit").click();

        await page.getByTestId("view-blog").click();
        await page.getByTestId("delete-blog").click();
        await page.on("dialog", async (dialog) => {
          await dialog.accept();
          await page.waitForSelector('[data-testid="blogs"]');
          const blogs = await page.getByTestId("blogs").count();
          expect(blogs).toBe(0);
        });
      });
    });
  });
});
