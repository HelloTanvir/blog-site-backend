import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './dto';
import { Post, PostDocument } from './schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

    async create(dto: PostDto): Promise<Post> {
        const post = new this.postModel(dto);

        await post.save();

        return post;
    }

    async findAll(): Promise<Post[]> {
        return await this.postModel.find();
    }
}
