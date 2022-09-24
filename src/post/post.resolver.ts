import { UnauthorizedException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser, Public } from '../common/decorators';
import { PostCreateDto, PostGetDto } from './dto';
import { PostService } from './post.service';
import { Post } from './schema';

@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation(() => Post)
    createPost(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Args('createPostInput') dto: PostCreateDto
    ): Promise<Post> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.postService.create(dto);
    }

    @Public()
    @Query(() => [Post])
    posts(@Args('getPostInput') dto: PostGetDto): Promise<Post[]> {
        return this.postService.findAll(dto);
    }

    @Public()
    @Query(() => Post)
    post(@Args('postId', { type: () => ID }) postId: string): Promise<Post> {
        return this.postService.findOne(postId);
    }

    @Mutation(() => Post)
    deletePost(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Args('postId', { type: () => ID }) postId: string
    ): Promise<Post> {
        if (!isAdmin) {
            throw new UnauthorizedException('unauthorized');
        }

        return this.postService.delete(postId);
    }
}
