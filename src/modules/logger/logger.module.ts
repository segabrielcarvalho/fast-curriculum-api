import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';
import { ConfigModule } from '@nestjs/config';
import logConfig, { validateLogEnv } from './logger.config';

validateLogEnv(process.env);

@Module({
   imports: [
      ConfigModule.forRoot({
         cache: true,
         load: [logConfig],
      }),
   ],
   providers: [MyLogger],
   exports: [MyLogger],
})
export class LoggerModule {}
