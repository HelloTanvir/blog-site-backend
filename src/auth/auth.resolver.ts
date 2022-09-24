import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto, RefreshTokensDto } from './dto';
import { Tokens } from './types';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    signup(@Args('signupInput') dto: CreateUserDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Mutation(() => User)
    login(@Args('loginInput') dto: LoginDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    @Mutation(() => String)
    logout(@Args('logoutInput') dto: LogoutDto): Promise<string> {
        return this.authService.logout(dto);
    }

    @Query(() => User)
    getMe(@Args('userId', { type: () => ID }) userId: string): Promise<User> {
        return this.authService.getMe(userId);
    }

    @Mutation(() => User)
    refreshTokens(@Args('refreshTokensInput') dto: RefreshTokensDto): Promise<Tokens> {
        return this.authService.refreshTokens(dto);
    }
}
