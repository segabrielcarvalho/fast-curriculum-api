import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DateTimeFilter } from '../../graphql/inputs/prisma/date-time-filter.input';
import { BoolFilter } from '../../graphql/inputs/prisma/bool-filter.input';
import { StringFilter } from '../../graphql/inputs/prisma/string-filter.input';
import { GenericRelationIsIsNotFilterInput } from '../../graphql/inputs/generic/generic-relation-is-isNot-input-filter';
import { ListProfessionalInfoInput } from '../../professional-info/inputs/list-professional-info.input';

@InputType()
class ListEducationsRelationFilter extends GenericRelationIsIsNotFilterInput(
   ListProfessionalInfoInput,
) {}

@InputType()
export class ListEducationsInput {
   @ValidateNested()
   @Type(() => ListEducationsInput)
   @Field(() => [ListEducationsInput], { nullable: true })
   AND?: Array<ListEducationsInput>;

   @ValidateNested()
   @Type(() => ListEducationsInput)
   @Field(() => [ListEducationsInput], { nullable: true })
   OR?: Array<ListEducationsInput>;

   @ValidateNested()
   @Type(() => ListEducationsInput)
   @Field(() => [ListEducationsInput], { nullable: true })
   NOT?: Array<ListEducationsInput>;

   @Field(() => String, { nullable: true })
   id?: string;

   @Field(() => DateTimeFilter, { nullable: true })
   createdAt?: DateTimeFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   updatedAt?: DateTimeFilter;

   @Field(() => BoolFilter, { nullable: true })
   isActive?: BoolFilter;

   @Field(() => StringFilter, { nullable: true })
   institution?: StringFilter;

   @Field(() => StringFilter, { nullable: true })
   degree?: StringFilter;

   @Field(() => StringFilter, { nullable: true })
   studyArea?: StringFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   startAt?: DateTimeFilter;

   @Field(() => StringFilter, { nullable: true })
   professionalInfoId?: StringFilter;

   @ValidateNested()
   @Type(() => ListEducationsRelationFilter)
   @Field(() => ListEducationsRelationFilter, { nullable: true })
   ProfessionalInfo?: ListEducationsRelationFilter;
}
