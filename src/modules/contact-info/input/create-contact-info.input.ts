import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { UpdateContactInfoInput } from './update-contact-info.input';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenericConnectIdInput } from '../../graphql/inputs/generic/generic-connect-id.input';

@InputType()
export class CreateContactInfoInput extends PartialType(
   PickType(UpdateContactInfoInput, [
      'address',
      'city',
      'country',
      'github',
      'linkedin',
      'phone',
      'state',
      'website',
      'zipCode',
   ] as const),
) {
   @ValidateNested()
   @Type(() => GenericConnectIdInput)
   @Field(() => GenericConnectIdInput, { nullable: false })
   ProfessionalInfo: GenericConnectIdInput;
}
