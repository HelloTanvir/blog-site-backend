import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DeleteApiResponse,
    UploadApiErrorResponse,
    UploadApiResponse,
    // eslint-disable-next-line prettier/prettier
    v2 as cloudinarySDK
} from 'cloudinary';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class CloudinaryService {
    constructor(private config: ConfigService) {}

    async uploadFile(file: FileUpload): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const cloudinary = this.getCloudinary();

        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            if (file.createReadStream && typeof file.createReadStream === 'function') {
                file.createReadStream().pipe(upload);
            } else {
                resolve({
                    secure_url:
                        'https://cdn1.vectorstock.com/i/thumb-large/71/90/blank-avatar-photo-icon-design-vector-30257190.jpg',
                    public_id: '',
                } as UploadApiResponse);
            }
        });
    }

    async deleteFile(filePublicId: string): Promise<DeleteApiResponse> {
        const cloudinary = this.getCloudinary();

        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(filePublicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    getCloudinary() {
        cloudinarySDK.config({
            cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.config.get('CLOUDINARY_API_KEY'),
            api_secret: this.config.get('CLOUDINARY_API_SECRET'),
        });

        return cloudinarySDK;
    }
}
