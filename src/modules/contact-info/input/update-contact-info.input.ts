import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { ContactInfoObject } from '../objects/contact-info.object';

@InputType()
export class UpdateContactInfoInput extends PartialType(
   PickType(
      ContactInfoObject,
      [
         'address',
         'city',
         'country',
         'github',
         'linkedin',
         'phone',
         'state',
         'website',
         'zipCode',
      ] as const,
      InputType,
   ),
) {}
