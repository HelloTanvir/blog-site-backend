/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './schema';

@Resolver((of) => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Query((returns) => [Post])
    posts(): Promise<Post[]> {
        return this.postService.findAll();
    }
}
