import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FindUniqueDefaultInput } from '../inputs/find-unique-default.input';

@ArgsType()
export class FindUniqueDefaultArgs {
   @ValidateNested()
   @Type(() => FindUniqueDefaultInput)
   @Field(() => FindUniqueDefaultInput, { nullable: false })
   where!: FindUniqueDefaultInput;
}
