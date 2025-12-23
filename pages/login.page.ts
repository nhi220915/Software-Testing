import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;
    readonly loginLink: Locator;
    readonly welcomeMessage: Locator;
    readonly errorMessage: Locator; 
    readonly emailValidationError: Locator;
    readonly passwordValidationError: Locator;

    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);

        this.emailTextBox = page.locator('#username'); 
        this.passwordTextBox = page.locator('#password');
        this.loginButton = page.locator('input[title="Login"]');
        this.loginLink = page.locator('a[href*="Login"]').filter({ hasText: 'Login' });
        this.welcomeMessage = page.locator('div.account >> text=Welcome');
        this.errorMessage = page.locator('.message.error');
        this.emailValidationError = page.locator('label.validation-error[for="username"]');
        this.passwordValidationError = page.locator('label.validation-error[for="password"]');

        this.logoutLink = page.locator('a[href*="Logout"]');
    }

    async goToLoginPage() {
        await this.loginLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.loginLink.click();
        await this.page.waitForURL(/.*Login.*/, { timeout: 30000 });
    }

    async login(username: string, password: string) {
        await this.emailTextBox.waitFor({ state: 'visible', timeout: 30000 });
        await this.emailTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }
}