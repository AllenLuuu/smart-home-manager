import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const history = require('connect-history-api-fallback');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('SmartHome'));
  app.use(history());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'build'));
  await app.listen(3001);
}
bootstrap();
