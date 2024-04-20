const { test, expect, beforeEach, describe } = require("@playwright/test");

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

  describe("Login", () => {
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
  });
});
