import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000', '*'],
    });

    app.use(graphqlUploadExpress({ maxFiles: 3, maxFileSize: 1000000 }));

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.listen(process.env.PORT || 5000);
}
bootstrap();
