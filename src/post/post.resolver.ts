/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCreateDto, PostFindDto } from './dto';
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
    posts(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Query((returns) => Post)
    post(@Args('findPostInput') dto: PostFindDto): Promise<Post> {
        return this.postService.findOne(dto);
    }
}
