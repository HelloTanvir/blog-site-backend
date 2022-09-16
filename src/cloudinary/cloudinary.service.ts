import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinarySDK } from 'cloudinary';
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

            file.createReadStream().pipe(upload);
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
