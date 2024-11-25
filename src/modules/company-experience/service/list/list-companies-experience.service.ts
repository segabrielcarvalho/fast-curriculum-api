import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ListCompaniesExperienceArgs } from '../../args/list-companies-experience.args';

@Injectable()
export class ListCompaniesExperienceService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: ListCompaniesExperienceArgs) {
      return await this.prisma.companyExperience.findMany(args);
   }
}
