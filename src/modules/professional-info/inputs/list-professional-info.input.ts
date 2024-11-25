import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { StringFilter } from '../../graphql/inputs/prisma/string-filter.input';
import { DateTimeFilter } from '../../graphql/inputs/prisma/date-time-filter.input';
import { BoolFilter } from '../../graphql/inputs/prisma/bool-filter.input';

@InputType()
export class ListProfessionalInfoInput {
   @ValidateNested()
   @Type(() => ListProfessionalInfoInput)
   @Field(() => [ListProfessionalInfoInput], { nullable: true })
   AND?: Array<ListProfessionalInfoInput>;

   @ValidateNested()
   @Type(() => ListProfessionalInfoInput)
   @Field(() => [ListProfessionalInfoInput], { nullable: true })
   OR?: Array<ListProfessionalInfoInput>;

   @ValidateNested()
   @Type(() => ListProfessionalInfoInput)
   @Field(() => [ListProfessionalInfoInput], { nullable: true })
   NOT?: Array<ListProfessionalInfoInput>;

   @Field(() => StringFilter, { nullable: true })
   id?: StringFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   createdAt?: DateTimeFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   updatedAt?: DateTimeFilter;

   @Field(() => BoolFilter, { nullable: true })
   isActive?: BoolFilter;

   @Field(() => StringFilter, { nullable: true })
   userId?: StringFilter;
}
