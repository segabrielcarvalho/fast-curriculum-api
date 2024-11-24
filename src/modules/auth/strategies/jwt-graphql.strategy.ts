import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { ICurrentUser } from '../auth.types';
import { ConfigType } from '@nestjs/config';
import authConfig from '../auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-graphql') {
   constructor(
      private readonly prisma: PrismaService,
      @Inject(authConfig.KEY)
      config: ConfigType<typeof authConfig>,
   ) {
      super({
         jwtFromRequest: (context: any): null | string => {
            const bearer = context?.headers?.authorization?.split(' ').pop();
            return bearer;
         },
         secretOrKey: config.secret,
      });
   }

   async validate(payload: any): Promise<ICurrentUser | false> {
      const user = await this.prisma.user.findUnique({
         where: { id: payload.sub },
      });
      if (!user) return false;
      return user;
   }
}
