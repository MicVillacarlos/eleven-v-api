import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true, collection: 'room' })
export class Room {
  @Prop({ required: true })
  room_type: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  number_of_rooms: number;

  @Prop()
  room_numbers: Array<string>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
