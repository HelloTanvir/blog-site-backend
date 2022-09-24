import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
    imports: [JwtModule.register({}), UserModule],
    providers: [AuthResolver, AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
