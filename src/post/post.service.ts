import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

    async findAll(): Promise<Post[]> {
        return await this.postModel.find();
    }
}
