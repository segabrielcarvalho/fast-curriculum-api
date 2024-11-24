import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const authConfig = registerAs('auth', () => {
   const secret = process.env.JWT_SECRET as string;
   const expiresIn = process.env.JWT_EXPIRES_IN as string;
   return {
      secret,
      signOptions: { expiresIn },
   };
});

export const authConfigValidation = z.object({
   JWT_SECRET: z.string().default('dev-jwt-secret'),
   JWT_EXPIRES_IN: z.string().default('30d'),
});

export function validateAuthEnv(env: Record<string, unknown>) {
   try {
      return authConfigValidation.parse(env);
   } catch (error) {
      console.error('Auth configuration validation failed:', error);
      throw error;
   }
}

export default authConfig;
