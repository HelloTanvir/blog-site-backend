import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AtGuard } from './common/guards';
import { MongooseConfigService } from './mongoose-config';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { MongoExceptionFilter } from './utils';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
        }),
        PostModule,
        CloudinaryModule,
        UserModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        {
            provide: APP_PIPE,
            useClass: MongoExceptionFilter,
        },
    ],
})
export class AppModule {}
