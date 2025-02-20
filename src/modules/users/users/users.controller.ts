import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../helpers/auth.guard.helper/auth.guard.helper';
import { CreateAdminDto } from '../../../dto/auth/createAdmin.dto';
import { UsersService } from './users.service';

@Controller('admin/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-lodger')
  createUser(@Body() createUserDto: CreateAdminDto) {
    return this.usersService.createLodger(createUserDto);
  }
}
