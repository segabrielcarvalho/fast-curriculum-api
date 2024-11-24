import { Field, ObjectType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';

@ObjectType()
export class LoginObject {
   @IsJWT()
   @Field(() => String, {
      nullable: false,
      description: 'The token of the user',
   })
   token!: string;
}
