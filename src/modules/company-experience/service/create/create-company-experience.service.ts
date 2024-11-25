import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCompanyExperienceArgs } from '../../args/create-company-experience.args';

@Injectable()
export class CreateCompanyExperienceService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: CreateCompanyExperienceArgs) {
      const professionalInfo = await this.prisma.professionalInfo.findUnique({
         where: { id: args.data.ProfessionalInfo.connect.id },
      });
      if (!professionalInfo)
         throw new Error('Informações profissionais não encontradas');

      return this.prisma.companyExperience.create(args);
   }
}
