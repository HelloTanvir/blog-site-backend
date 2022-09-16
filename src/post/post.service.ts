import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PostCreateDto, PostFindDto } from './dto';
import { Post, PostDocument } from './schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(dto: PostCreateDto): Promise<Post> {
        const images: string[] = [];
        const imagePublicIds: string[] = [];

        for (const image of dto.images) {
            const uploaded_file = await this.cloudinaryService.uploadFile(image).catch(() => {
                throw new InternalServerErrorException('upload failed');
            });
            images.push(uploaded_file.secure_url);
            imagePublicIds.push(uploaded_file.public_id);
        }

        if (images.length > 0 && imagePublicIds.length > 0) {
            (dto.images as any) = images;
            (dto as any).imagePublicIds = imagePublicIds;
        }

        const post = new this.postModel(dto);

        await post.save();

        return post;
    }

    async findAll(): Promise<Post[]> {
        return await this.postModel.find();
    }

    async findOne(dto: PostFindDto): Promise<Post> {
        return await this.postModel.findById(dto.id);
    }
}
