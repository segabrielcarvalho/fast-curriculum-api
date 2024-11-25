import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSkillArgs } from '../../args/create-skill.args';

@Injectable()
export class CreateSkillService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: CreateSkillArgs) {
      const professionalInfo = await this.prisma.professionalInfo.findUnique({
         where: { id: args.data.ProfessionalInfo.connect.id },
      });
      if (!professionalInfo)
         throw new Error('Informações profissionais não encontradas');

      return this.prisma.skill.create(args);
   }
}
