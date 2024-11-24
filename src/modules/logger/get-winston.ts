import { createLogger, format, transports, Logger } from 'winston';
import Logsene from 'winston-logsene';
import logConfig from './logger.config';
import { ConfigType } from '@nestjs/config';

const LOG_DIR = 'logs';

const getWinston = (config: ConfigType<typeof logConfig>): Logger => {
   const { combine, timestamp, printf, metadata } = format;

   const messageFormat = printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
   });

   const createFileTransport = (level: string, filename: string) =>
      new transports.File({
         level,
         filename: `${filename}.log`,
         dirname: LOG_DIR,
         maxFiles: 1,
         maxsize: 4 * 1024 * 1024,
         format: combine(timestamp(), messageFormat),
      });

   const logger = createLogger({
      level: 'info',
      format: combine(timestamp(), messageFormat),
   });

   if (config.file.enable) {
      ['error', 'warn', 'info'].forEach((level) =>
         logger.add(createFileTransport(level, level)),
      );
   }

   if (config.logSene.enable) {
      logger.add(
         new Logsene({
            token: config.logSene.token,
            format: combine(timestamp(), metadata()),
         }),
      );
   }

   return logger;
};

export default getWinston;
