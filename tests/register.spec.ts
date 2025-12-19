// tests/register.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/register.page';

test.describe('Register Flow', () => {
    let homePage: HomePage;
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);
        
        await homePage.open(); // Thay cho Constant.WEBDRIVER.get()
        await homePage.goToRegisterPage();
    });

    test('Valid Register', async () => {
        // ... code kịch bản register
    });
});