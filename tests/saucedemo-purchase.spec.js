const { test, expect } = require('@playwright/test');

/**
 * Q1 - Native Diagnostics & Tracing
 * End-to-end SauceDemo shopping flow: login -> add to cart -> checkout
 * -> complete purchase. Wrapped in test.step() blocks so the HTML/Allure
 * reports show a clean, descriptive step-by-step breakdown.
 */
test.describe('SauceDemo - Complete Purchase Flow', () => {
  test('user can log in, add a product to the cart and complete checkout', async ({ page }) => {

    await test.step('Login with standard_user', async () => {
      await page.goto('/');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await page.locator('#login-button').click();
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step('Add "Sauce Labs Backpack" to the cart', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    await test.step('Open the cart and proceed to checkout', async () => {
      await page.locator('.shopping_cart_link').click();
      await expect(page).toHaveURL(/cart.html/);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await page.locator('[data-test="checkout"]').click();
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    await test.step('Fill in checkout information', async () => {
      await page.locator('[data-test="firstName"]').fill('Harikrishnan');
      await page.locator('[data-test="lastName"]').fill('J');
      await page.locator('[data-test="postalCode"]').fill('688001');
      await page.locator('[data-test="continue"]').click();
      await expect(page).toHaveURL(/checkout-step-two.html/);
    });

    await test.step('Finish the order and verify confirmation', async () => {
      await page.locator('[data-test="finish"]').click();
      await expect(page).toHaveURL(/checkout-complete.html/);
      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
  });
});
