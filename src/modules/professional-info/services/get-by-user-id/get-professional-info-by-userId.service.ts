import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetProfessionalInfoByUserIdService {
   constructor(private readonly prisma: PrismaService) {}

   async run(userId: string) {
      const professionalInfo = await this.prisma.professionalInfo.findUnique({
         where: { userId },
      });

      if (!professionalInfo)
         throw new Error('Informações profissionais não encontradas.');

      return professionalInfo;
   }
}
