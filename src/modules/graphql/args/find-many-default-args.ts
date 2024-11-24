import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { FindManyDefaultInput } from '../inputs/find-many-default.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindManyDefaultArgs {
   @ValidateNested()
   @Type(() => FindManyDefaultInput)
   @Field(() => FindManyDefaultInput, { nullable: true })
   orderBy?: FindManyDefaultInput;

   @Field(() => Int, { nullable: true })
   skip?: number;

   @Field(() => Int, { nullable: true })
   take?: number;
}
