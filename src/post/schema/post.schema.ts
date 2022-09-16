/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@ObjectType({ description: 'post' })
@Schema({ timestamps: true })
export class Post {
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

    @Field((type) => [String], { nullable: true })
    @Prop()
    images?: string[];

    @Field((type) => [String], { nullable: true })
    @Prop()
    imageKeys?: string[];

    @Field()
    @Prop({ required: [true, 'Post body is required'] })
    body: string;

    @Field({ nullable: true })
    @Prop()
    caption?: string;

    @Field((type) => Boolean, { nullable: true })
    @Prop({ default: false })
    isTrending?: boolean;

    @Field((type) => Boolean, { nullable: true })
    @Prop({ default: false })
    isFeatured?: boolean;

    @Field((type) => Boolean, { nullable: true })
    @Prop({ default: false })
    isEditorPicked?: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
