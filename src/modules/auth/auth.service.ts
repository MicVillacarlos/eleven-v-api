import {
  BadRequestException,
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
import { CreateAdminDto } from '../../dto/auth/createAdmin.dto';
import { sendEmail } from '../../helpers/email.helper/email.helpers';
import { LoginUserDto } from '../../dto/auth/loginUser.dto';
import { projectConfig } from '../../config/config';
import { UpdatePasswordDto } from '../../dto/auth/updatePassword.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(
    data: CreateAdminDto,
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
        user_type: 'admin',
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

  async updateAdminPassword(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    const { newPassword, confirmNewPassword, oldPassword } = data;

    try {
      const user = await this.userModel.findOne({ _id: id });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      const isOldPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password,
      );

      if (!isOldPasswordMatched) {
        throw new BadRequestException('Old password is incorrect.');
      }

      if (newPassword !== confirmNewPassword) {
        throw new BadRequestException(
          'New password and confirm password must match.',
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userModel.findByIdAndUpdate(id, { password: hashedPassword });

      return { success: true, message: 'Password successfully updated.' };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'An error occurred while updating the password.',
      };
    }
  }

  async validateToken(
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      this.jwtService.verify(token);
      return { success: true, message: 'Token is valid.' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
