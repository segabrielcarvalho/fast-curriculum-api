import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FindUniqueDefaultInput {
   @IsUUID()
   @Field(() => ID, { nullable: false })
   id!: string;
}
