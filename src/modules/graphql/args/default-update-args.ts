import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DefaultWhereInput } from '../inputs/default-update-input';

@ArgsType()
export class DefaultWhereArgs {
   @ValidateNested()
   @Type(() => DefaultWhereInput)
   @Field(() => DefaultWhereInput, { nullable: false })
   where!: DefaultWhereInput;
}
