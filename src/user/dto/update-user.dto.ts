/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UpdateUserDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @Field((type) => GraphQLUpload, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    image: FileUpload;
}
