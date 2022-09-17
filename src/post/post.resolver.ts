/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCreateDto, PostGetDto } from './dto';
import { PostService } from './post.service';
import { Post } from './schema';

@Resolver((of) => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation((returns) => Post)
    createPost(@Args('createPostInput') dto: PostCreateDto): Promise<Post> {
        return this.postService.create(dto);
    }

    @Query((returns) => [Post])
    posts(@Args({ name: 'getPostInput', nullable: true }) dto: PostGetDto): Promise<Post[]> {
        return this.postService.findAll(dto);
    }

    @Query((returns) => Post)
    post(@Args({ name: 'id', type: () => ID }) postId: string): Promise<Post> {
        return this.postService.findOne(postId);
    }

    @Mutation((returns) => Post)
    deletePost(@Args({ name: 'id', type: () => ID }) postId: string): Promise<Post> {
        return this.postService.delete(postId);
    }
}
