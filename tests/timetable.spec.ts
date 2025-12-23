import { test, expect } from '@playwright/test';
import { TimetablePage } from '../pages/timetable.page';
import { CONSTANTS } from '../constants/constant';

test.setTimeout(60000);

test.describe('Timetable Functionality', () => {

    test('User can view detailed trips that the system supports', async ({ page }) => {
        const timetablePage = new TimetablePage(page);
        await page.goto(CONSTANTS.BASE_URL);
        await timetablePage.goToTimetablePage();
        await expect(timetablePage.scheduleTable).toBeVisible();
        const rowCount = await timetablePage.tableRows.count();
        expect(rowCount).toBeGreaterThan(0);
    });


    test('Valid train time data format (hh:mm 24-hour format)', async ({ page }) => {
        const timetablePage = new TimetablePage(page);

        await page.goto(CONSTANTS.BASE_URL);
        await timetablePage.goToTimetablePage();

        // 2. Lấy tất cả text trong cột Depart Time và Arrive Time ra thành mảng chuỗi
        const departTimes = await timetablePage.departTimeCells.allInnerTexts();
        const arriveTimes = await timetablePage.arriveTimeCells.allInnerTexts();

        // Kiểm tra chắc chắn là có dữ liệu để test
        expect(departTimes.length).toBeGreaterThan(0);
        expect(arriveTimes.length).toBeGreaterThan(0);

        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

        const areAllDepartTimesValid = departTimes.every(time => timeFormatRegex.test(time.trim()));
        
        expect(areAllDepartTimesValid, 'Some Depart Time values are invalid or missing').toBe(true);

        const areAllArriveTimesValid = arriveTimes.every(time => timeFormatRegex.test(time.trim()));
        
        expect(areAllArriveTimesValid, 'Some Arrive Time values are invalid or missing').toBe(true);
    });

});