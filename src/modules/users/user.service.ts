import {
    Get,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO, GetUserParamsDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    // constructor(private readonly userRepository: UserRepository) {}

    // canGetAccess function to authorize user for /users GET endpoint on the basis of role
    async canGetAccess(token: string): Promise<boolean> {
        // decode the JWT token using jwt.verify() method
        const decodedToken = jwt.verify(token, '2020b0101032') as {
            role: string;
        };

        // extract the role part and check against admin
        if (decodedToken.role != 'admin') {
            return false;
        }

        // return true if the user is admin
        return true;
    }

    // getAllUsers() => gets all the users from the DB on the basis of query params
    async getAllUsers(params: GetUserParamsDTO): Promise<CreateUserDTO[]> {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            isActive,
            age,
            address,
            occupation,
            role,
            limit = 10,
            offset = 0,
        } = params;

        // add all the query paramns into a queryOptions object for filtering
        const queryOptions: any = {};

        if (role) queryOptions.role = role;
        if (firstName) queryOptions.firstName = firstName;
        if (lastName) queryOptions.lastName = lastName;
        if (email) queryOptions.email = email;
        if (phoneNumber) queryOptions.phoneNumber = phoneNumber;
        if (gender) queryOptions.gender = gender;
        if (isActive) queryOptions.isActive = isActive;
        if (age) queryOptions.age = age;
        if (address) queryOptions.address = address;
        if (occupation) queryOptions.occupation = occupation;
        if (role) queryOptions.role = role;

        // call the getAllUsersByParams() function in the userRepository file
        const users = await this.userRepository.getAllUsersByParams(
            queryOptions,
            limit, // pass limit alongside queryOptions
            offset, // pass offset alongside queryOptions
            params.sortBy, // pass sortBy alongside queryOptions
            params.order, // pass order alongside queryOptions
        );

        // return the filtered users
        return users;
    }

    // findByPK() => get user by userID
    async getUserById(id: number): Promise<CreateUserDTO> {
        // get user with the 'id'
        const user = await this.userRepository.getUserById(id);

        // throw error if the requested user dont exist in the DB
        if (!user) {
            throw new NotFoundException(
                `User with id:${id} does not exist in the database`,
            );
        }

        // return the user
        return user;
    }

    // create() => used for creating a user
    async addIntoDB(user: CreateUserDTO): Promise<CreateUserDTO> {
        // hash the password of user before adding into the DB
        const pw = user.password;
        const hashedPW = await bcrypt.hash(pw, 5); // bcrypt returns a promise, hence we user await to resolve it
        user.password = hashedPW;

        // call the addIntoDB() function in the userRepository file
        return this.userRepository.addIntoDB(user);
    }

    // getExistingUser() function to get existing user by Email
    async getExistingUser(user: CreateUserDTO): Promise<boolean> {
        const existingUser = await this.userRepository.getUserByEmail(user);
        if (existingUser) return true;
        return false;
    }

    // findOne() & update()=> first finds the user and then updates
    async update(id: number, user: UpdateUserDTO): Promise<UpdateUserDTO> {
        // get the user by id
        const existingUser = await this.userRepository.getUserById(id);

        // throw error is user dont exist
        if (!existingUser) {
            throw new NotFoundException('User already not present in the DB');
        }

        // restrict email and password to get updated
        const { email, password, ...updateData } = user;

        Object.assign(existingUser, updateData);

        // call the saveUser() function in the userRepository file
        return await this.userRepository.saveUser(existingUser);
    }

    // delete() function to delete a user by id
    async delete(id: number): Promise<any> {
        // get the user with the id
        const user = await this.userRepository.getUserById(id);

        // throw error if user dont exist
        if (!user) {
            throw new NotFoundException('User already not present in the DB');
        } else await user.destroy();

        return {
            msg: 'User successfully deleted',
        };
    }

    // updatePassword() to update password of a user
    async updatePassword(id: number, updatedPassword: string) {

        // get the user by id
        const user = await this.getUserById(id);

        // update the password
        user.password = updatedPassword;
        this.userRepository.saveUser(user);


        throw new HttpException(
            'Password changed successfully!',
            HttpStatus.OK,
        );
    }
}

// export the UserService module
module.exports = { UserService };
