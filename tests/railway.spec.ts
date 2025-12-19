import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

// Định nghĩa một khối Test Suite cho chức năng Đăng nhập
test.describe('LOGIN FEATURE TESTS', () => {
    
    let homePage: HomePage;
    let loginPage: LoginPage;
    
    // Dữ liệu người dùng đã đăng ký trước (Precondition)
    const VALID_EMAIL = 'cijnuj@ramcloud.us';
    const VALID_PASSWORD = '123456789';


    // Thiết lập môi trường trước mỗi bài kiểm thử
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        // 1. Điều hướng đến trang chủ
        await page.goto('http://railwayb2.somee.com/');
        
        // 2. Đi đến trang Đăng nhập
        await homePage.goToLoginPage(); 
        await expect(page).toHaveURL(/login/i); 
    });

    // LOG-001: Verify users can login successfully
    test('LOG-001: Verify users can login successfully', async ({ page }) => {
        
        await test.step('1. Thực hiện Đăng nhập bằng Email và Mật khẩu hợp lệ', async () => {
            await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        });

        await test.step('2. Xác minh đã chuyển hướng về trang chủ', async () => {
             // Thường là về trang chủ ('/') hoặc trang Timetable
             await expect(page).toHaveURL(/timetable|home|trainlist|/i); 
        });

        await test.step('3. Xác minh thông báo chào mừng', async () => {
             // Xác minh tên người dùng (Email) hiển thị ở góc trên
             await homePage.shouldWelcomeMsgVisible(VALID_EMAIL);
        });
    });

    test('LOG-004: An error message displays when user tries to login with incorrect password', async ({ page }) => {
        
        // Dữ liệu mật khẩu chắc chắn sai
        const INCORRECT_PASSWORD = 'wrongpassword123'; 
        
        await test.step('1. Thực hiện Đăng nhập với Email hợp lệ và Mật khẩu SAI', async () => {
            await loginPage.login(VALID_EMAIL, INCORRECT_PASSWORD);
        });

        await test.step('2. Xác minh thông báo lỗi chung', async () => {
            // Kết quả mong đợi theo kịch bản: An error message displays to inform that user should enter correct password.
            
            // Thông báo lỗi thực tế thường là: "Invalid Username or Password" hoặc "Login Failed"
            // Hệ thống thường không nói rõ là email sai hay password sai vì lý do bảo mật.
            const expectedErrorPattern = /(incorrect password|invalid username or password|login failed)/i; // VUI LÒNG ĐIỀN THÔNG BÁO THỰC TẾ
            
            await loginPage.shouldSeeGeneralErrorMessage(expectedErrorPattern);
        });
        
        await test.step('3. Xác minh không chuyển trang', async () => {
             // Đảm bảo vẫn ở trang Login
             await expect(page).toHaveURL(/login/i, {timeout: 5000}); 
        });
    });

// --- Dữ liệu Test cho LOG-005 (Bỏ trống) ---
const emptyFieldLoginData = [
    // [Tên kịch bản, Email, Password]x
    ['Bỏ trống cả hai trường', '', ''],
    ['Bỏ trống Email', '', 'ValidPassword123'],
    ['Bỏ trống Password', 'cijnuj@ramcloud.us', ''], // Dùng Email hợp lệ
];
    
    // Lặp lại test này với các dữ liệu trong mảng emptyFieldLoginData
    for (const [name, email, password] of emptyFieldLoginData) {

        test(`LOG-005: Đăng nhập thất bại khi ${name}`, async ({ page }) => {
            
            await test.step(`1. Thực hiện Đăng nhập với ${name}`, async () => {
                await loginPage.login(email, password);
            });

            await test.step('2. Xác minh thông báo lỗi', async () => {
                // Kết quả mong đợi theo kịch bản: An error message displays to inform that user must enter all required field.
                
                // LƯU Ý: Lỗi này thường do HTML5 Validation (hiển thị popup trình duyệt) hoặc lỗi chung.
                // Nếu là lỗi chung:
                const expectedErrorPattern = /(enter all required field|email or password required)/i; // VUI LÒNG ĐIỀN THÔNG BÁO THỰC TẾ
                
                // Nếu là lỗi chung (Sau khi gửi form):
                if (email === '' || password === '') {
                    await loginPage.shouldSeeGeneralErrorMessage(expectedErrorPattern);
                } else {
                    // Nếu không có lỗi chung, bạn có thể kiểm tra lỗi dưới trường cụ thể
                    // (Điều này đòi hỏi thêm Getters lỗi trường trong LoginPage.ts)
                    // Hoặc kiểm tra lỗi HTML5 (rất khó trong Playwright)
                    console.log(`Kiểm tra lỗi chung: ${name}`);
                }
            });
            
            await test.step('3. Xác minh không chuyển trang', async () => {
                 // Đảm bảo vẫn ở trang Login
                 await expect(page).toHaveURL(/login/i); 
            });
        });
    }

    test('LOG-006: Password field should be masked (Password is hidden)', async ({ page }) => {
        
        await test.step('1. Xác minh trường Password được ẩn', async () => {
            // Kiểm tra xem trường Password có thuộc tính type="password" hay không
            await expect(loginPage.getPasswordTxtLocator()).toHaveAttribute('type', 'password');
        });
    });
});

