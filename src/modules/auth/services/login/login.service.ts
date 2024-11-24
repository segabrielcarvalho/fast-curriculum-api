import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { MyLogger } from '../../../logger/my-logger.service';
import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
   constructor(message: string) {
      super(message, HttpStatus.UNAUTHORIZED);
   }
}

interface LoginInput {
   email: string;
   password: string;
}

@Injectable()
export class LoginService {
   constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private readonly logger: MyLogger,
   ) {}

   async run({ email, password }: LoginInput) {
      email = email.toLowerCase();
      const failureMessage = 'Usuário ou senha inválidos';
      const user = await this.prisma.user.findUnique({
         where: { email },
         select: { id: true, password: true, isActive: true },
      });

      if (!user) {
         this.logger.error(`Login failed for email ${email}: User not found`);
         throw new LoginFailedException(failureMessage);
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
         this.logger.error(`Login failed for email ${email}: Invalid password`);
         throw new LoginFailedException(failureMessage);
      }

      if (!user.isActive) {
         this.logger.error(`Login failed for email ${email}: User is inactive`);
         throw new LoginFailedException('Usuário desativado!');
      }

      await this.prisma.user.update({
         where: { id: user.id },
         data: { lastLogin: new Date() },
      });

      this.logger.log(`User ${email} logged in successfully`);

      return { token: this.jwtService.sign({ sub: user.id }) };
   }
}
