import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CONSTANTS } from '../constants/constant';

test.setTimeout(120000);

test.describe('Login Functionality', () => {

    test('User can login an account with valid info', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);

        await loginPage.goToLoginPage();

        await loginPage.login(CONSTANTS.LOGIN_PATH, CONSTANTS.DEFAULT_PASSWORD);

        await expect(loginPage.welcomeMessage.first()).toBeVisible({ timeout: 30000 });
        await expect(loginPage.welcomeMessage.first()).toContainText(CONSTANTS.LOGIN_PATH);
    });
    test('An error message displays when user tries to login with unregistered email', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        const unregisteredEmail = `unreg${Date.now()}@gmail.com`;

        await loginPage.login(unregisteredEmail, CONSTANTS.DEFAULT_PASSWORD);

        await expect(loginPage.errorMessage).toBeVisible({ timeout: 30000 });
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");
    });
    test('An error message displays when user tries to login with incorrect password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        await loginPage.login(CONSTANTS.LOGIN_PATH, 'WrongPass123!');

        await expect(loginPage.errorMessage).toBeVisible({ timeout: 30000 });
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");
    });

    test('An error message displays when user leaves Email or Password empty', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        await loginPage.login('', '');

        await expect(loginPage.errorMessage).toBeVisible({ timeout: 30000 });
        await expect(loginPage.errorMessage).toHaveText("There was a problem with your login and/or errors exist in your form.");

        await expect(loginPage.emailValidationError).toBeVisible();
        await expect(loginPage.emailValidationError).toContainText("You must specify a username");

        await expect(loginPage.passwordValidationError).toBeVisible();
        await expect(loginPage.passwordValidationError).toContainText("You must specify a password");
    });

    test('Password is masked (hidden) while typing', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        await loginPage.passwordTextBox.fill('SecretPass123');

        await expect(loginPage.passwordTextBox).toHaveAttribute('type', 'password');
    });

    test('Error message displays when user tries to login with password containing HTML script', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

       const htmlPayload = "<script>alert('test')</script>";
    
        await loginPage.login(CONSTANTS.LOGIN_PATH, htmlPayload);

        await expect(loginPage.errorMessage).toBeVisible({ timeout: 30000 });
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");
        
        // Đảm bảo không bị chuyển trang (vẫn ở trang Login)
        await expect(page).toHaveURL(/.*Login.*/);
    });

    // LOG-009: SQL Injection
    test('Error message displays when user tries to login with password containing SQL query', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        const sqlPayload = "' OR '1'='1";
        
        await loginPage.login(CONSTANTS.LOGIN_PATH, sqlPayload);

        await expect(loginPage.errorMessage).toBeVisible({ timeout: 30000 });
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");

        await expect(page).toHaveURL(/.*Login.*/);
    });
    test('User session expires after inactivity (Simulated by clearing cookies)', async ({ page, context }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();
        await loginPage.login(CONSTANTS.LOGIN_PATH, CONSTANTS.DEFAULT_PASSWORD);
        await expect(loginPage.welcomeMessage.first()).toBeVisible();

        await context.clearCookies();

        await page.reload();

        await expect(loginPage.welcomeMessage.first()).not.toContainText(CONSTANTS.LOGIN_PATH);
        await expect(loginPage.loginLink).toBeVisible();
    });

    test('Login is locked if user tries to Login incorrectly 5 times', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();

        const wrongPass = 'WrongPassToLock!';

        await loginPage.login(CONSTANTS.LOGIN_PATH, wrongPass);
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");

        await loginPage.login(CONSTANTS.LOGIN_PATH, wrongPass);
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");

        await loginPage.login(CONSTANTS.LOGIN_PATH, wrongPass);
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");

        await loginPage.login(CONSTANTS.LOGIN_PATH, wrongPass);
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password. Please try again.");

        await loginPage.login(CONSTANTS.LOGIN_PATH, wrongPass);
        
        await expect(loginPage.errorMessage).toBeVisible();
        
        await expect(loginPage.errorMessage).toContainText("locked"); 
    });



});