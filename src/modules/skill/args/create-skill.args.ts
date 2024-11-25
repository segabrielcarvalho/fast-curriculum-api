import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateSkillInput } from '../inputs/create-skill.input';

@ArgsType()
export class CreateSkillArgs {
   @ValidateNested()
   @Type(() => CreateSkillInput)
   @Field(() => CreateSkillInput, { nullable: false })
   data!: CreateSkillInput;
}
