import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateEducationInput } from '../input/create-education.input';

@ArgsType()
export class CreateEducationArgs {
   @ValidateNested()
   @Type(() => CreateEducationInput)
   @Field(() => CreateEducationInput, { nullable: false })
   data!: CreateEducationInput;
}
