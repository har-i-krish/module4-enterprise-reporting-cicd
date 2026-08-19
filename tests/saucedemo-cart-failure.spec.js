const { test, expect } = require('@playwright/test');

 // Q1 - Native Diagnostics & Tracing (Intentional Failure)
test.describe('SauceDemo - Intentional Cart Failure (Diagnostics Evidence)', () => {
  test('INTENTIONAL FAILURE: cart badge is wrongly asserted as 2 after adding 1 item', async ({ page }) => {

    await test.step('Login with standard_user', async () => {
      await page.goto('/');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await page.locator('#login-button').click();
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step('Add "Sauce Labs Bike Light" to the cart', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    });

    await test.step('INTENTIONALLY WRONG assertion - expects badge count "2" instead of "1"', async () => {
      // This line is intentionally incorrect to force a failure.
      await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });
  });
});
