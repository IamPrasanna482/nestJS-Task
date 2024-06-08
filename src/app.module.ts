import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/user.module'; 
import { AuthModule } from './modules/auth/auth.module'; 
import { sequelizeConfig } from './config/sequelize.config';

@Module({
    imports: [
        SequelizeModule.forRoot(sequelizeConfig),
        UsersModule,
        AuthModule,
    ],
})
export class AppModule {}
