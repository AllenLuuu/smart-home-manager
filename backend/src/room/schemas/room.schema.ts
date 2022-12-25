import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop({
    required: true,
  })
  host: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  devices: string[];

  @Prop({
    required: false,
  })
  picture: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
