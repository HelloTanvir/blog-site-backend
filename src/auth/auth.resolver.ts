import { UnauthorizedException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser, Public } from '../common/decorators';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokensDto } from './dto';
import { Tokens } from './types';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Mutation(() => User)
    signup(@Args('signupInput') dto: CreateUserDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Public()
    @Mutation(() => User)
    login(@Args('loginInput') dto: LoginDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    @Mutation(() => String)
    logout(@GetCurrentUser('userId') userId: string): Promise<string> {
        return this.authService.logout(userId);
    }

    @Query(() => User)
    getMe(
        @GetCurrentUser('userId') id: string,
        @Args('userId', { type: () => ID }) userId: string
    ): Promise<User> {
        if (id !== userId) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.authService.getMe(userId);
    }

    @Mutation(() => User)
    refreshTokens(
        @GetCurrentUser('userId') id: string,
        @Args('refreshTokensInput') dto: RefreshTokensDto
    ): Promise<Tokens> {
        if (id !== dto.userId) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.authService.refreshTokens(dto);
    }
}
