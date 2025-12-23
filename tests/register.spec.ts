import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { UserSignUp } from '../models/User';
import { CONSTANTS } from '../constants/constant';

test.setTimeout(120000);

test.describe('Register Functionality', () => {
    test('User can register an account with valid info', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const validUser: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`,
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: '12345678'
        };
        await registerPage.register(validUser);

        await expect(registerPage.successMessage).toBeVisible({ timeout: 15000 });
        await expect(registerPage.successMessage).toHaveText("You're here");
    });

    test('Error message displays when user registers with existed email', async ({ page }) => {
        const registerPage = new RegisterPage(page);
 
        const timestamp = Date.now();
        const existedEmail = `exist${timestamp}@gmail.com`;
        const user: UserSignUp = {
            email: existedEmail,
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: '12345678'
        };
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();
        await registerPage.register(user);
        await expect(registerPage.successMessage).toHaveText("You're here");

        // Lần 2
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();
        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText("This email address is already in use.");
    });

    // Email < 6 chars
    test('Error message when email is too short (5 chars)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const shortUser: UserSignUp = {
            email: 'abc@g',
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: '12345678'
        };

        await registerPage.register(shortUser);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.emailLengthErrorMsg).toHaveText("Invalid email length");
    });

    // Email > 32 chars
    test('Error message when email is too long (33 chars)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const longEmail = 'a'.repeat(24) + '@gmail.com'; 
        const longUser: UserSignUp = {
            email: longEmail,
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: '12345678'
        };

        await registerPage.register(longUser);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.emailLengthErrorMsg).toHaveText("Invalid email length");
    });

    // Password < 8
    test('Error message when password is too short (7 chars)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const shortPass = '1234567';
        const user: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`,
            password: shortPass,
            confirmPassword: shortPass,
            passport: '12345678'
        };

        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.passwordLengthErrorMsg).toHaveText("Invalid password length");
    });

    // Password > 64
    test('REG-007.2: Error message when password is too long (65 chars)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const longPass = 'a'.repeat(65);
        const user: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`,
            password: longPass,
            confirmPassword: longPass,
            passport: '12345678'
        };

        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.passwordLengthErrorMsg).toHaveText("Invalid password length");
    });

    // Password Mismatch
    test('Error message displays when password mismatch', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const user: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`,
            password: 'Password123',
            confirmPassword: 'Password999',
            passport: '12345678'
        };

        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.passwordMismatchErrorMsg).toHaveText("The two passwords do not match");
    });

    // Invalid PID
    test('Hiển thị lỗi khi PID/Passport quá ngắn (< 8 ký tự)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const shortPid = '12345';
        const user: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`,
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: shortPid
        };

        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.pidLengthErrorMsg).toHaveText("Invalid ID length");
    });

    // Invalid PID 
    test('Hiển thị lỗi khi PID/Passport quá dài (> 20 ký tự)', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const longPid = '1'.repeat(33);
        const user: UserSignUp = {
            email: `valid${Date.now()}@gmail.com`, 
            password: 'Password123',
            confirmPassword: 'Password123',
            passport: longPid
        };

        await registerPage.register(user);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.pidLengthErrorMsg).toHaveText("Invalid ID length");
    });

    // 10. Empty fields
    test('Error message displays when leaving all fields empty', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        const emptyUser: UserSignUp = {
            email: '',
            password: '',
            confirmPassword: '',
            passport: ''
        };

        await registerPage.register(emptyUser);

        await expect(registerPage.mainErrorLabel).toHaveText(
            "There're errors in the form. Please correct the errors and try again."
        );
        await expect(registerPage.emailErrorLabel).toBeVisible();
        await expect(registerPage.passwordErrorLabel).toBeVisible();
        await expect(registerPage.pidErrorLabel).toBeVisible();
    });

    // Hide password
    test('Password is hidden while typing', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await registerPage.goToRegisterPage();

        await registerPage.passwordTextBox.fill('Secret123');
        await registerPage.confirmPasswordTextBox.fill('Secret123');

        await expect(registerPage.passwordTextBox).toHaveAttribute('type', 'password');
        await expect(registerPage.confirmPasswordTextBox).toHaveAttribute('type', 'password');
    });

});