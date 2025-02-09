import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { generateTemporaryPassword } from '../../utils/auth.utils';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../dto/auth/createUser.dto';
import { sendEmail } from '../../helpers/email.helper/email.helpers';
import { LoginUserDto } from '../../dto/auth/loginUser.dto';
import { projectConfig } from '../../config/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    data: CreateUserDto,
  ): Promise<{ email: string; token: string }> {
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
      const tempPassword = generateTemporaryPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      const user = await this.userModel.create({
        first_name,
        last_name,
        password: hashedPassword,
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
      });

      //send temporary password to email ----- START
      const purpose = 'Temporay Password';
      const emailSubject = 'Temporary Password - Eleven V';
      sendEmail(purpose, emailSubject, email, tempPassword);
      //send temporary password to email ----- END

      const token = this.jwtService.sign({ _id: user._id });

      return { email: user.email, token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loginUser(
    data: LoginUserDto,
  ): Promise<{ email: string; token: string }> {
    const { email, password } = data;
    try {
      const user = await this.userModel.findOne({
        email,
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password.');
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      const token = this.jwtService.sign(
        { _id: user._id },
        { expiresIn: projectConfig.jwtExpire },
      );

      return { email: user.email, token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
