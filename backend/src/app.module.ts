import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './dbconfig';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WrongRequestExceptionFilter } from './wrong-request-exception.filter';
import { ReturnInterceptor } from './return.interceptor';
import { SiteModule } from './site/site.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ MongooseModule.forRoot(dbConfig.uri), AccountModule, SiteModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: WrongRequestExceptionFilter,
  }, {
    provide: APP_INTERCEPTOR,
    useClass: ReturnInterceptor,
  }],
})
export class AppModule {}
