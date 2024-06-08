import { UserService } from "../users/user.service";
import { Body, Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from "../users/user.repository";
import { ChangePasswordDto } from "./dto/auth.changePW.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: UserRepository,
    ) {}

    // login function
    async login(email: string, password: string, role: string) {
        // check if the user with email exists or not
        const existingUser = await User.findOne({ where: { email: email } });

        // throw error if requested user dont exist
        if (!existingUser) {
            throw new HttpException(
                'Email ID is not registered !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // check if the password is correct or not
        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password,
        );

        // throw error is the password entered is incorrect
        if (!isValidPassword) {
            throw new HttpException(
                'Please enter correct password !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // generate JWT token using jwt.sign() method
        const token = jwt.sign(
            {
                email: email,
                password: password,
                role: role,
            },
            '2020b0101032', // JWT key
        );

        // return the response containing the JWT Key
        return {
            msg: `user with email ${email} is successfully logged in using the token!`,
            token: `${token}`,
        };
    }

    // changePassword function
    async changePassword(@Body() GetChangePasswordBody: ChangePasswordDto) {

        // check if user exists for the given userId in the DB
        const user = await this.userRepository.getUserById(GetChangePasswordBody.userId,);


        // throw error is user dont exist
        if (!user) {
            throw new NotFoundException('Requested User is not found !');
        }

 

        // bcrypt compare function to check if the password is correct
        const isValidPassword = await bcrypt.compare(GetChangePasswordBody.currentPassword,user.password);

        // check if the oldPassword is correct or not
        if (!isValidPassword) {
            throw new HttpException('Please enter correct password !',HttpStatus.BAD_REQUEST);
        }


        // hash the newPassword
        const hashedPassword = await bcrypt.hash(GetChangePasswordBody.newPassword,5);


        // call the udpatePassword function in the userService file
        await this.userService.updatePassword(GetChangePasswordBody.userId,hashedPassword);
    }
} 

// export the AuthService class
module.exports = {AuthService}
