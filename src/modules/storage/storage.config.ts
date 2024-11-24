import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export enum StorageEnvironmentEnum {
   local = 'local',
   cloud = 'cloud',
}

interface StorageConfig {
   environment: keyof typeof StorageEnvironmentEnum;
   storage: {
      bucket: string;
      region: string;
      cloudFrontUrl: string;
      getEndpoint: string;
      credentials: {
         accessKeyId: string;
         secretAccessKey: string;
      };
      endpoint: string;
   };
}

const storageConfig = registerAs('storage', () => {
   const environment = process.env.STORAGE_ENVIRONMENT;
   const cloudFrontUrl = process.env.STORAGE_URL;
   const endpoint = process.env.STORAGE_ENDPOINT;
   const getEndpoint = process.env.STORAGE_GET_ENDPOINT;
   const bucket = process.env.STORAGE_BUCKET;
   const region = process.env.STORAGE_REGION;
   const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
   const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;

   return {
      environment,
      storage: {
         bucket,
         region,
         cloudFrontUrl,
         getEndpoint,
         credentials: { accessKeyId, secretAccessKey },
         endpoint,
      },
   } as StorageConfig;
});

export const storageConfigValidation = z
   .object({
      STORAGE_ENVIRONMENT: z.enum(['local', 'cloud']).default('local'),
      STORAGE_BUCKET: z.string().default('fast-curriculum'),
      STORAGE_ENDPOINT: z.string().url().default('http://localhost:4566'),
      STORAGE_ACCESS_KEY_ID: z.string().optional(),
      STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
      STORAGE_REGION: z.string().optional(),
   })
   .refine(
      (data) =>
         data.STORAGE_ENVIRONMENT === 'local' ||
         (data.STORAGE_ENVIRONMENT === 'cloud' &&
            data.STORAGE_ACCESS_KEY_ID &&
            data.STORAGE_SECRET_ACCESS_KEY &&
            data.STORAGE_REGION),
      {
         message:
            'For cloud storage, STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY, and STORAGE_REGION are required.',
      },
   );

export function validateStorageEnv(env: Record<string, unknown>) {
   try {
      return storageConfigValidation.parse(env);
   } catch (error) {
      console.error('Storage configuration validation failed:', error);
      throw error;
   }
}

export default storageConfig;
