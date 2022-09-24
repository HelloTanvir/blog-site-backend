import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCreateDto, PostGetDto } from './dto';
import { PostService } from './post.service';
import { Post } from './schema';

@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation(() => Post)
    createPost(@Args('createPostInput') dto: PostCreateDto): Promise<Post> {
        return this.postService.create(dto);
    }

    @Query(() => [Post])
    posts(@Args('getPostInput') dto: PostGetDto): Promise<Post[]> {
        return this.postService.findAll(dto);
    }

    @Query(() => Post)
    post(@Args('postId', { type: () => ID }) postId: string): Promise<Post> {
        return this.postService.findOne(postId);
    }

    @Mutation(() => Post)
    deletePost(@Args('postId', { type: () => ID }) postId: string): Promise<Post> {
        return this.postService.delete(postId);
    }
}
