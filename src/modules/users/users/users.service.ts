import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas/users.schema';
import { Model } from 'mongoose';
import { CreateAdminDto } from '../../../dto/auth/createAdmin.dto';
import { UserProfile } from '../../../types/auth/user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async createLodger(data: CreateAdminDto): Promise<{ user: UserProfile }> {
    const {
      first_name,
      last_name,
      birth_date,
      sex,
      home_address,
      phone_number,
      email,
      emergency_contact_person,
      emergency_contact_number,
      occupation,
      company_or_school,
      number_of_room_occupants,
    } = data;

    try {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const user = await this.userModel.create({
        first_name,
        last_name,
        password: '',
        birth_date,
        sex,
        home_address,
        phone_number,
        email,
        emergency_contact_person,
        emergency_contact_number,
        occupation,
        company_or_school,
        number_of_room_occupants,
        user_type: 'lodger',
      });

      return { user: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
