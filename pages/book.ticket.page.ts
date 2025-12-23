import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookTicketPage extends BasePage {
    readonly bookTicketLink: Locator;
    readonly pageHeader: Locator;

    readonly departDateDropdown: Locator;
    readonly departStationDropdown: Locator;
    readonly arriveStationDropdown: Locator;
    readonly seatTypeDropdown: Locator;
    readonly ticketAmountDropdown: Locator;
    readonly bookTicketButton: Locator;

    readonly errorMessage: Locator;
    readonly successHeader: Locator;

    constructor(page: Page) {
        super(page);

        this.bookTicketLink = page.locator('a[href*="BookTicketPage"]');
        this.pageHeader = page.locator('h1');

        this.departDateDropdown = page.locator('select[name="Date"]');
        this.departStationDropdown = page.locator('select[name="DepartStation"]');
        this.arriveStationDropdown = page.locator('select[name="ArriveStation"]');
        this.seatTypeDropdown = page.locator('select[name="SeatType"]');
        this.ticketAmountDropdown = page.locator('select[name="TicketAmount"]');
        
        this.bookTicketButton = page.locator('input[type="submit"][value="Book ticket"]');
        
        this.errorMessage = page.locator('.message.error');
        this.successHeader = page.locator('h1:has-text("Ticket Booked Successfully")');
    }

    async goToBookTicketPage() {
        await this.bookTicketLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.bookTicketLink.click();
        await this.pageHeader.waitFor({ state: 'visible' });
    }

    async bookTicket(departStation: string, arriveStation: string, seatType: string, amount: string) {
        await this.departStationDropdown.waitFor({ state: 'visible' });

        await this.departDateDropdown.selectOption({ index: 0 }); 

        await this.departStationDropdown.selectOption({ label: departStation });

        await this.arriveStationDropdown.waitFor({ state: 'visible' });
        
        await this.arriveStationDropdown.selectOption({ label: arriveStation });
        await this.seatTypeDropdown.selectOption({ label: seatType });
        await this.ticketAmountDropdown.selectOption({ label: amount });

        await this.bookTicketButton.click();
    }
}