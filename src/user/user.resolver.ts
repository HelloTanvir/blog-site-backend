import { UnauthorizedException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from '../common/decorators';
import { UpdateUserDto } from './dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    findAll(@GetCurrentUser('isAdmin') isAdmin: boolean): Promise<User[]> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.userService.findAll();
    }

    @Query(() => User)
    findOne(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Args('userId', { type: () => ID }) userId: string
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.userService.findOne(userId);
    }

    @Mutation(() => User)
    updateUser(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Args('updateUserInput') dto: UpdateUserDto
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.userService.update(dto);
    }

    @Mutation(() => User)
    removeUser(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Args('userId', { type: () => ID }) userId: string
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.userService.remove(userId);
    }
}
