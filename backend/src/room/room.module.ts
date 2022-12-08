import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';
import { SiteModule } from 'src/site/site.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), SiteModule, AccountModule],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
