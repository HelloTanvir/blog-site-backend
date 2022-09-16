import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config';
import { PostModule } from './post/post.module';
import { MongoExceptionFilter } from './utils';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
        }),
        PostModule,
        CloudinaryModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: MongoExceptionFilter,
        },
    ],
})
export class AppModule {}
