import { IsEmail, IsString, IsNotEmpty, IsNumber, MinLength, IsOptional, isInt, IsInt } from "class-validator";



// defining CreateUserDTO
export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    readonly phoneNumber: string ;

    @IsString()
    readonly gender: string;

    @IsNotEmpty()
    // @IsBoolean()
    readonly isActive: boolean;

    @IsNumber()
    readonly age: number;

    @IsString()
    readonly address: string;

    @IsString()
    readonly occupation: string;

    @IsNotEmpty()
    @IsString()
    readonly role: string;
}


// defining GetUserParamsDTO
export class GetUserParamsDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsNotEmpty()
    @IsOptional()
    // @IsBoolean()
    isActive: boolean;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    occupation: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    role: string;

    @IsOptional()
    limit: number;

    @IsOptional()
    offset: number;

    @IsString()
    @IsOptional()
    sortBy:string;

    @IsString()
    @IsOptional()
    order:string;
}



// defining GetPaginationDTO 
export class GetPaginationDTO {
    
    @IsOptional()
    limit: number;


    @IsOptional()
    offset: number;
}




