import {
    IsString,
    IsNumber,
    IsOptional,
    MinLength,
    validate,
} from 'class-validator';

// defining UpdateUserDTO
export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    // @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    occupation?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsString()
    @IsOptional()
    email?: string; 

    @IsString()
    @IsOptional()
    password?: string; 
}

// export the DTOs
module.exports = { UpdateUserDTO };
