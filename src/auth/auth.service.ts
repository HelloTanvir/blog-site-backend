import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import { CreateAuthInput } from './dto/create-auth.input';
import { LogoutDto } from './dto/logout.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signup(dto: CreateAuthInput) {
        return this.userService.create(dto);
    }

    async login(dto: LoginDto) {
        return this.userService.login(dto);
    }

    async logout(dto: LogoutDto) {
        return this.userService.logout(dto);
    }

    async getMe(id: string) {
        return this.userService.findOne(id);
    }

    async refreshToken(dto: any) {
        return this.userService.refreshToken(dto);
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
