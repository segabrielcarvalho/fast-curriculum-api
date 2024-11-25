import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEducationArgs } from '../../args/create-education.args';

@Injectable()
export class CreateEducationService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: CreateEducationArgs) {
      const professionalInfo = await this.prisma.professionalInfo.findUnique({
         where: { id: args.data.ProfessionalInfo.connect.id },
      });
      if (!professionalInfo)
         throw new Error('Informações profissionais não encontradas');

      return this.prisma.education.create(args);
   }
}
