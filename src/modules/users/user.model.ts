import {
    Table,
    Column,
    Model,
    DataType,
    Validate,
    AllowNull,
} from 'sequelize-typescript';
// import { validate } from 'class-validator';
// import { IsEmail, IsNotEmpty, isEmail } from 'class-validator';

// table decorator marks the class as sequalizer models i.e. it tells the sequalize that this class represents a table in the db

@Table
export class User extends Model<User> {
    // column decorator marks the attribute as a table column
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    // @IsEmail()
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gender: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    age: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    occupation: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role: string;
}
