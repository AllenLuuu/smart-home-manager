import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname.split('.')[0];
          const extension: string = file.originalname.split('.')[1];
          cb(null, `${filename}-${Date.now()}.${extension}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
