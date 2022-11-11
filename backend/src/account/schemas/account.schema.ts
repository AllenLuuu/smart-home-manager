import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  phone: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
