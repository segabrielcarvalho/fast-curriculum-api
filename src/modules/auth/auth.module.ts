import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt-graphql.strategy';
import { LoginService } from './services/login/login.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig, { validateAuthEnv } from './auth.config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggerModule } from '../logger/logger.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategyWs } from './strategies/jwt-graphql-ws.strategy';

@Module({
   imports: [
      LoggerModule,
      PrismaModule,
      PassportModule,
      ConfigModule.forRoot({
         cache: true,
         load: [authConfig],
         validate: validateAuthEnv,
      }),
      // https://github.com/nestjs/jwt/blob/master/README.md
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) =>
            configService.get('auth'),
         inject: [ConfigService],
      }),
   ],
   providers: [
      { provide: 'APP_GUARD', useClass: JwtAuthGuard },
      LoginService,
      JwtStrategy,
      JwtStrategyWs,
      AuthResolver,
   ],
   exports: [LoginService],
})
export class AuthModule {}
