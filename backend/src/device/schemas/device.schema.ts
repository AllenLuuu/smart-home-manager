import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema()
export class Device extends Document {
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
  type: "light" | "switch" | "sensor" | "lock";

  @Prop({
    required: false,
    type: "Mixed",
  })
  states: any;

  @Prop({
    required: false,
    type: "Mixed",
  })
  location: {
    x: number;
    y: number;
  }
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
