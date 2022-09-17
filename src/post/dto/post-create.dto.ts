/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class PostCreateDto {
    @Field()
    @IsNotEmpty()
    @IsAlpha()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsAlpha()
    authorId: string;

    @Field()
    @IsNotEmpty()
    @IsAlpha()
    postCategory: string;

    @Field()
    @IsNotEmpty()
    @IsAlpha()
    body: string;

    @Field((type) => GraphQLUpload, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    image?: FileUpload;

    @Field({ nullable: true })
    caption?: string;

    @Field((type) => Boolean, { nullable: true })
    isTrending?: boolean;

    @Field((type) => Boolean, { nullable: true })
    isFeatured?: boolean;

    @Field((type) => Boolean, { nullable: true })
    isEditorPicked?: boolean;
}
