import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserDto } from './dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(() => User)
    findOne(@Args('userId', { type: () => ID }) userId: string): Promise<User> {
        return this.userService.findOne(userId);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') dto: UpdateUserDto): Promise<User> {
        return this.userService.update(dto);
    }

    @Mutation(() => User)
    removeUser(@Args('userId', { type: () => ID }) userId: string): Promise<User> {
        return this.userService.remove(userId);
    }
}
