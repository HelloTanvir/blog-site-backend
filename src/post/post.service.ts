import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PostCreateDto, PostGetDto } from './dto';
import { Post, PostDocument } from './schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(dto: PostCreateDto): Promise<Post> {
        let image = '';
        let imagePublicId = '';

        console.log({ dto });

        if (dto.image) {
            const uploaded_file = await this.cloudinaryService.uploadFile(dto.image).catch(() => {
                throw new InternalServerErrorException('upload failed');
            });
            image = uploaded_file.secure_url;
            imagePublicId = uploaded_file.public_id;
        }

        if (image && imagePublicId) {
            (dto.image as any) = image;
            (dto as any).imagePublicId = imagePublicId;
        }

        const post = new this.postModel(dto);

        await post.save();

        return post;
    }

    async findAll(dto: PostGetDto): Promise<Post[]> {
        const conditionArr = Object.keys(dto)
            .map((key) => (dto[key] ? { [key]: dto[key] } : null))
            .filter((item) => item);

        if (conditionArr.length == 0) {
            return await this.postModel.find();
        }

        return await this.postModel.find({
            $and: conditionArr,
        });
    }

    async findOne(postId: string): Promise<Post> {
        return await this.postModel.findById(postId);
    }

    async delete(postId: string): Promise<Post> {
        const post = await this.postModel.findById(postId);

        if (!post) {
            throw new ForbiddenException('invalid id');
        }

        // remove image if any
        if (post.imagePublicId) {
            await this.cloudinaryService.deleteFile(post.imagePublicId);
        }

        await post.remove();

        return post;
    }
}
