import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class HasPermissionsArgs {
   @Field(() => String, { nullable: false })
   userId!: string;

   @Field(() => String, { nullable: false })
   moduleCode!: string;

   @Field(() => String, { nullable: false })
   action!: string;
}
