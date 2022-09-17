/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class PostGetDto {
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
