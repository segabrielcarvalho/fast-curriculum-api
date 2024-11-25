import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../logger/logger.module';
import { MeResolver } from './resolvers/me/me.resolver';
import { MeService } from './services/me/me-service.service';
import { UploadAvatarService } from './services/upload/upload-avatar.service';
import { StorageModule } from '../storage/storage.module';
import { CreateUserService } from './services/create/create-user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { UserFieldsResolver } from './resolvers/user/user-fields.resolver';

@Module({
   imports: [PrismaModule, LoggerModule, StorageModule],
   providers: [
      MeService,
      MeResolver,
      UploadAvatarService,
      CreateUserService,
      UserResolver,
      UserFieldsResolver,
   ],
})
export class UserModule {}
