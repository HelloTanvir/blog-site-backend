import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@ObjectType({ description: 'post' })
@Schema({ timestamps: true })
export class Post {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field((type) => ID)
    id: string;

    @Field()
    @Prop({ required: [true, 'Post title is required'] })
    title: string;

    @Field()
    @Prop({ required: [true, 'Post author id is required'] })
    authorId: string;

    @Field()
    @Prop({ required: [true, 'Post category is required'] })
    postCategory: string;

    @Field({ nullable: true })
    @Prop()
    imageUrl?: string;

    @Field({ nullable: true })
    @Prop()
    imageKey?: string;

    @Field()
    @Prop({ required: [true, 'Post body is required'] })
    body: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
