// pages/RegisterPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserSignUp } from '../models/User';

export class RegisterPage extends BasePage {
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly confirmPasswordTextBox: Locator;
    readonly passportTextBox: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;
    readonly errorLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.emailTextBox = page.locator('#email');
        this.passwordTextBox = page.locator('#password');
        this.confirmPasswordTextBox = page.locator('#confirmPassword');
        this.passportTextBox = page.locator('#pid');
        this.registerButton = page.locator('input[title="Register"]');
        this.successMessage = page.locator('//p[contains(text(),"You\'re here")]');
        this.errorLabel = page.locator('.message.error');
    }

    async register(user: UserSignUp) {
        await this.emailTextBox.fill(user.email);
        await this.passwordTextBox.fill(user.password);
        await this.confirmPasswordTextBox.fill(user.confirmPassword);
        await this.passportTextBox.fill(user.passport);
        // Playwright tự động cuộn đến phần tử trước khi click, 
        // nên không cần DriverUntils.scrollIntoView như Java
        await this.registerButton.click();
    }
}