import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookTicketPage } from '../pages/book.ticket.page';
import { CONSTANTS } from '../constants/constant';

test.setTimeout(120000);

test.describe('Book Ticket Functionality', () => {

    test('Ticket amount field displays values from 1–10', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const bookTicketPage = new BookTicketPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();
        await loginPage.login(CONSTANTS.LOGIN_PATH, CONSTANTS.DEFAULT_PASSWORD);

        await bookTicketPage.goToBookTicketPage();
        const options = await bookTicketPage.ticketAmountDropdown.locator('option').allInnerTexts();

        expect(options.length).toBe(10);
        const expectedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        expect(options).toEqual(expectedValues);
        expect(options).not.toContain('11');
    });

    // Max 10 tickets rule
    test('User cannot book more than 10 tickets', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const bookTicketPage = new BookTicketPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();
        await loginPage.login(CONSTANTS.LOGIN_PATH, CONSTANTS.DEFAULT_PASSWORD);

        await bookTicketPage.goToBookTicketPage();

        await bookTicketPage.bookTicket('Sài Gòn', 'Nha Trang', 'Soft seat', '10');

        await expect(bookTicketPage.successHeader).toBeVisible({ timeout: 30000 });

        await bookTicketPage.goToBookTicketPage();
        await bookTicketPage.bookTicket('Sài Gòn', 'Nha Trang', 'Soft seat', '1');

        await expect(bookTicketPage.errorMessage).toBeVisible({ timeout: 30000 });

        await expect(bookTicketPage.errorMessage).toContainText("book more than 10 tickets"); 
    });

    test('User cannot select invalid date (past date)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const bookTicketPage = new BookTicketPage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await loginPage.goToLoginPage();
        await loginPage.login(CONSTANTS.LOGIN_PATH, CONSTANTS.DEFAULT_PASSWORD);

        await bookTicketPage.goToBookTicketPage();
        await bookTicketPage.departDateDropdown.evaluate((select: HTMLSelectElement) => {
            const option = document.createElement('option');
            option.value = '1/1/2000';
            option.text = '1/1/2000';
            select.add(option);
            select.value = '1/1/2000';
            select.dispatchEvent(new Event('change'));
        });

        await bookTicketPage.departStationDropdown.selectOption({ index: 1 }); // Chọn ga bất kỳ
        await page.waitForTimeout(1000); // Chờ ga đến update
        await bookTicketPage.arriveStationDropdown.selectOption({ index: 1 });
        await bookTicketPage.seatTypeDropdown.selectOption({ index: 1 });
        await bookTicketPage.ticketAmountDropdown.selectOption({ index: 0 }); // 1 vé

        await bookTicketPage.bookTicketButton.click();

        await expect(bookTicketPage.errorMessage).toBeVisible({ timeout: 30000 });
        
        await expect(bookTicketPage.errorMessage).toContainText("valid date"); 
    });

});