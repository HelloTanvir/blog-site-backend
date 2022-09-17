/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import {
    IsAlpha,
    IsAlphanumeric,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    // eslint-disable-next-line prettier/prettier
    IsString
} from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class PostCreateDto {
    @Field()
    @IsNotEmpty()
    @IsAlpha()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsAlphanumeric()
    authorId: string;

    @Field()
    @IsNotEmpty()
    @IsAlpha()
    postCategory: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    body: string;

    @Field((type) => GraphQLUpload, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    image: FileUpload;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    caption: string;

    @Field((type) => Boolean, { defaultValue: false })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isTrending: boolean;

    @Field((type) => Boolean, { defaultValue: false })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

    @Field((type) => Boolean, { defaultValue: false })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isEditorPicked: boolean;
}
