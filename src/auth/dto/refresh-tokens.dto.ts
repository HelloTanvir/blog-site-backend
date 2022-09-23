import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RefreshTokensDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field((type) => ID)
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
