import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { orderBy, take } from 'lodash';
import { skip } from 'rxjs';

@Injectable()
export class UserRepository {
    constructor() {}

    // getAllUsers function
    async getAllUsers(
        limit: number = 10,
        offset: number = 0,
    ): Promise<CreateUserDTO[]> {
        //  getAllUsers using limit and offest (optional) for pagination
        return await User.findAll({ limit: limit, offset: offset });
    }

    // getAllUsersByParams function to get al the users by filtering and sorting using the query paramters
    async getAllUsersByParams(
        queryOptions?: any,
        limit?: number,
        offset?: number,
        sortBy: string = 'id',
        order: string = 'ASC',
    ): Promise<CreateUserDTO[]> {
        // get the filtered and sorted users
        const users = await User.findAll({
            where: queryOptions,
            limit: limit,
            offset: offset,
            order: [[sortBy, order]],
        });

        // return the users
        return users;
    }

    // getUserById function the get user by id => /users/:id GET
    async getUserById(id: number): Promise<any> {
        // use findByPK method to get user by id
        return await User.findByPk(id);
    }

    // getUserByEmail function to get user by Email
    async getUserByEmail(user: CreateUserDTO): Promise<any> {
        // use the findOne function to get the unique user by email
        return await User.findOne({ where: { email: user.email } });
    }

    // addIntoDB function to add user into the DB => /users POST
    async addIntoDB(user: CreateUserDTO): Promise<CreateUserDTO> {
        // use create function to add user into the DB
        return await User.create(user);
    }

    // saveUser function to save the user after updating the user
    async saveUser(user): Promise<CreateUserDTO> {
        // use the save() function
        return await user.save();
    }
}
