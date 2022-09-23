import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import { CreateAuthInput } from './dto/create-auth.input';
import { LogoutDto } from './dto/logout.dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async signup(dto: CreateAuthInput): Promise<Tokens> {
        const user = await this.userService.create(dto);

        const tokens = await this.getTokens(user._id.toString());

        // update refresh token in db
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    async login(dto: LoginDto): Promise<Tokens> {
        return this.userService.login(dto);
    }

    async logout(dto: LogoutDto) {
        return this.userService.logout(dto);
    }

    async getMe(id: string) {
        return await this.userService.findOne(id);
    }

    async refreshTokens(userId: string, enteredRt: string): Promise<Tokens> {
        // find user with userId from db
        const user = await this.userService.findOne(userId);

        if (!user || !user.refreshToken) {
            throw new ForbiddenException('invalid refresh token');
        }

        // compare refresh token
        const isRtMatch = await bcrypt.compare(enteredRt, user.refreshToken);

        if (!isRtMatch) {
            throw new ForbiddenException('invalid refresh token');
        }

        const tokens = await this.getTokens(user._id.toString());

        // update refresh token in db
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    private async updateRefreshToken(userId: string, rt: string | null): Promise<void> {
        if (rt) {
            const salt = await bcrypt.genSalt(10);
            rt = await bcrypt.hash(rt, salt);
        }

        const user = await this.userService.findOne(userId);
        user.refreshToken = rt;
        await user.save();
    }

    private async getTokens(userId: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            // access token
            this.jwtService.signAsync(
                {
                    userId,
                },
                {
                    secret: this.config.get('AT_SECRET_KEY'),
                    expiresIn: 60 * 15, // 15 min
                }
            ),

            // refresh token
            this.jwtService.signAsync(
                {
                    userId,
                },
                {
                    secret: this.config.get('RT_SECRET_KEY'),
                    expiresIn: 60 * 60 * 24 * 7, // 1 week
                }
            ),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
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
