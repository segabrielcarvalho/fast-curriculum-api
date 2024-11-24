import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import storageConfig, { validateStorageEnv } from './storage.config';
import { GetUrlService } from './services/get-url.service';
import StorageProvider from './providers';

@Module({
   imports: [
      ConfigModule.forRoot({
         cache: true,
         load: [storageConfig],
         validate: validateStorageEnv,
      }),
   ],
   providers: [GetUrlService, StorageProvider],
   exports: [GetUrlService, StorageProvider],
})
export class StorageModule {}
