import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCompanyExperienceInput } from '../inputs/create-company-experience.input';

@ArgsType()
export class CreateCompanyExperienceArgs {
   @ValidateNested()
   @Type(() => CreateCompanyExperienceInput)
   @Field(() => CreateCompanyExperienceInput, { nullable: false })
   data!: CreateCompanyExperienceInput;
}
