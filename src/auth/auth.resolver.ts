import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto } from './dto';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // signup
    @Mutation(() => User)
    signup(@Args('signupInput') dto: CreateUserDto): Promise<User> {
        return this.authService.signup(dto);
    }

    // login
    @Mutation(() => User)
    login(@Args('loginInput') dto: LoginDto): Promise<User> {
        return this.authService.login(dto);
    }

    // logout
    @Mutation(() => String)
    logout(@Args('logoutInput') dto: LogoutDto): Promise<string> {
        return this.authService.logout(dto);
    }

    // get-me
    @Query(() => User, { name: 'get-me' })
    getMe(@Args('id', { type: () => Int }) id: string): Promise<User> {
        return this.authService.getMe(id);
    }

    // refresh-token
    @Mutation(() => User)
    refreshToken(@Args('refreshTokenInput') dto: any): Promise<User> {
        return this.authService.refreshToken(dto);
    }
}
