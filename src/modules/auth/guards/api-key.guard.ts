import {
   Injectable,
   CanActivate,
   ExecutionContext,
   ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
   constructor() {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.switchToHttp().getRequest();
      const apiKey = ctx.headers['x-api-key'];
      if (!apiKey) throw new ForbiddenException();

      const isValid = true;

      if (!isValid) {
         throw new ForbiddenException();
      }

      return true;
   }
}
