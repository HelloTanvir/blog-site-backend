import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
        return this.authService.create(createAuthInput);
    }

    @Query(() => [User], { name: 'auth' })
    findAll() {
        return this.authService.findAll();
    }

    @Query(() => User, { name: 'auth' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.authService.findOne(id);
    }

    @Mutation(() => User)
    updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
        return this.authService.update(updateAuthInput.id, updateAuthInput);
    }

    @Mutation(() => User)
    removeAuth(@Args('id', { type: () => Int }) id: number) {
        return this.authService.remove(id);
    }
}
