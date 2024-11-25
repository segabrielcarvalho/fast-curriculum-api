import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ListEducationsInput } from '../input/list-educations.input';

@ArgsType()
export class ListEducationsArgs {
   @ValidateNested()
   @Type(() => ListEducationsInput)
   @Field(() => ListEducationsInput, { nullable: true })
   where?: ListEducationsInput;
}
