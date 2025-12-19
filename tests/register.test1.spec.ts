// File: tests/register.spec.ts

import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page"; 

// REG-007 (Mật khẩu không hợp lệ) ---
const invalidPasswordLengthData = [
    // [Tên kịch bản, Mật khẩu không hợp lệ]
    ['Password < 8 ký tự (1 ký tự)', 'p'],
    ['Password < 8 ký tự (7 ký tự)', 'p123456'], 
    ['Password > 64 ký tự (65 ký tự)', 'a'.repeat(65)],
];

// Định nghĩa một khối Test Suite cho chức năng Đăng ký
test.describe('REGISTRATION FEATURE TESTS', () => {
    
    let homePage: HomePage;
    let registerPage: RegisterPage;

    // Thiết lập môi trường trước mỗi bài kiểm thử (Điều hướng)
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);

        await page.goto('http://railwayb2.somee.com/');
        await homePage.goToRegisterPage(); 
        await expect(page).toHaveURL(/register/i); 
    });

    // REG-003: Đăng ký thành công 
    test('REG-003: Verify new user can register successfully', async ({ page }) => {
        const TIMESTAMP = Date.now();
        const TEST_EMAIL = `newuser${TIMESTAMP}@example.com`; 
        const TEST_PASSWORD = 'password123';
        
        await test.step('1. Thực hiện Đăng ký với dữ liệu hợp lệ', async () => {
            await registerPage.register(TEST_EMAIL, TEST_PASSWORD);
        });
        // await test.step('2. Xác minh kết quả đăng ký thành công', async () => {
        //     await registerPage.shouldSeeSuccessMessage();
        // });
    });

    // Test Case REG-004    
    const EXISTED_EMAIL = 'nhitestauto@gmail.com'; 
    const VALID_PASSWORD = '123456789';
    const VALID_PID = '123456789'; 

    test('REG-004: An error message displays when user tries to register with using existed email', async ({ page }) => {

        await test.step('1. Chuẩn bị: Đảm bảo tài khoản EXISTED_EMAIL đã tồn tại', async () => {
            });
    
        await test.step('2. Thực hiện Đăng ký với Email đã tồn tại', async () => {
            await registerPage.register(EXISTED_EMAIL, VALID_PASSWORD, VALID_PID);
        });

        await test.step('3. Xác minh thông báo lỗi chung', async () => {
            const expectedPattern = /email.*already in use/i;
            await registerPage.shouldSeeGeneralErrorMessage(expectedPattern);
        });
    
        await test.step('4. Xác minh trạng thái', async () => {
            // Đảm bảo không có thông báo thành công và không chuyển trang
            await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
            await expect(page).toHaveURL(/register/i); 
        });
    });


//REG-005 (Độ dài Email không hợp lệ) ---
const invalidEmailLengthData = [
    ['Email < 6 ký tự (1 ký tự)', 'a'],
    ['Email < 6 ký tự (4 ký tự)', 'a@b'],
    ['Email < 6 ký tự (5 ký tự)', 'ab@c'],
    ['Email > 32 ký tự (33 ký tự)', 'a'.repeat(25) + '@b.com'], // 25+1+5 = 31 ký tự, thêm 2 ký tự nữa
    ['Email > 32 ký tự (65 ký tự)', 'toolongemail' + Date.now() + 'toolongemail' + '@test.com'],
    ['Email quá dài (100 ký tự)', 'e'.repeat(90) + '@test.com'],
];

// Lặp lại test này với các dữ liệu trong mảng invalidEmailLengthData
for (const [name, invalidEmail] of invalidEmailLengthData) {

    test(`REG-005: Đăng ký thất bại với ${name}`, async ({ page }) => {
        const validPassword = 'ValidPassword123';
        const validPID = '123456789';

        await test.step(`1. Điền thông tin với Email không hợp lệ (${invalidEmail})`, async () => {
            // Điền email không hợp lệ, còn lại là hợp lệ
            await registerPage.register(invalidEmail, validPassword, validPID); 
        });

        await test.step('2. Xác minh thông báo lỗi dưới trường Email', async () => {
            const expectedError = 'Email length must be between 6 and 32 characters.';
            
            // await registerPage.shouldSeeFieldError(
            //     registerPage.getEmailErrorLocator(), // Lấy Locator cho lỗi Email
            //     expectedError
            // );
        });
        
        await test.step('3. Xác minh không chuyển trang', async () => {
             // Đảm bảo không có thông báo thành công và không chuyển trang
             await expect(page).toHaveURL(/register/i); 
             await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
        });
    });
}

