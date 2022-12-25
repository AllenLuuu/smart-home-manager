import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';
import { RoomModule } from 'src/room/room.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Device, DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Device.name, schema: DeviceSchema}]), AccountModule, RoomModule],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
