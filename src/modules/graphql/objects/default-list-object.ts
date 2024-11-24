import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DefaultListObject {
   @Field(() => Number)
   count: number;

   rows: unknown[];
}
