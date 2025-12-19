// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { User } from '../models/User';

test.describe('Chức năng Đăng nhập', () => {
    let loginPage: LoginPage;
    const validUser: User = { email: 'baonhitest@gmail.com', password: '123456789' };

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        // Tương đương Constant.RAILWAY_URL
        await page.goto('http://railwayb2.somee.com/'); 
        await loginPage.goToLoginPage();
    });

    test('Đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
        await loginPage.login(validUser);
        
        const greeting = await loginPage.getGreetingText();
        expect(greeting).toBe(`Welcome ${validUser.email}`);
    });

    test('Đăng nhập thất bại khi để trống các trường', async () => {
        const emptyUser: User = { email: '', password: '' };
        await loginPage.login(emptyUser);
        
        await expect(loginPage.errorLabel).toHaveText(
            "There was a problem with your login and/or errors exist in your form."
        );
    });
});