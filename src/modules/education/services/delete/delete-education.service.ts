import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DeleteEducationService {
   constructor(private readonly prisma: PrismaService) {}

   async run(id: string) {
      const education = await this.prisma.education.findUnique({
         where: { id },
      });
      if (!education) throw new Error('Educação não encontrada');

      return this.prisma.education.delete({
         where: { id },
      });
   }
}
