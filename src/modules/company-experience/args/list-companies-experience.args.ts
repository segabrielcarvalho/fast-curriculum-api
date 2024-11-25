import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ListCompaniesExperienceInput } from '../inputs/list-companies-experience.input';

@ArgsType()
export class ListCompaniesExperienceArgs {
   @ValidateNested()
   @Type(() => ListCompaniesExperienceInput)
   @Field(() => ListCompaniesExperienceInput, { nullable: true })
   where?: ListCompaniesExperienceInput;
}
