import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class PostDto {
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
}
