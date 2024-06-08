import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from "../auth/auth.controllers";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../users/user.model";
import { UserController } from "../users/user.controller";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";


@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [AuthController, UserController],
    providers: [AuthService, UserService, UserRepository],
    exports: [AuthService],
})
export class AuthModule {}
