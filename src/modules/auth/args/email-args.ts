import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class EmailArgs {
   @Field(() => String)
   @IsEmail()
   email: string;
}
