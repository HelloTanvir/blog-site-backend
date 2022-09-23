import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto, RefreshTokensDto } from './dto';
import { Tokens } from './types';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // signup
    @Mutation(() => User)
    signup(@Args('signupInput') dto: CreateUserDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    // login
    @Mutation(() => User)
    login(@Args('loginInput') dto: LoginDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    // logout
    @Mutation(() => String)
    logout(@Args('logoutInput') dto: LogoutDto): Promise<string> {
        return this.authService.logout(dto);
    }

    // get-me
    @Query(() => User)
    getMe(@Args('id', { type: () => ID }) id: string): Promise<User> {
        return this.authService.getMe(id);
    }

    // refresh-token
    @Mutation(() => User)
    refreshTokens(@Args('refreshTokensInput') dto: RefreshTokensDto): Promise<Tokens> {
        return this.authService.refreshTokens(dto);
    }
}
