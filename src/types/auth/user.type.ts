import { Document } from 'mongoose';

export interface UserProfile extends Document {
  first_name: string;
  last_name: string;
  password: string;
  birth_date: Date;
  sex: string;
  home_address: string;
  phone_number: string;
  email: string;
  emergency_contact_person: string;
  emergency_contact_number: string;
  occupation: string;
  company_or_school: string;
  number_of_room_occupants: number;
  is_verified: boolean;
}
