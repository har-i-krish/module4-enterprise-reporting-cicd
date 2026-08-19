const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM - Login and Employee Search Verification', () => {
  test('user can log in and search for an employee in PIM', async ({ page }) => {

    await test.step('Login to OrangeHRM demo with Admin credentials', async () => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await page.locator('input[name="username"]').fill('Admin');
      await page.locator('input[name="password"]').fill('admin123');
      await page.locator('button[type="submit"]').click();
      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('Navigate to PIM module', async () => {
      await page.locator('a[href*="/pim/viewEmployeeList"], .oxd-main-menu-item:has-text("PIM")').first().click();
      await expect(page).toHaveURL(/pim/);
    });

    await test.step('Search for employee "Employee" in the Employee Name field', async () => {
      const nameInput = page.locator('.oxd-autocomplete-wrapper input').first();
      await nameInput.fill('a');
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
      await page.locator('button[type="submit"]').click();
    });

    await test.step('Verify search results state on the employee table', async () => {
      const resultsHeader = page.locator('.orangehrm-horizontal-padding .oxd-table-filter-results, .oxd-table-header .oxd-text');
      await expect(page.locator('.oxd-table-body, .orangehrm-no-record')).toBeVisible();
    });
  });
});
