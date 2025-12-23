import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserSignUp } from '../models/User';

export class RegisterPage extends BasePage {
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly confirmPasswordTextBox: Locator;
    readonly passportTextBox: Locator;
    readonly registerButton: Locator;

    readonly registerLink: Locator;

    readonly successMessage: Locator;
    readonly mainErrorLabel: Locator;

    readonly emailErrorLabel: Locator;
    readonly passwordErrorLabel: Locator;
    readonly pidErrorLabel: Locator;

    readonly emailLengthErrorMsg: Locator;
    readonly passwordLengthErrorMsg: Locator;
    readonly passwordMismatchErrorMsg: Locator;
    readonly pidLengthErrorMsg: Locator;

    constructor(page: Page) {
        super(page);

        // Elements
        this.emailTextBox = page.locator('#email');
        this.passwordTextBox = page.locator('#password');
        this.confirmPasswordTextBox = page.locator('#confirmPassword');
        this.passportTextBox = page.locator('#pid');
        this.registerButton = page.locator('input[title="Register"]');
        
        this.registerLink = page.locator('a[href*="Register"]').filter({ hasText: 'Register' });

        this.successMessage = page.locator('//p[contains(text(),"You\'re here")]');
        this.mainErrorLabel = page.locator('.message.error');

        this.emailErrorLabel = page.locator("//label[@for='email' and @class='validation-error']");
        this.passwordErrorLabel = page.locator("//label[@for='password' and @class='validation-error']");
        this.pidErrorLabel = page.locator("//label[@for='pid' and @class='validation-error']");

        this.emailLengthErrorMsg = page.locator("//label[normalize-space()='Invalid email length']");
        this.passwordLengthErrorMsg = page.locator("//label[normalize-space()='Invalid password length']");
        this.passwordMismatchErrorMsg = page.locator("//label[normalize-space()='The two passwords do not match']");
        this.pidLengthErrorMsg = page.locator("//label[normalize-space()='Invalid ID length']");
    }

    async goToRegisterPage() {
        await this.registerLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.registerLink.click();
    }

    async register(user: UserSignUp) {
        await this.emailTextBox.waitFor({ state: 'visible' });
        
        await this.emailTextBox.fill(user.email);
        await this.passwordTextBox.fill(user.password);
        await this.confirmPasswordTextBox.fill(user.confirmPassword);
        await this.passportTextBox.fill(user.passport);
        await this.registerButton.click();
    }
}