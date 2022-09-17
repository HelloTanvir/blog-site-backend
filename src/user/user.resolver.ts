import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') dto: CreateUserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Query(() => [User], { name: 'user' })
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id', { type: () => Int }) id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') dto: UpdateUserDto): Promise<User> {
        return this.userService.update(dto);
    }

    @Mutation(() => User)
    removeUser(@Args('id', { type: () => Int }) id: string): Promise<User> {
        return this.userService.remove(id);
    }
}
