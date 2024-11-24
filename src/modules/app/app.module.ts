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
@Module({
   imports: [
      LoggerModule,
      PrismaModule,
      GraphQLModule,
      StorageModule,
      AuthModule,
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
