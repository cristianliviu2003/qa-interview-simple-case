import { test, expect } from "@playwright/test"

// Note: Login after sign up should have been a separate test
// but if I load a new instance of login page
// I cannot login with details used during sign up
// so I had to use same test for doing both signup and login

test.describe.configure({ mode: "serial" })

// random 3 digits number
const randomFunction = Math.random().toString().substr(2, 3)

// email and password
const email = randomFunction + "@email.com"
const password = "ThisIsMyPassword"

test("Login works for a user that has just been signed up", async ({
  page,
}) => {
  await page.goto("localhost:8080/signup")

  //  first and last name
  await page.locator("#firstName").pressSequentially("TestFirstName")
  await page.locator("#lastName").pressSequentially("TestLastName")

  // random email
  await page.locator("#email").pressSequentially(email)

  // password
  await page.locator("#password").pressSequentially(password)
  await expect(page.getByText("Submit")).toBeVisible()

  // submit button
  const submitButton = page.getByText("Submit")
  await expect(submitButton).toBeEnabled()
  await submitButton.click()

  // logout button
  await expect(page.locator("//h1[text()='Company']")).toBeVisible()
  await page.getByText("Log out").click()

  // login with same credentials as signed up earlier
  await page.locator("#email").pressSequentially(email)
  await page.locator("#password").pressSequentially(password)

  // login button
  const loginButton = page.locator("//button[text()='Login']")
  await expect(loginButton).toBeEnabled()
  await loginButton.click()

  // asserting elements visibility after login
  await expect(page.locator("//h1[text()='Company']")).toBeVisible()
  await expect(page.locator("div#root  div")).toBeVisible()

  await expect(page.locator("//h1[text()='Company']/following-sibling::div")).toContainText(
    "Welcome TestFirstName TestLastName"
  )

  // logout button
  const logoutButton = page.getByText("Log out")
  await expect(logoutButton).toBeVisible()
  await logoutButton.click()
})