import { IsEmail, IsInt, IsNumber, IsString, isString } from 'class-validator';


// LoginDTO for the /auth/login endpoint
export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}


// LoginDTO for the /auth/changePassword endpoint
export class ChangePasswordDto {
    @IsInt()
    userId: number;

    @IsString()
    currentPassword: string;

    @IsString()
    newPassword: string;
}