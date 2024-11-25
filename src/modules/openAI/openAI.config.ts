import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const openAIConfig = registerAs('openai', () => {
   const getEnv = (envName: string) => process.env[envName];

   return {
      apiKey: getEnv('OPENAI_API_KEY'),
      organization: getEnv('OPENAI_ORGANIZATION'),
      apiBaseUrl: getEnv('OPENAI_API_BASE_URL') || 'https://api.openai.com/v1',
   };
});

export const openAIConfigValidation = z.object({
   OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY é obrigatório'),
   OPENAI_ORGANIZATION: z.string().optional(),
   OPENAI_API_BASE_URL: z.string().url().optional(),
   OPENAI_TIMEOUT: z
      .string()
      .regex(/^\d+$/, 'OPENAI_TIMEOUT deve ser um número válido')
      .optional(),
});

export function validateOpenAIEnv(env: Record<string, unknown>) {
   try {
      return openAIConfigValidation.parse(env);
   } catch (error) {
      console.error('OpenAI configuration validation failed:', error);
      throw error;
   }
}

export default openAIConfig;
