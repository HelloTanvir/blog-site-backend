/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostGetDto {
    @Field((type) => Boolean, { nullable: true })
    isTrending?: boolean;

    @Field((type) => Boolean, { nullable: true })
    isFeatured?: boolean;

    @Field((type) => Boolean, { nullable: true })
    isEditorPicked?: boolean;
}
