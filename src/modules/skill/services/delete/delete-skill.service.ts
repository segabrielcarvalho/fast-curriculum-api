import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DeleteSkillService {
   constructor(private readonly prisma: PrismaService) {}

   async run(id: string) {
      const skill = await this.prisma.skill.findUnique({
         where: { id },
      });
      if (!skill) throw new Error('Habilidade não encontrada');

      return this.prisma.skill.delete({
         where: { id },
      });
   }
}
