import { Field, InputType, PickType } from '@nestjs/graphql';
import { CompanyExperienceObject } from '../objects/company-experience.object';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenericConnectIdInput } from '../../graphql/inputs/generic/generic-connect-id.input';

@InputType()
export class CreateCompanyExperienceInput extends PickType(
   CompanyExperienceObject,
   ['name', 'role', 'type', 'startAt', 'endAt', 'description'] as const,
   InputType,
) {
   @ValidateNested()
   @Type(() => GenericConnectIdInput)
   @Field(() => GenericConnectIdInput, { nullable: false })
   ProfessionalInfo!: GenericConnectIdInput;
}
