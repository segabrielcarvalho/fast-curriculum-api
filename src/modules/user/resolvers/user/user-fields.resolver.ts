import {
   Args,
   Mutation,
   Parent,
   ResolveField,
   Resolver,
   Root,
} from '@nestjs/graphql';
import { UserObject } from '../../objects/user.object';
import { PrismaService } from '../../../prisma/prisma.service';
import { AvatarObject } from '../../../avatar/objects/avatar.object';
import { GetUrlService } from '../../../storage/services/get-url.service';
import { ProfessionalInfoObject } from '../../../professional-info/objects/professional-info.object';

@Resolver(() => UserObject)
export class UserFieldsResolver {
   constructor(
      private readonly prisma: PrismaService,
      private readonly getUrl: GetUrlService,
   ) {}

   @ResolveField(() => AvatarObject)
   async Avatar(@Root() user: UserObject) {
      const avatar = await this.prisma.avatar.findUnique({
         where: { userId: user.id },
      });
      if (!avatar) return null;
      return { ...avatar, url: this.getUrl.run(avatar.path) };
   }

   @ResolveField(() => ProfessionalInfoObject)
   async ProfessionalInfo(@Root() user: UserObject) {
      return this.prisma.professionalInfo.findUnique({
         where: { userId: user.id },
      });
   }
}
