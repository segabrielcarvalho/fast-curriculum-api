import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
   @Field(() => String, {
      nullable: false,
      description: 'The username of the user',
   })
   email!: string;

   @Field(() => String, {
      nullable: false,
      description: 'The password of the user',
   })
   password!: string;
}
