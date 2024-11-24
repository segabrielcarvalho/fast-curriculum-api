import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import prismaConfig, { validatePrismaEnv } from './prisma.config';

validatePrismaEnv(process.env);

@Module({
   imports: [
      ConfigModule.forRoot({
         cache: true,
         load: [prismaConfig],
      }),
   ],
   providers: [PrismaService],
   exports: [PrismaService],
})
export class PrismaModule {}
