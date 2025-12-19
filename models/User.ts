// models/User.ts
export interface User {
    email: string;
    password: string;
}

export interface UserSignUp {
    email: string;
    password: string;
    confirmPassword: string;
    passport: string;
}