import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.setTimeout(60000);

test.describe('Home Page Functionality', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open(); 
    });

    test('Trang chủ hiển thị đúng tiêu đề chào mừng', async () => {
        await expect(homePage.welcomeHeader).toBeVisible();
        await expect(homePage.welcomeHeader).toHaveText('Welcome to Safe Railway');
    });

    test('Link "create an account" chuyển hướng đến trang đăng ký', async ({ page }) => {
        await homePage.clickCreateAccountLink();

        await expect(page).toHaveURL(/.*Account\/Register/);

        const registerHeader = page.locator('h1[align="center"]');
        await expect(registerHeader).toHaveText('Create account');
    });
});

