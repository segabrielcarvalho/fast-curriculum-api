import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserObject } from '../objects/user.object';
import { IsBase64, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput extends PickType(
   UserObject,
   ['email', 'name', 'role'] as const,
   InputType,
) {
   @IsString()
   @Field(() => String, { nullable: false })
   password!: string;

   @IsBase64()
   @IsOptional()
   @Field(() => String, { nullable: true })
   avatarInBase64?: string | null;
}
