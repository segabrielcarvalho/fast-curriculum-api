import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { MyLogger } from './modules/logger/my-logger.service';
import helmet from 'helmet';
import * as moment from 'moment';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

moment.locale('pt-br');
moment.updateLocale('pt-br', {
   relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos',
   },
});

async function getApp() {
   const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      cors: true,
   });

   const logger = await app.resolve(MyLogger);
   app.useLogger(logger);
   app.use(helmet());

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         transformOptions: {
            enableImplicitConversion: true,
            enableCircularCheck: true,
         },
      }),
   );

   app.use(cookieParser());
   app.use(express.json({ limit: '15mb' }));
   app.use(express.urlencoded({ limit: '15mb', extended: true }));
   app.setGlobalPrefix('api');

   const prismaService = app.get(PrismaService);
   await prismaService.$connect();
   app.enableShutdownHooks();

   return app;
}

export default getApp;
