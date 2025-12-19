// pages/HomePage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async open() {
        // Sử dụng URL từ Constant.ts
        await this.page.goto('http://railwayb2.somee.com/');
    }
}