test('REG-008: An error message displays when password mismatch', async ({ page }) => {

    const validEmail = `mismatch_test_${Date.now()}@test.com`;
    const validPassword = 'CorrectPassword123';
    const mismatchConfirm = 'WrongPassword456';
    const validPID = '123456789';

    await test.step('1. Điền thông tin với Mật khẩu Xác nhận không khớp', async () => {
        await registerPage.getEmailTxtLocator().fill(validEmail);
        await registerPage.getPasswordTxtLocator().fill(validPassword);
        await registerPage.getConfirmPasswordTxtLocator().fill(mismatchConfirm); // <-- Gây lỗi
        await registerPage.getPidTxtLocator().fill(validPID);
        
        await registerPage.getRegisterBtnLocator().click();
    });

await test.step('2. Xác minh thông báo lỗi chung', async () => {
    const expectedGeneralErrorPattern = /errors in the form/i; // Kiểm tra từ khóa lỗi chung

    await registerPage.shouldSeeGeneralErrorMessage(expectedGeneralErrorPattern); 

});
    
    await test.step('3. Xác minh không chuyển trang', async () => {
         await expect(page).toHaveURL(/register/i); 
         await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
    });
});

   const invalidPIDLengthData = [
    // [Tên kịch bản, PID không hợp lệ]
    ['PID < 8 ký tự (1 ký tự)', '1'],
    ['PID < 8 ký tự (7 ký tự)', '1234567'], 
    ['PID > 20 ký tự (21 ký tự)', '1'.repeat(21)],
    ['PID quá dài (30 ký tự)', '1'.repeat(30)],
];

// Lặp lại test này với các dữ liệu trong mảng invalidPIDLengthData
for (const [name, invalidPID] of invalidPIDLengthData) {

    test(`REG-009: Đăng ký thất bại với ${name}`, async ({ page }) => {        
        const validEmail = `pid_fail_${Date.now()}@test.com`;
        const validPassword = 'ValidPassword123';

        await test.step(`1. Điền thông tin với PID không hợp lệ (${invalidPID})`, async () => {
            // Sử dụng phương thức register() với PID không hợp lệ
            await registerPage.register(validEmail, validPassword, invalidPID); 
        });

        await test.step('2. Xác minh thông báo lỗi dưới trường PID/Passport', async () => {
            const expectedError = 'PID/Passport number must be between 8 and 20 characters.';
            
            // await registerPage.shouldSeeFieldError(
            //     registerPage.getPidErrorLocator(), // Lấy Locator cho lỗi PID/Passport
            //     expectedError
            // );
        });
        
        await test.step('3. Xác minh không chuyển trang', async () => {
             // Đảm bảo không có thông báo thành công và không chuyển trang
             await expect(page).toHaveURL(/register/i); 
             await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
        });
    });
}


// REG-010 (Định dạng PID/Passport không hợp lệ)
const invalidPIDFormatData = [
    // [Tên kịch bản, PID không hợp lệ (đã giữ đúng độ dài 8-20)]
    ['Chứa ký tự đặc biệt', '1234567@'], // Dùng 8 ký tự, nhưng có @
    ['Chứa chữ cái', 'ABC78901'],
    ['Chứa khoảng trắng', '123 45678'],
];

// Lặp lại test này với các dữ liệu trong mảng invalidPIDFormatData
for (const [name, invalidPID] of invalidPIDFormatData) {

    test(`REG-010: Đăng ký thất bại với PID/Passport: ${name}`, async ({ page }) => {
        
        const validEmail = `pid_format_${Date.now()}@test.com`;
        const validPassword = 'ValidPassword123';

        await test.step(`1. Điền thông tin với PID định dạng không hợp lệ (${invalidPID})`, async () => {
            // Sử dụng phương thức register() với PID không hợp lệ
            await registerPage.register(validEmail, validPassword, invalidPID); 
        });

        await test.step('2. Xác minh thông báo lỗi dưới trường PID/Passport', async () => {
            const expectedError = 'PID/Passport format is invalid.';
            
            await registerPage.shouldSeeFieldError(
                registerPage.getPidErrorLocator(), // Lấy Locator cho lỗi PID/Passport
                expectedError
            );
        });
        
        await test.step('3. Xác minh không chuyển trang', async () => {
             await expect(page).toHaveURL(/register/i); 
             await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
        });
    });
}


