import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DefaultUpdateInput } from '../inputs/default-update-input';

@ArgsType()
export class DefaultUpdateArgs {
   @ValidateNested()
   @Type(() => DefaultUpdateInput)
   @Field(() => DefaultUpdateInput, { nullable: false })
   where!: DefaultUpdateInput;
}
