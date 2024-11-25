import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfessionalInfoObject } from '../objects/professional-info.object';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactInfoObject } from '../../contact-info/objects/contact-info.object';
import { CompanyExperienceObject } from '../../company-experience/objects/company-experience.object';
import { EducationObject } from '../../education/objects/education.object';
import { SkillObject } from '../../skill/objects/skill.object';

@Resolver(() => ProfessionalInfoObject)
export class ProfessionalInfoFieldsResolver {
   constructor(private readonly prisma: PrismaService) {}

   @ResolveField(() => ContactInfoObject)
   async ContactInfo(@Parent() professionalInfo: ProfessionalInfoObject) {
      return this.prisma.contactInfo.findUnique({
         where: { professionalInfoId: professionalInfo.id },
      });
   }

   @ResolveField(() => [CompanyExperienceObject])
   async Companies(@Parent() professionalInfo: ProfessionalInfoObject) {
      return this.prisma.companyExperience.findMany({
         where: { professionalInfoId: professionalInfo.id },
      });
   }

   @ResolveField(() => [EducationObject])
   async Educations(@Parent() professionalInfo: ProfessionalInfoObject) {
      return this.prisma.education.findMany({
         where: { professionalInfoId: professionalInfo.id },
      });
   }

   @ResolveField(() => [SkillObject])
   async Skills(@Parent() professionalInfo: ProfessionalInfoObject) {
      return this.prisma.skill.findMany({
         where: { professionalInfoId: professionalInfo.id },
      });
   }
}
