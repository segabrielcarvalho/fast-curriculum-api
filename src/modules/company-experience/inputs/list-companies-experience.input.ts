import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { StringFilter } from '../../graphql/inputs/prisma/string-filter.input';
import { DateTimeFilter } from '../../graphql/inputs/prisma/date-time-filter.input';
import { BoolFilter } from '../../graphql/inputs/prisma/bool-filter.input';
import { GenericRelationIsIsNotFilterInput } from '../../graphql/inputs/generic/generic-relation-is-isNot-input-filter';
import { ListProfessionalInfoInput } from '../../professional-info/inputs/list-professional-info.input';

@InputType()
class ListCompaniesExperienceRelationFilter extends GenericRelationIsIsNotFilterInput(
   ListProfessionalInfoInput,
) {}

@InputType()
export class ListCompaniesExperienceInput {
   @ValidateNested()
   @Type(() => ListCompaniesExperienceInput)
   @Field(() => [ListCompaniesExperienceInput], { nullable: true })
   AND?: Array<ListCompaniesExperienceInput>;

   @ValidateNested()
   @Type(() => ListCompaniesExperienceInput)
   @Field(() => [ListCompaniesExperienceInput], { nullable: true })
   OR?: Array<ListCompaniesExperienceInput>;

   @ValidateNested()
   @Type(() => ListCompaniesExperienceInput)
   @Field(() => [ListCompaniesExperienceInput], { nullable: true })
   NOT?: Array<ListCompaniesExperienceInput>;

   @Field(() => StringFilter, { nullable: true })
   id?: StringFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   createdAt?: DateTimeFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   updatedAt?: DateTimeFilter;

   @Field(() => BoolFilter, { nullable: true })
   isActive?: BoolFilter;

   @Field(() => StringFilter, { nullable: true })
   name?: StringFilter;

   @Field(() => StringFilter, { nullable: true })
   role?: StringFilter;

   @Field(() => DateTimeFilter, { nullable: true })
   startAt?: DateTimeFilter;

   @Field(() => StringFilter, { nullable: true })
   professionalInfoId?: StringFilter;

   @ValidateNested()
   @Type(() => ListCompaniesExperienceRelationFilter)
   @Field(() => ListCompaniesExperienceRelationFilter, { nullable: true })
   ProfessionalInfo?: ListCompaniesExperienceRelationFilter;
}
