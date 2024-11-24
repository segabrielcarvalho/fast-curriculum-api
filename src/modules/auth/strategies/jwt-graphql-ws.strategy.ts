import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigType } from '@nestjs/config';
import authConfig from '../auth.config';
import type { ICurrentUser } from '../auth.types';

@Injectable()
export class JwtStrategyWs extends PassportStrategy(
   Strategy,
   'jwt-graphql-ws',
) {
   constructor(
      private prisma: PrismaService,
      @Inject(authConfig.KEY)
      config: ConfigType<typeof authConfig>,
   ) {
      super({
         jwtFromRequest: (context: any): null | string => {
            const bearer =
               context?.connectionParams?.Authorization?.split(' ').pop();
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
