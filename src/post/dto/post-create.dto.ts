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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field((type) => [GraphQLUpload], { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    images: FileUpload[];
}
