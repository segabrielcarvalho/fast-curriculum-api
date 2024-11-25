import { Inject, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import IS3Provider from '../../../storage/providers/s3/s3.interface';

@Injectable()
export class UploadAvatarService {
   constructor(
      @Inject('StorageProvider') private readonly storage: IS3Provider,
   ) {}

   async run(dataInBase64?: string) {
      if (dataInBase64) {
         const imageResized = await sharp(Buffer.from(dataInBase64, 'base64'))
            .resize({ width: 512, height: 512, fit: 'cover' })
            .webp({ quality: 8 })
            .toBuffer();

         const path = await this.storage.saveFileFromBuffer(imageResized);
         return { mimetype: 'image/webp', path };
      }
      return;
   }
}
