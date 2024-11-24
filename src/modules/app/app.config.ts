import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export const environmentEnum = {
   development: 'development',
   production: 'production',
   test: 'test',
} as const;

export type EnvironmentEnum =
   (typeof environmentEnum)[keyof typeof environmentEnum];

const appConfig = registerAs('app', () => {
   const port = parseInt(process.env.PORT, 10) || 3000;
   const environment = process.env.NODE_ENV as keyof typeof environmentEnum;
   const baseApiUrl = process.env.BASE_API_URL || '';
   const baseWebUrl = process.env.BASE_WEB_URL || '';

   return { port, environment, baseApiUrl, baseWebUrl };
});

export const appConfigValidation = z.object({
   PORT: z.preprocess(
      (port) => parseInt(port as string, 10),
      z.number().default(3000),
   ),
   BASE_API_URL: z.string().url().optional(),
   BASE_WEB_URL: z.string().url().optional(),
   NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
});

export function validateAppEnv(env: Record<string, unknown>) {
   try {
      return appConfigValidation.parse(env);
   } catch (error) {
      console.error('Config validation error:', error);
      throw error;
   }
}

export default appConfig;