test('REG-012: Đăng ký thất bại khi bỏ trống tất cả các trường', async ({ page }) => {

    await test.step('1. Bỏ trống tất cả các trường', async () => {
        await registerPage.getRegisterBtnLocator().click();
    });

    await test.step('2. Xác minh lỗi dưới trường Email', async () => {
        const expectedFieldError = 'Trường Email là bắt buộc.'; 
        
        await registerPage.shouldSeeFieldError(
            registerPage.getEmailErrorLocator(), // <-- Sẽ chạy đúng sau khi sửa lỗi cú pháp
            expectedFieldError
        );
    });

    await test.step('3. Xác minh lỗi chung', async () => {
        // Lỗi chung thường là: "Có lỗi trong form. Vui lòng điền đầy đủ."
        const expectedGeneralErrorPattern = /enter all required field/i; 
        await registerPage.shouldSeeGeneralErrorMessage(expectedGeneralErrorPattern);
    });

    await test.step('4. Xác minh không chuyển trang', async () => {
        await expect(page).toHaveURL(/register/i); 
    });
});


test('REG-013: Password and Confirm Password fields should be masked', async ({ page }) => {

    await test.step('1. Xác minh trường Password được ẩn', async () => {
        // Kiểm tra xem trường Password có thuộc tính type="password" hay không
        await expect(registerPage.getPasswordTxtLocator()).toHaveAttribute('type', 'password');
    });

    await test.step('2. Xác minh trường Confirm Password được ẩn', async () => {
        // Kiểm tra xem trường Confirm Password có thuộc tính type="password" hay không
        await expect(registerPage.getConfirmPasswordTxtLocator()).toHaveAttribute('type', 'password');
    });
});
    

test('REG-014: "Show Password" toggle works correctly (toggling input type)', async ({ page }) => {
    
    const inputPassword = registerPage.getPasswordTxtLocator();
    const inputConfirm = registerPage.getConfirmPasswordTxtLocator();
    const TEST_PASSWORD = 'TestPassword123';

    // Giả định: Cần nhập dữ liệu trước để nút toggle hoạt động
    await test.step('1. Nhập mật khẩu và xác minh trạng thái ẩn ban đầu', async () => {
        await 
        await inputPassword.fill(TEST_PASSWORD);
        await inputConfirm.fill(TEST_PASSWORD);
        
        // Trạng thái ban đầu: type="password" (ẩn)
        await expect(inputPassword).toHaveAttribute('type', 'password');
        await expect(inputConfirm).toHaveAttribute('type', 'password');
    });

    await test.step('2. Click Toggle để HIỆN mật khẩu', async () => {
        await page.locator('#showPasswordToggle').click();
    });

    await test.step('3. Xác minh thuộc tính chuyển sang type="text" (Hiện)', async () => {
        // Trạng thái sau khi click: type="text" (hiện)
        await expect(inputPassword).toHaveAttribute('type', 'text');
        await expect(inputConfirm).toHaveAttribute('type', 'text');
    });
    
    await test.step('4. Click Toggle lần nữa để ẨN mật khẩu', async () => {
        // await registerPage.getShowPasswordToggleLocator().click();
        await page.locator('#showPasswordToggle').click(); 
    });

    await test.step('5. Xác minh thuộc tính quay lại type="password" (Ẩn)', async () => {
        // Trạng thái sau khi click lần 2: type="password" (ẩn)
        await expect(inputPassword).toHaveAttribute('type', 'password');
        await expect(inputConfirm).toHaveAttribute('type', 'password');
    });
});

    for (const [name, invalidPassword] of invalidPasswordLengthData) {

        test(`REG-007: Đăng ký thất bại với ${name}`, async ({ page }) => {
            const validEmail = `fail_pass_${Date.now()}@test.com`;
            const validPID = '123456789';

            await test.step(`1. Điền thông tin với mật khẩu không hợp lệ (${invalidPassword})`, async () => {
                // Phương thức register sẽ điền mật khẩu không hợp lệ vào cả 2 trường
                await registerPage.register(validEmail, invalidPassword, validPID); 
            });

            await test.step('2. Xác minh thông báo lỗi dưới trường Password', async () => {
                // Thông báo lỗi theo yêu cầu của kịch bản REG-007
                const expectedError = 'Password length must be between 8 and 64 characters.'; 
                
                // await registerPage.shouldSeeFieldError(
                //     registerPage.getPasswordErrorLocator(), // Lấy Locator lỗi từ Page Object
                //     expectedError
                // );
            });
            
            await test.step('3. Xác minh không chuyển trang', async () => {
                 await expect(page).toHaveURL(/register/i); 
                 // Đã sửa lỗi truy cập private bằng cách sử dụng Getter
                 await expect(registerPage.getSuccessMessageLocator()).not.toBeVisible();
            });
        });
    }
});