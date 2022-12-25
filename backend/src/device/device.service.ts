import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'ramda';
import { Room, RoomDocument } from 'src/room/schemas/room.schema';
import { WrongRequestException } from 'src/wrong-request.exception';
import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async list(roomId: string, searchText: string): Promise<DeviceDocument[]> {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new WrongRequestException(40002);

    const getDevice = async (id: string) => await this.deviceModel.findById(id);
    const ifMacth = (device: DeviceDocument) =>
      device.name.includes(searchText);
    const rawDevices = await Promise.all(map(getDevice)(room.devices));
    let devices = rawDevices.filter(ifMacth);
    devices.map((device) => {
      if (device.type === 'sensor') {
        device.states.value =
          Math.floor(
            Math.random() * (device.states.max - device.states.min + 1),
          ) + device.states.min;
      } else if (device.type === 'lock') {
        device.states.isLocked = Math.random() > 0.5;
      }
    });

    return devices;
  }

  async create(
    roomId: string,
    name: string,
    type: 'light' | 'switch' | 'sensor' | 'lock',
    host: string,
    sensorPayload?: {
      target: string;
      min: number;
      max: number;
      unit?: string;
    },
  ): Promise<boolean> {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new WrongRequestException(40002);
    const devices = await this.list(roomId, '');
    const device = devices.find((device) => device.name === name);
    if (device) {
      throw new WrongRequestException(50001);
    } else {
      let states: Object;
      switch (type) {
        case 'light':
          states = {
            isOn: false,
            luminance: 0,
          };
          break;
        case 'switch':
          states = {
            isOn: false,
          };
          break;
        case 'sensor':
          states = {
            ...sensorPayload,
            value:
              Math.floor(
                Math.random() * (sensorPayload.max - sensorPayload.min + 1),
              ) + sensorPayload.min,
          };
          break;
        case 'lock':
          states = {
            isLocked: false,
          };
          break;
        default:
          states = {};
      }
      const newDevice = await this.deviceModel.create({
        name,
        type,
        host,
        states,
      });
      room.devices.push(newDevice.id);
      await room.save();
      return true;
    }
  }

  async update(id: string, states: any): Promise<boolean> {
    const device = await this.deviceModel.findById(id);
    if (!device) throw new WrongRequestException(50002);
    device.states = states;
    await device.save();
    return true;
  }
}
