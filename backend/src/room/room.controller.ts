import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Cookies } from 'src/cookie.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoomCreateDto, RoomDeleteDto, RoomListDto } from './dto/room.dto';
import { RoomService } from './room.service';
import { RoomDocument } from './schemas/room.schema';

@Controller('room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('list')
  async list(@Body() roomListDto: RoomListDto): Promise<RoomDocument[]> {
    return this.roomService.list(roomListDto.siteId, roomListDto.searchText);
  }

  @Post('create')
  async create(
    @Cookies('id') id: string,
    @Body() roomCreateDto: RoomCreateDto,
  ): Promise<boolean> {
    return this.roomService.create(
      roomCreateDto.siteId,
      roomCreateDto.name,
      roomCreateDto.picture,
      id,
    );
  }

  @Post('delete')
  async delete(
    @Body() roomDeleteDto: RoomDeleteDto,
  ): Promise<boolean> {
    return this.roomService.delete(roomDeleteDto.siteId, roomDeleteDto.roomId);
  }
}
