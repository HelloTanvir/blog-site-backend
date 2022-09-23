import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(dto: CreateUserDto) {
        const user = await this.userModel.findOne({ email: dto.email });

        if (user) {
            throw new ForbiddenException('user already exists');
        }

        if (dto.image) {
            const uploaded_file = await this.cloudinaryService.uploadFile(dto.image).catch(() => {
                throw new InternalServerErrorException('upload failed');
            });
            (dto as any).image = uploaded_file.secure_url;
            (dto as any).imagePublicId = uploaded_file.public_id;
        }

        const newUser = new this.userModel(dto);

        await newUser.save();

        return newUser;
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findOne(id: string) {
        return await this.userModel.findById(id);
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async update(dto: UpdateUserDto) {
        const user = await this.userModel.findById(dto.id);

        if (!user) {
            throw new ForbiddenException('user not found');
        }

        if (dto.image) {
            // delete old image
            await this.cloudinaryService.deleteFile(user.imagePublicId);

            const uploaded_file = await this.cloudinaryService.uploadFile(dto.image).catch(() => {
                throw new InternalServerErrorException('upload failed');
            });
            (dto as any).image = uploaded_file.secure_url;
            (dto as any).imagePublicId = uploaded_file.public_id;
        }

        await this.userModel.findByIdAndUpdate(dto.id, dto);

        return await this.userModel.findById(dto.id);
    }

    async remove(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new ForbiddenException('user not found');
        }

        // delete old image
        await this.cloudinaryService.deleteFile(user.imagePublicId);

        return await this.userModel.findByIdAndDelete(id);
    }
}
