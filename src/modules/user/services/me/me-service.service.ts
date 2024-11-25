import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ICurrentUser } from '../../../auth/auth.types';

@Injectable()
export class MeService {
   constructor(private readonly prisma: PrismaService) {}

   async run(currentUser: ICurrentUser) {
      const userResponse = await this.prisma.user.findUnique({
         where: { id: currentUser.id },
      });
      await this.prisma.user.update({
         where: { id: currentUser.id },
         data: { lastLogin: new Date() },
      });
      return userResponse;
   }
}
