import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserArgs } from '../../args/create-user.args';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { UploadAvatarService } from '../upload/upload-avatar.service';

@Injectable()
export class CreateUserService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly uploadAvatarService: UploadAvatarService,
   ) {}

   async run({ data: { password, avatarInBase64, ...rest } }: CreateUserArgs) {
      const verifyUniqueEmail = await this.prisma.user.findUnique({
         where: { email: rest.email },
      });
      if (verifyUniqueEmail) throw new Error('Email já cadastrado.');
      const encryptedPassword = await this.encryptPassword(password);
      const Avatar = await this.getAvatarInput(avatarInBase64);

      return this.prisma.user.create({
         data: {
            ...rest,
            Avatar,
            password: encryptedPassword,
            ProfessionalInfo: { create: { isActive: true } },
         },
      });
   }

   private async encryptPassword(password?: string) {
      return hash(password || faker.internet.password({ length: 8 }), 10);
   }

   private async getAvatarInput(dataInBase64?: string) {
      if (!dataInBase64) return undefined;
      const { mimetype, path } =
         await this.uploadAvatarService.run(dataInBase64);
      return { create: { mimetype, path } };
   }
}
