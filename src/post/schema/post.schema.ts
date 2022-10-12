/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@ObjectType({ description: 'post' })
@Schema({ timestamps: true })
export class Post {
    @Field((type) => ID)
    _id: string;

    @Field()
    @Prop({
        required: [true, 'Post title is required'],
    })
    title: string;

    @Field()
    @Prop({ required: [true, 'Post author id is required'] })
    authorId: string;

    @Field()
    @Prop({ required: [true, 'Post author name is required'] })
    authorName: string;

    @Field()
    @Prop({ required: [true, 'Post category is required'] })
    postCategory: string;

    @Field((type) => String, { nullable: true })
    @Prop({
        default:
            'https://preview.colorlib.com/theme/meranda/images/xbig_img_1.jpg.pagespeed.ic.K2N7KNYATl.webp',
    })
    image: string;

    @Prop()
    imagePublicId: string;

    @Field()
    @Prop({ required: [true, 'Post body is required'] })
    body: string;

    @Field({ nullable: true })
    @Prop()
    caption: string;

    @Field((type) => Boolean, { defaultValue: false })
    @Prop({ default: false })
    isTrending: boolean;

    @Field((type) => Boolean, { defaultValue: false })
    @Prop({ default: false })
    isFeatured: boolean;

    @Field((type) => Boolean, { defaultValue: false })
    @Prop({ default: false })
    isEditorPicked: boolean;

    @Field()
    createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
