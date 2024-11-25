import { Module } from '@nestjs/common';
import OpenAIProvider from './providers/openAI.provider';
import { ConfigModule } from '@nestjs/config';
import openAIConfig, { validateOpenAIEnv } from './openAI.config';
import { LoggerModule } from '../logger/logger.module';

@Module({
   imports: [
      LoggerModule,
      ConfigModule.forRoot({
         cache: true,
         load: [openAIConfig],
         validate: validateOpenAIEnv,
      }),
   ],
   providers: [OpenAIProvider],
   exports: [OpenAIProvider],
})
export class OpenAIModule {}
