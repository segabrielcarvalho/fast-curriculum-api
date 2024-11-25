import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateSkillService } from './services/create/create-skill.service';
import { DeleteSkillService } from './services/delete/delete-skill.service';
import { SkillResolver } from './resolvers/skill.resolver';

@Module({
   imports: [PrismaModule],
   providers: [CreateSkillService, DeleteSkillService, SkillResolver],
})
export class SkillModule {}
