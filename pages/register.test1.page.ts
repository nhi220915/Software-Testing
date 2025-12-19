import { expect, Locator, Page } from "@playwright/test";

export class RegisterPage {

    private readonly page: Page;
    private readonly emailTxt: Locator;
    private readonly passwordTxt: Locator;
    private readonly confirmPasswordTxt: Locator;
    private readonly pidTxt: Locator; 
    private readonly registerBtn: Locator;
    private readonly successMsg: Locator; 

    private readonly errorGeneralMsg: Locator;
    private readonly emailErrorMsg: Locator;
    private readonly passwordErrorMsg: Locator;
    private readonly confirmPasswordErrorMsg: Locator;
    private readonly pidErrorMsg: Locator;
    private readonly showPasswordToggle: Locator; 

    constructor(page: Page) {
        this.page = page;
        
        this.emailTxt = this.page.getByRole('textbox', { name: 'Email' }); 
        this.passwordTxt = this.page.getByLabel('Password').first(); 
        this.confirmPasswordTxt = this.page.getByLabel('Confirm Password'); 
        this.pidTxt = this.page.getByLabel('PID'); 
        
        // LỖI CÚ PHÁP VÀ LOGIC ĐƯỢC SỬA TẠI ĐÂY:
        
        // 1. Sửa lỗi cú pháp: Trỏ Locator lỗi Email đến một Selector cụ thể hơn.
        // Dùng Selector text (nguyên tắc chung khi không có ID)
        this.emailErrorMsg = this.page.locator('#email + span.field-validation-error'); // VÍ DỤ: Cần được thay thế bằng Selector thực tế
        
        this.registerBtn = this.page.getByRole('button', { name: 'Register' });

        this.successMsg = this.page.getByText('Registration Confirmed! You can now log in to the site.'); 
        
        // 2. Sửa lỗi logic: Các Locator lỗi trường cụ thể KHÔNG NÊN cùng trỏ đến lỗi chung (.message.error).
        this.errorGeneralMsg = this.page.locator('.message.error'); // Lỗi chung
        
        // 3. Định nghĩa các Locator lỗi trường cụ thể: (VUI LÒNG KIỂM TRA LẠI CÁC SELECTOR NÀY)
        this.passwordErrorMsg = this.page.locator('#password-error'); // VÍ DỤ: Sử dụng ID cụ thể
        this.confirmPasswordErrorMsg = this.page.locator('#confirmPassword-error');
        this.pidErrorMsg = this.page.locator('#pid-error');
        this.showPasswordToggle = this.page.locator('#showPasswordToggle');

    }

    async register(email: string, password: string, pid: string = '123456789'): Promise<void> {
        await this.emailTxt.fill(email); 
        await this.passwordTxt.fill(password);
        await this.confirmPasswordTxt.fill(password); 
        await this.pidTxt.fill(pid);
        await this.registerBtn.click();
    }
    
    // --- PHƯƠNG THỨC MỚI: KIỂM TRA LỖI ---

    async shouldSeeSuccessMessage(): Promise<void> {
        await expect(this.successMsg).toBeVisible();
    }
    
    /**
     * Kiểm tra thông báo lỗi chung (dùng cho REG-004)
     */
    async shouldSeeGeneralErrorMessage(expectedPattern: RegExp): Promise<void> { 
        await expect(this.errorGeneralMsg).toBeVisible();
        await expect(this.errorGeneralMsg).toContainText(expectedPattern); 
    }
    
    /**
     * Kiểm tra thông báo lỗi cụ thể dưới một trường nhập liệu (REG-005, 007, 008, 009)
     */
    async shouldSeeFieldError(fieldErrorLocator: Locator, expectedText: string): Promise<void> {
        await expect(fieldErrorLocator).toBeVisible();
        await expect(fieldErrorLocator).toContainText(expectedText);
    }

    // --- GETTERS CHO LOCATOR (SỬA LỖI CÚ PHÁP CHO FILE TEST) ---
    
    /**
     * Trả về Locator của thông báo thành công. (Dùng để kiểm tra KHÔNG hiển thị)
     */
    public getSuccessMessageLocator(): Locator {
        return this.successMsg;
    }
    
    public getPasswordErrorLocator(): Locator { // <-- ĐÃ BỎ COMMENT VÀ SỬA CÚ PHÁP
        return this.passwordErrorMsg; 
    }
    
    public getConfirmPasswordErrorLocator(): Locator { 
        return this.confirmPasswordErrorMsg; 
    }
    
    public getPidErrorLocator(): Locator { 
        return this.pidErrorMsg; 
    }

    public getEmailErrorLocator(): Locator {
        return this.emailErrorMsg;
    }

    public getEmailTxtLocator(): Locator { 
        return this.emailTxt; 
    }

    public getPasswordTxtLocator(): Locator { 
        return this.passwordTxt; 
    }

    public getConfirmPasswordTxtLocator(): Locator { 
        return this.confirmPasswordTxt; 
    }

    public getPidTxtLocator(): Locator { 
        return this.pidTxt; 
    }

    public getRegisterBtnLocator(): Locator { 
        return this.registerBtn; 
    }
}