import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateContactInfoArgs } from '../../args/update-contact-info.args';

@Injectable()
export class UpdateContactInfoService {
   constructor(private readonly prisma: PrismaService) {}

   async run(args: UpdateContactInfoArgs) {
      return this.prisma.contactInfo.update(args);
   }
}
