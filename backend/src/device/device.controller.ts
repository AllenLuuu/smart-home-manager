import { Body, Controller, Post } from '@nestjs/common';
import { Cookies } from 'src/cookie.decorator';
import { DeviceService } from './device.service';
import { DeviceCreateDto, DeviceDeleteDto, DeviceListDto, DeviceUpdateDto } from './dto/device.dto';
import { DeviceDocument } from './schemas/device.schema';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('list')
  async list(@Body() deviceListDto: DeviceListDto): Promise<DeviceDocument[]> {
    return this.deviceService.list(
      deviceListDto.roomId,
      deviceListDto.searchText,
    );
  }

  @Post('create')
  async create(
    @Cookies('id') id: string,
    @Body() deviceCreateDto: DeviceCreateDto,
  ): Promise<boolean> {
    return this.deviceService.create(
      deviceCreateDto.roomId,
      deviceCreateDto.name,
      deviceCreateDto.type,
      id,
      deviceCreateDto.sensorPayload,
    );
  }

  @Post('update')
  async update(
    @Body() deviceUpdateDto: DeviceUpdateDto,
  ): Promise<boolean> {
    return this.deviceService.update(
      deviceUpdateDto.id,
      deviceUpdateDto.states,
    );
  }

  @Post('delete')
  async delete(
    @Body() deviceDeleteDto: DeviceDeleteDto,
  ): Promise<boolean> {
    return this.deviceService.delete(
      deviceDeleteDto.roomId,
      deviceDeleteDto.deviceId,
    );
  }
}
