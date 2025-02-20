import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  password: string;

  @Prop({ type: Date })
  birth_date: Date;

  @Prop()
  sex: string;

  @Prop()
  home_address: string;

  @Prop()
  phone_number: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  emergency_contact_person: string;

  @Prop()
  emergency_contact_number: string;

  @Prop()
  occupation: string;

  @Prop()
  company_or_school: string;

  @Prop()
  number_of_room_occupants: number;

  @Prop({
    type: {
      id: String,
      room_type: String,
      price: Number,
    },
  })
  room_details: {
    id: string;
    room_type: string;
    price: number;
  };

  @Prop({ required: true })
  user_type: 'admin' | 'lodger';

  @Prop({ default: false })
  is_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
