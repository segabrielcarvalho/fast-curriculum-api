import getApp from './app';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './modules/logger/my-logger.service';
import 'src/modules/graphql/enums';

async function bootstrap() {
   const app = await getApp();
   const configService = app.get(ConfigService);
   const port = configService.get<number>('app.port');

   app.enableCors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   });
   await app.listen(port);
   const logger = await app.resolve(MyLogger);
   const highlightedString = `\x1b[35m${await app.getUrl()}/graphql\x1b[0m`;
   const documentUrl = `\x1b[35mhttps://studio.apollographql.com/sandbox/explorer?endpoint=${await app.getUrl()}/graphql\x1b[0m`;
   logger.setContext('Main');
   logger.log(`📄 Documentação disponível em: ${documentUrl}`);
   const templateString = `🚀 Running in ${highlightedString}`;
   logger.log(templateString);
}
bootstrap();
