import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType({ description: 'user' })
@Schema({ timestamps: true })
export class User {
    @Field(() => ID)
    id: string;

    @Field(() => Boolean)
    @Prop({ default: false })
    isAdmin: boolean;

    @Field()
    @Prop({
        required: [true, 'User name is required'],
    })
    name: string;

    @Field()
    @Prop({
        required: [true, 'User email is required'],
    })
    email: string;

    @Field()
    @Prop({
        required: [true, 'User password is required'],
    })
    password: string;

    @Field()
    @Prop({ required: [true, 'User image is required'] })
    image: string;

    @Prop({ required: [true, 'User image public id is required'] })
    imagePublicId: string;

    @Prop({ default: null })
    refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
