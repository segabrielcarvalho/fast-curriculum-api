import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateEducationService } from './services/create/create-education.service';
import { EducationResolver } from './resolvers/education.resolver';
import { DeleteEducationService } from './services/delete/delete-education.service';
import { ListEducationsService } from './services/list/list-educations.service';

@Module({
   imports: [PrismaModule],
   providers: [
      EducationResolver,
      CreateEducationService,
      DeleteEducationService,
      ListEducationsService,
   ],
})
export class EducationModule {}
