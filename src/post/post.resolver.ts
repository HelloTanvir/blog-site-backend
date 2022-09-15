/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostDto } from './dto';
import { PostService } from './post.service';
import { Post } from './schema';

@Resolver((of) => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation((returns) => Post)
    createPost(@Args('createPostInput') dto: PostDto): Promise<Post> {
        return this.postService.create(dto);
    }

    @Query((returns) => [Post])
    posts(): Promise<Post[]> {
        return this.postService.findAll();
    }
}
