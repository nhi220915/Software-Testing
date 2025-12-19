// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly loginTab: Locator;
    readonly registerTab: Locator;
    readonly contactTab: Locator;
    readonly timetableTab: Locator;
    readonly logoutTab: Locator;
    // Bổ sung thêm locator cho nhãn chào mừng
    readonly greetingLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginTab = page.locator("//span[contains(text(),'Login')]");
        this.registerTab = page.locator("//span[normalize-space()='Register']");
        this.contactTab = page.locator("//span[contains(text(),'Contact')]");
        this.timetableTab = page.locator("//span[contains(text(),'Timetable')]");
        this.logoutTab = page.locator("//a[@href='/Account/Logout']");
        // Khởi tạo locator cho Greeting (dựa trên CSS Selector trong Java: "div.account strong")
        this.greetingLabel = page.locator("div.account strong");
    }

    async goToLoginPage() {
        await this.loginTab.click();
    }

    async goToRegisterPage() {
        await this.registerTab.click();
    }

    async goToContactPage() {
        await this.contactTab.click();
    }

    async logout() {
        await this.logoutTab.click();
    }

    // Bổ sung hàm lấy text chào mừng để login.spec.ts có thể gọi được
    async getGreetingText(): Promise<string> {
        return await this.greetingLabel.innerText();
    }
}