import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/auth/createUser.dto';
import { LoginUserDto } from '../../dto/auth/loginUser.dto';
import { JwtAuthGuard } from '../../helpers/auth.guard.helper/auth.guard.helper';
import { UpdatePasswordDto } from '../../dto/auth/updatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-password')
  updateAdminPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updateAdminPassword(updatePasswordDto);
  }
}
