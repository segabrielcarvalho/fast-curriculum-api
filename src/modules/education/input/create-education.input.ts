import { Field, InputType, PickType } from '@nestjs/graphql';
import { EducationObject } from '../objects/education.object';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenericConnectIdInput } from '../../graphql/inputs/generic/generic-connect-id.input';

@InputType()
export class CreateEducationInput extends PickType(
   EducationObject,
   ['institution', 'degree', 'studyArea', 'startAt', 'endAt'] as const,
   InputType,
) {
   @ValidateNested()
   @Type(() => GenericConnectIdInput)
   @Field(() => GenericConnectIdInput, { nullable: false })
   ProfessionalInfo!: GenericConnectIdInput;
}
