import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/auth/createUser.dto';
import { LoginUserDto } from '../../dto/auth/loginUser.dto';
import { JwtAuthGuard } from '../../helpers/auth.guard.helper/auth.guard.helper';
import { UpdatePasswordDto } from '../../dto/auth/updatePassword.dto';

@Controller('admin/auth')
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
  @Put('/update-password/:id')
  updateAdminPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updateAdminPassword(id, updatePasswordDto);
  }

  @Get('/validate-token/:token')
  validateToken(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }
}
