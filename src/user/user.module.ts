import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { User, UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CloudinaryModule,
    ],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
