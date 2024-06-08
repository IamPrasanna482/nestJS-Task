import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
    Req,
    BadRequestException,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, GetUserParamsDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import {
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UserController {
    // userServices => DI
    constructor(private readonly userService: UserService) {}
    /*
    mark each method as async => asynchronous methods
    by using promises, we can asynchronously call the methods to perform queries on the DB
    */

    // /users GET to get all the users acc to query parameters
    @Get()
    async findAll(
        @Req() req: Request, // req contains the jwt token
        @Query() params: GetUserParamsDTO, // params contains the query parameters for filtering
    ) {
        // get the authorization token from authorization header
        const authorization = req.headers.authorization; // a string
        const token = authorization.split(' ')[1];

        // check if token is present or not
        if (!token) {
            // only admin can access /users GET
            throw new HttpException(
                'Auth token is missing !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // get the boolean value to check if the requested user can get access this URL, call canGetAccess function from userServices file
        const canAccessURL = await this.userService.canGetAccess(token);

        // if access denied i.e. the role is not admin
        if (!canAccessURL) {
            throw new UnauthorizedException(
                'Only admin can access /users GET endpoint!',
                'Unauthorized',
            );
        }

        // if role is admin, call the getAllUsers function from the userService file to get all the users
        return this.userService.getAllUsers(params);
    }

    // get user by id
    @Get(':id')
    async findOne(
        @Param() getuserParam: GetUserParamsDTO,
    ): Promise<CreateUserDTO> {
        // call the getUserById function from the userService file to get user by id
        return this.userService.getUserById(getuserParam.id);
    }

    // create a user
    @Post()
    async create(@Body() user: CreateUserDTO): Promise<CreateUserDTO> {
        // Check if user already exists using the same email
        const alreadyExists = await this.userService.getExistingUser(user);

        // throw error if user already exists
        if (alreadyExists) {
            throw new HttpException(
                'Email ID already exists !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // is user dont exists, save the user into the DB
        return this.userService.addIntoDB(user);
    }

    // update a user
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() user: UpdateUserDTO,
    ): Promise<UpdateUserDTO> {
        // restrict the updating field to be username or password
        if ('email' in user || 'password' in user) {
            throw new BadRequestException(
                'Updating email or password is not allowed !',
            );
        }

        // call the update function in the userService file
        return this.userService.update(id, user);
    }

    // delete a user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<CreateUserDTO> {
        // call the delete function in the userService file
        return this.userService.delete(id);
    }
}

// export the UserController
module.exports = { UserController };
