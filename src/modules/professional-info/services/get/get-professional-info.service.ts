import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetProfessionalInfoService {
   constructor(private readonly prisma: PrismaService) {}

   async run(id: string) {
      const professionalInfo = await this.prisma.professionalInfo.findUnique({
         where: { id },
      });

      if (!professionalInfo)
         throw new Error('Informações profissionais não encontradas.');

      return professionalInfo;
   }
}
