import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema()
export class Site extends Document {
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
  rooms: string[];
}

export const SiteSchema = SchemaFactory.createForClass(Site);
