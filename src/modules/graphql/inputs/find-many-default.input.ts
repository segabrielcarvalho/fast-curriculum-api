import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../enums';

@InputType()
export class FindManyDefaultInput {
   @Field(() => SortOrder, { nullable: true })
   createdAt?: keyof typeof SortOrder;

   @Field(() => SortOrder, { nullable: true })
   updatedAt?: keyof typeof SortOrder;
}
