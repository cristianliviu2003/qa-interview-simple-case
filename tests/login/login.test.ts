import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {

    // load main page
    await page.goto('localhost:8080/login')
    await expect(page).toHaveTitle("QA Interview case")

    // user credentials from test-setup\localStorage.setup.ts
    const existingUser = existingUsers[0]

    // input email
    await expect(page.locator("#email")).toBeVisible() 
    await page.locator("#email").pressSequentially(existingUser.email)
  
    // input password
    await expect(page.locator("#password")).toBeVisible()
    await page.locator("#password").pressSequentially(existingUser.password)

    // submit button
    const submitButton = page.locator("//button[text()='Login']");
    await expect(submitButton).toBeEnabled()
    await submitButton.click();

    // wait for element visibility
    await expect(page.getByText('Log out')).toBeVisible()  })
})