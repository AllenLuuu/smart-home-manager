import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnModule } from './return/return.module';
import dbConfig from './dbconfig';

@Module({
  imports: [ MongooseModule.forRoot(dbConfig.uri) , AccountModule, ReturnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
