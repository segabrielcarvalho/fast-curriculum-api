import { Module } from '@nestjs/common';
import { OpenAIModule } from '../openAI/openAI.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateCurriculumService } from './service/create/create-curriculum.service';
import { CurriculumResolver } from './resolvers/curriculum.resolver';

@Module({
   imports: [OpenAIModule, PrismaModule],
   providers: [CreateCurriculumService, CurriculumResolver],
})
export class CurriculumModule {}
