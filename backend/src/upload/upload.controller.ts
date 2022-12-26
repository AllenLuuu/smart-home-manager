import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { unlinkSync } from 'fs';

@Controller('upload')
export class UploadController {
  constructor() {}

  @Post('picture')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async picture(@UploadedFile() file: any) {
    console.log(file);
    return file.path;
  }

  @Post('picture/delete')
  async deletePicture(@Body("path") path: string) {
    console.log(path);
    unlinkSync(path);
    return true;
  }
}
