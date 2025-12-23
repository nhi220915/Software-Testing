import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CONSTANTS } from '../constants/constant'; 
export class HomePage extends BasePage {
    readonly welcomeHeader: Locator;
    readonly introductionText: Locator;
    readonly createAccountLink: Locator;

    constructor(page: Page) {
        super(page);
        this.welcomeHeader = page.locator('h1[align="center"]');
        
        this.introductionText = page.locator('div[class="content"] p').first();
        
        this.createAccountLink = page.locator('//a[normalize-space()="create an account"]');
    }

    async open() {
        await this.page.goto(CONSTANTS.BASE_URL, { 
            waitUntil: 'domcontentloaded', 
            timeout: 60000 
        });
    }

    async getWelcomeHeaderText() {
        return await this.welcomeHeader.innerText();
    }

    async clickCreateAccountLink() {
        await this.createAccountLink.click();
    }
}