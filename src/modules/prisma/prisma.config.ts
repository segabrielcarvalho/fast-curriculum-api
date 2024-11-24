import { registerAs } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export interface PrismaConfigType {
   log: Prisma.LogLevel[];
   errorFormat: Prisma.ErrorFormat;
}

const prismaConfig = registerAs('prisma', () => {
   const getEnv = (envName: string) => process.env[envName];
   const toBool = (string: string) => string === 'true';

   const log: Prisma.LogLevel[] = [];

   if (toBool(getEnv('PRISMA_LOG_ERROR') || 'false')) log.push('error');
   if (toBool(getEnv('PRISMA_LOG_WARN') || 'false')) log.push('warn');
   if (toBool(getEnv('PRISMA_LOG_INFO') || 'false')) log.push('info');
   if (toBool(getEnv('PRISMA_LOG_QUERY') || 'false')) log.push('query');

   const errorFormat = (getEnv('PRISMA_ERROR_FORMAT') ||
      'pretty') as Prisma.ErrorFormat;

   return { log, errorFormat };
});

export const prismaConfigValidation = z.object({
   PRISMA_LOG_ERROR: z
      .string()
      .optional()
      .default('false')
      .transform((val) => val === 'true'),
   PRISMA_LOG_WARN: z
      .string()
      .optional()
      .default('false')
      .transform((val) => val === 'true'),
   PRISMA_LOG_INFO: z
      .string()
      .optional()
      .default('false')
      .transform((val) => val === 'true'),
   PRISMA_LOG_QUERY: z
      .string()
      .optional()
      .default('false')
      .transform((val) => val === 'true'),
   PRISMA_ERROR_FORMAT: z
      .enum(['pretty', 'colorless', 'minimal'])
      .default('pretty'),
});

export function validatePrismaEnv(env: Record<string, unknown>) {
   try {
      prismaConfigValidation.parse(env);
   } catch (error) {
      console.error('Prisma configuration validation failed:', error);
      process.exit(1);
   }
}

export default prismaConfig;
