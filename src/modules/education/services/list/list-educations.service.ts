import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ListEducationsArgs } from '../../args/list-educations.args';

@Injectable()
export class ListEducationsService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: ListEducationsArgs) {
      return this.prisma.education.findMany(args);
   }
}
