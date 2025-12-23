import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TimetablePage extends BasePage {
    readonly timetableLink: Locator;
    readonly pageHeader: Locator;
    readonly scheduleTable: Locator;
    readonly tableHeaders: Locator;
    readonly tableRows: Locator;
    readonly checkPriceLinks: Locator;

    readonly departTimeCells: Locator;
    readonly arriveTimeCells: Locator;

    constructor(page: Page) {
        super(page);

        this.timetableLink = page.locator('a[href*="TrainTimeListPage"]'); 
        this.pageHeader = page.locator('h1');
        this.scheduleTable = page.locator('table.MyTable');
        this.tableHeaders = page.locator('table.MyTable tr th');
        this.tableRows = page.locator('table.MyTable tr:not(:first-child)');
        this.checkPriceLinks = page.locator('a[href*="TicketPricePage"]');

        // Giả sử cấu trúc bảng: No. | Dep Station | Arr Station | Depart Time | Arrive Time ...
        // Depart Time là cột thứ 4
        this.departTimeCells = page.locator('table.MyTable tr:not(:first-child) td:nth-child(4)');
        
        // Arrive Time là cột thứ 5
        this.arriveTimeCells = page.locator('table.MyTable tr:not(:first-child) td:nth-child(5)');
    }

    async goToTimetablePage() {
        await this.timetableLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.timetableLink.click();
        await this.scheduleTable.waitFor({ state: 'visible', timeout: 30000 });
    }
}