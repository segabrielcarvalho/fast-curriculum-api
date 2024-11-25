import { ArgsType, Field } from '@nestjs/graphql';
import { DefaultWhereArgs } from '../../graphql/args/default-update-args';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContactInfoInput } from '../input/create-contact-info.input';
import { UpdateContactInfoInput } from '../input/update-contact-info.input';

@ArgsType()
export class UpdateContactInfoArgs extends DefaultWhereArgs {
   @ValidateNested()
   @Type(() => UpdateContactInfoInput)
   @Field(() => UpdateContactInfoInput, { nullable: false })
   data!: UpdateContactInfoInput;
}
