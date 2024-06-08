import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Max@bravo1',
    database: 'UMS',
    autoLoadModels: true,
    synchronize: false, // Disable auto-sync to prevent automatic schema changes
};

// await sequalize.authenticate();
// sequalize.addModels([User]);
// await sequalize.sync();
// return sequalize;
