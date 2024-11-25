import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateCompanyExperienceService } from './service/create/create-company-experience.service';
import { CompanyExperienceResolver } from './resolver/company-experience.resolver';
import { DeleteCompanyExperienceService } from './service/delete/delete-company-experience.service';
import { ListCompaniesExperienceService } from './service/list/list-companies-experience.service';

@Module({
   imports: [PrismaModule],
   providers: [
      CreateCompanyExperienceService,
      CompanyExperienceResolver,
      DeleteCompanyExperienceService,
      ListCompaniesExperienceService,
   ],
})
export class CompanyExperienceModule {}
