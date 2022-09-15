import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PostFindDto {
    @Field()
    @IsNotEmpty()
    id: string;
}
