// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '../models/User';

export class LoginPage extends BasePage {
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;
    readonly errorLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.emailTextBox = page.locator("#username");
        this.passwordTextBox = page.locator("#password");
        this.loginButton = page.locator("//input[@title='Login']");
        this.errorLabel = page.locator("//p[@class='message error LoginForm']");
    }

    async login(user: User) {
        await this.emailTextBox.fill(user.email);
        await this.passwordTextBox.fill(user.password);
        await this.loginButton.click();
    }
}