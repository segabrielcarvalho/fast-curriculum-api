import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContactInfoResolver } from './resolver/contact-info.resolver';
import { GetContactInfoByUserIdService } from './services/get-by-userId/get-contact-info-by-userId.service';
import { UpdateContactInfoService } from './services/update/update-contact-info.service';

@Module({
   imports: [PrismaModule],
   providers: [
      ContactInfoResolver,
      UpdateContactInfoService,
      GetContactInfoByUserIdService,
   ],
})
export class ContactInfoModule {}
