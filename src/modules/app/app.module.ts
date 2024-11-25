import { Module } from '@nestjs/common';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { LoggerModule } from '../logger/logger.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GraphQLModule } from '../graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import appConfig, { validateAppEnv } from './app.config';
import { StorageModule } from '../storage/storage.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ContactInfoModule } from '../contact-info/contact-info.module';
import { ProfessionalInfoModule } from '../professional-info/professional-info.module';
import { CompanyExperienceModule } from '../company-experience/company-experience.module';
import { EducationModule } from '../education/education.module';
import { SkillModule } from '../skill/skill.module';
import { OpenAIModule } from '../openAI/openAI.module';
import { CurriculumModule } from '../curriculum/curriculum.module';
@Module({
   imports: [
      LoggerModule,
      PrismaModule,
      GraphQLModule,
      StorageModule,
      AuthModule,
      UserModule,
      ContactInfoModule,
      ProfessionalInfoModule,
      CompanyExperienceModule,
      EducationModule,
      SkillModule,
      OpenAIModule,
      CurriculumModule,
      ConfigModule.forRoot({
         cache: true,
         load: [appConfig],
         validate: validateAppEnv,
      }),
   ],
   controllers: [AppController],
   providers: [AppService, AppResolver],
})
export class AppModule {}
