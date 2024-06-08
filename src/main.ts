import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { UpdateUserDTO } from './modules/users/dto/update-user.dto';
//  The main.ts includes an async function, which will bootstrap our application:

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule); // AppModule is the root module of our project
        const port = 3001;

// await sequelize.sync({ force: true });
        app.useGlobalPipes(new ValidationPipe()); // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.

        await app.listen(port);
        console.log(`Server is running on port ${port} updated`);
    } catch (error) {
        console.log(error);
    }
}
bootstrap();

/*
To create a Nest application instance, we use the core NestFactory class. NestFactory exposes a few static methods 
that allow creating an application instance. The create() method returns an application object, which fulfills the INestApplication 
interface. This object provides a set of methods which are described in the coming chapters. In the main.ts example above, we simply
start up our HTTP listener, which lets the application await inbound HTTP requests.
*/

