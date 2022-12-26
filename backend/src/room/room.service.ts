import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter, map } from 'ramda';
import { Site, SiteDocument } from 'src/site/schemas/site.schema';
import { WrongRequestException } from 'src/wrong-request.exception';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Site.name) private siteModel: Model<SiteDocument>,
  ) {}

  async list(siteId: string, searchText: string): Promise<RoomDocument[]> {
    const site = await this.siteModel.findById(siteId);
    if (!site) throw new WrongRequestException(30002);

    const getRoom = async (id: string) => await this.roomModel.findById(id);
    const ifMacth = (room: RoomDocument) => room.name.includes(searchText);
    const rawRooms = await Promise.all(map(getRoom)(site.rooms));
    const rooms = filter(ifMacth)(rawRooms);
    return rooms;
  }

  async create(
    siteId: string,
    name: string,
    picture: string,
    host: string,
  ): Promise<boolean> {
    const site = await this.siteModel.findById(siteId);
    const rooms = await this.list(siteId, '');
    const room = rooms.find((room) => room.name === name);
    if (room) {
      throw new WrongRequestException(40001);
    } else {
      const newRoom = await this.roomModel.create({
        name,
        host,
        devices: [],
        picture,
      });
      site.rooms.push(newRoom.id);
      await site.save();
      return true;
    }
  }

  async updatePicture(roomId: string, picture: string): Promise<boolean> {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new WrongRequestException(40002);

    room.picture = picture;
    await room.save();
    return true;
  }

  async delete(siteId: string, roomId: string): Promise<boolean> {
    const site = await this.siteModel.findById(siteId);
    if (!site) throw new WrongRequestException(30002);

    const room = await this.roomModel.findById(roomId);
    if (!room) throw new WrongRequestException(40002);

    site.rooms = site.rooms.filter((id) => id !== roomId);
    await site.save();
    await room.remove();
    return true;
  }
}
