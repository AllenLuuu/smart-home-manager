import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnModule } from './return/return.module';
import dbConfig from './dbconfig';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WrongRequestExceptionFilter } from './wrong-request-exception.filter';
import { ReturnInterceptor } from './return.interceptor';

@Module({
  imports: [ MongooseModule.forRoot(dbConfig.uri) , AccountModule, ReturnModule],
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
