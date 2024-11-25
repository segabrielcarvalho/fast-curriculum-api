import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DeleteCompanyExperienceService {
   constructor(private readonly prisma: PrismaService) {}

   async run(id: string) {
      const companyExperience = await this.prisma.companyExperience.findUnique({
         where: { id },
      });
      if (!companyExperience)
         throw new Error('Experiencia de empresa no encontrada');

      return this.prisma.companyExperience.delete({
         where: { id },
      });
   }
}
