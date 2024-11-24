import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import S3Provider from './s3/s3.provider';
import storageConfig from '../storage.config';

const StorageProvider: Provider = {
   provide: 'StorageProvider',
   inject: [ConfigService],
   useFactory: async (configService: ConfigService) => {
      const config =
         configService.get<ReturnType<typeof storageConfig>>('storage');

      if (!config) throw new Error('Storage configuration is undefined');

      return new S3Provider(config);
   },
};

export default StorageProvider;
