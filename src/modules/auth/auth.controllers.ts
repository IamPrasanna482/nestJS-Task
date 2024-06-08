import { Body, Controller, Head, Post, Put, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ChangePasswordDto, LoginDto } from "./dto/auth.changePW.dto";


// controller for the /auth endpoint
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    // /auth/login POST endpoint for login user and return the JWT Token
    @Post('login')
    async login(@Body() LoginDto:LoginDto){
        const {email, password, role} = LoginDto;
        
        // call the login function from the authService file
        return this.authService.login(email, password, role);
    }


    // /auth/change-password endpoint for changing the password of the user 
    @Put('change-password')
    async changePassword(@Body() ChangePasswordDto:ChangePasswordDto) {
        // call the changePassword function from the authService file
        return this.authService.changePassword(ChangePasswordDto);
    }
}


// export the AuthControoler class
module.exports = {AuthController};

