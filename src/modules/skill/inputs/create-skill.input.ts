import { Field, InputType, PickType } from '@nestjs/graphql';
import { SkillObject } from '../objects/skill.object';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenericConnectIdInput } from '../../graphql/inputs/generic/generic-connect-id.input';

@InputType()
export class CreateSkillInput extends PickType(
   SkillObject,
   ['name', 'description'] as const,
   InputType,
) {
   @ValidateNested()
   @Type(() => GenericConnectIdInput)
   @Field(() => GenericConnectIdInput, { nullable: false })
   ProfessionalInfo!: GenericConnectIdInput;
}
