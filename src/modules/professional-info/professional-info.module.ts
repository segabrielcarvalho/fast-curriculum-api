import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GetProfessionalInfoService } from './services/get/get-professional-info.service';
import { ProfessionalInfoResolver } from './resolver/professional-info.resolver';
import { GetProfessionalInfoByUserIdService } from './services/get-by-user-id/get-professional-info-by-userId.service';
import { ProfessionalInfoFieldsResolver } from './resolver/professional-info-fields.resolver';

@Module({
   imports: [PrismaModule],
   providers: [
      ProfessionalInfoResolver,
      ProfessionalInfoFieldsResolver,
      GetProfessionalInfoService,
      GetProfessionalInfoByUserIdService,
   ],
})
export class ProfessionalInfoModule {}
