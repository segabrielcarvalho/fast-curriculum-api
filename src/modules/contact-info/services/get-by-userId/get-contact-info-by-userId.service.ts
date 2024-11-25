import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetContactInfoByUserIdService {
   constructor(private readonly prisma: PrismaService) {}

   async run(userId: string) {
      const contactInfo = await this.prisma.contactInfo.findFirst({
         where: { ProfessionalInfo: { userId } },
      });

      if (!contactInfo)
         throw new Error('Informações de contato não encontradas.');

      return contactInfo;
   }
}
