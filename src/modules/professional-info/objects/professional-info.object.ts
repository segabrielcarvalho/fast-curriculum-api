import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserObject } from '../../user/objects/user.object';
import { ContactInfoObject } from '../../contact-info/objects/contact-info.object';
import { CompanyExperienceObject } from '../../company-experience/objects/company-experience.object';
import { EducationObject } from '../../education/objects/education.object';
import { SkillObject } from '../../skill/objects/skill.object';

@ObjectType()
export class ProfessionalInfoObject {
   @IsUUID()
   @Field(() => ID, { nullable: false })
   id!: string;

   @IsDate()
   @Field(() => Date, { nullable: false })
   createdAt!: Date;

   @IsDate()
   @Field(() => Date, { nullable: false })
   updatedAt!: Date;

   @IsBoolean()
   @Field(() => Boolean, { nullable: false })
   isActive!: boolean;

   // @Field(() => [CompanyExperience], { nullable: true })
   // Companies?: Array<CompanyExperience>;

   @ValidateNested()
   @Type(() => EducationObject)
   @Field(() => [EducationObject], { nullable: true })
   Educations?: Array<EducationObject>;

   @ValidateNested()
   @Type(() => SkillObject)
   @Field(() => [SkillObject], { nullable: true })
   Skills?: Array<SkillObject>;

   // @Field(() => [Certification], { nullable: true })
   // Certifications?: Array<Certification>;

   @ValidateNested()
   @Type(() => ContactInfoObject)
   @Field(() => ContactInfoObject, { nullable: true })
   ContactInfo?: ContactInfoObject | null;

   @ValidateNested()
   @Type(() => CompanyExperienceObject)
   @Field(() => [CompanyExperienceObject], { nullable: true })
   Companies?: CompanyExperienceObject[] | null;

   @ValidateNested()
   @Type(() => UserObject)
   @Field(() => UserObject, { nullable: false })
   User?: UserObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   userId!: string;
}
