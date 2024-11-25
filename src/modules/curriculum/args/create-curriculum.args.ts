import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCurriculumInput } from '../inputs/create-curriculum.input';

@ArgsType()
export class CreateCurriculumArgs {
   @ValidateNested()
   @Type(() => CreateCurriculumInput)
   @Field(() => CreateCurriculumInput, { nullable: false })
   data!: CreateCurriculumInput;
}
