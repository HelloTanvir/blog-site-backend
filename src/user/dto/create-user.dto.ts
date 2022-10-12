/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateUserDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;

    @Field((type) => GraphQLUpload)
    @IsOptional()
    @IsNotEmpty()
    image: Promise<FileUpload>;
}
